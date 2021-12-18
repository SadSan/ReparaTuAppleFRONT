import { UpdateCodeModel } from './../../models/createCode.interface';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SeguimientosService } from 'src/app/services/seguimiento.service';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { JwtAuthService } from 'src/app/services/jwt-auth.service';
import { EnumRolesUser } from 'src/app/static/enum-roles-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.sass'],
})
export class FollowUpComponent implements OnInit {

  public userLS: any = localStorage.getItem('user');
  public userRolLS: any = localStorage.getItem('rol');
  public userLogged: any = localStorage.getItem('user');

  public seguimientos: any[] = [];
  public states: { name: string }[] = [
    { name: 'SELECCIONAR' },
    { name: 'RECOGIDA' },
    { name: 'LABORATORIO' },
    { name: 'DIAGNOSTICO' },
    { name: 'ACEPTACION' },
    { name: 'REPARANDO' },
    { name: 'ENVIO' },
  ];
  public stateSelected: any = this.states[0];

  public backWelcome: string = '';
  public refresh: boolean = false;
  public refreshBut: boolean = false;
  public submitted: boolean = false;

  public seguimientoModal: FormGroup = new FormGroup({
    nombre_seguimiento: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    idusuario: new FormControl('', Validators.required),
    id_equipo: new FormControl('', Validators.required),
    nombre_cliente: new FormControl('', Validators.required),
    celular_cliente: new FormControl('', Validators.required),
    direccion_cliente: new FormControl('', Validators.required),
    confirmacion_cliente: new FormControl('', Validators.required),
    reporte_falla: new FormControl('', Validators.required),
    referencia_equipo: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    disco: new FormControl('', Validators.required),
    ob_cliente: new FormControl('', Validators.required),
    valor_negociado: new FormControl('', Validators.required),
    correo_cliente: new FormControl('', [Validators.required, Validators.email]),
    cod_seguimiento: new FormControl('', Validators.required),
  });

  constructor(
    private seguimientosService: SeguimientosService,
    private usuariosService: UsuariosService,
    private utilitesService: UtilitiesService,
    private tokenService: JwtAuthService,
    private router: Router,
    public modal: NgbModal,
  ) {
    switch (parseInt(this.userRolLS)) {
      case EnumRolesUser.ADMIN:
        this.backWelcome = '/dashboard-admin';
        break;
      case EnumRolesUser.ADVISER:
        this.backWelcome = '/dashboard-adviser';
        break;
      case EnumRolesUser.DOMICILIARY:
        this.backWelcome = '/dashboard-domiciliary';
        break;
      case EnumRolesUser.TECHNICAL:
        this.backWelcome = '/dashboard-technical';
        break;
      default:
        this.backWelcome = '/login';
        break;
    }
  }

  ngOnInit(): void {
    this.isLogged();
    this.getSeguimientos();
    this.getUser();
  }

  public async getSeguimientos(): Promise<any> {
    this.isLogged();
    this.seguimientosService.getSeguimientos().subscribe((data) => {
      console.log(data);
      if (data) {
        data.forEach((element: any) => {
          if (this.userRolLS == '1' || this.userRolLS == '2') {
            this.seguimientos.push(element);
          }
          if (this.userRolLS == '3') {
            if (element.nombre_seguimiento == 'ENVIO' || element.nombre_seguimiento == 'RECOGIDA') {
              this.seguimientos.push(element);
            }
          }
          if (this.userRolLS == '4') {
            if (element.nombre_seguimiento == 'LABORATORIO' || element.nombre_seguimiento == 'REPARANDO') {
              this.seguimientos.push(element);
            }
          }
        });
        if (this.seguimientos.length == 0) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sin Pedidos Pendientes',
            showConfirmButton: true,
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate([this.backWelcome])
          })
        }
      }
    });
  }

  public async toSend(code: any): Promise<any> {
    let message: string = ''
    if (code.nombre_seguimiento == 'ENVIO' && this.userRolLS == '3') {
      code.nombre_seguimiento = "FINALIZADO";
      message = 'Entrega del dispositivo exitosa!'
    }
    if (code.nombre_seguimiento == 'RECOGIDA' && this.userRolLS == '3') {
      code.nombre_seguimiento = "LABORATORIO";
      message = 'El dispositivo fue enviado a laboratorio!'
    }
    if (code.nombre_seguimiento == 'LABORATORIO' && this.userRolLS == '4') {
      code.nombre_seguimiento = "DIAGNOSTICO";
      message = 'El dispositivo fue diagnosticado!'
    }
    if (code.nombre_seguimiento == 'REPARANDO' && this.userRolLS == '4') {
      code.nombre_seguimiento = "ENVIO";
      message = 'El dispositivo se encuantra en estado de envio!'
    }
    this.updateCode(code, message);
  }

  public async getUser(): Promise<any> {
    this.isLogged();
    this.usuariosService.getUsers().subscribe((data) => {
      console.log(data);
      data.forEach((user: any) => {
        if (user.idusuario == this.userLS) {
          this.userLogged = user;
        }
      });

    });
  }

  public async openModal(contenido: any, code: any): Promise<any> {
    this.isLogged();
    this.refreshButtons();
    this.seguimientosService.getSeguimientosByCode(code).subscribe(
      (data) => {
        if (data.body[0]) {
          this.seguimientoModal.setValue({
            nombre_seguimiento: data.body[0].nombre_seguimiento,
            descripcion: data.body[0].descripcion,
            id_equipo: data.body[0].id_equipo,
            idusuario: data.body[0].idusuario,
            nombre_cliente: data.body[0].nombre_cliente,
            celular_cliente: data.body[0].celular_cliente,
            direccion_cliente: data.body[0].direccion_cliente,
            confirmacion_cliente: data.body[0].confirmacion_cliente,
            reporte_falla: data.body[0].reporte_falla,
            referencia_equipo: data.body[0].referencia_equipo,
            modelo: data.body[0].modelo,
            disco: data.body[0].disco,
            ob_cliente: data.body[0].ob_cliente,
            valor_negociado: data.body[0].valor_negociado,
            correo_cliente: data.body[0].correo_cliente,
            cod_seguimiento: data.body[0].cod_seguimiento,
          });
          this.modal.open(contenido, { scrollable: true, size: 'xl' });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha encontrado la información solicitada :(',
          });
        }
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo ha salido mal :(',
        });
      }
    );
  }

  public editCode(): void {
    this.submitted = true;
    if (this.validateErrors()) {
      this.submitted = false;
      return;
    }

    const code: UpdateCodeModel = {
      nombre_seguimiento: this.seguimientoModal.controls.nombre_seguimiento.value,
      idusuario: 1, // SEELECT CON USUARIO ASIGNADO
      cod_seguimiento: this.seguimientoModal.controls.cod_seguimiento.value,
      valor_negociado: this.seguimientoModal.controls.valor_negociado.value,
      confirmacion_cliente: 'true',
    };
    //QUITAR SUBMIT DESPUES - SOLO PARA PRUEBAS
    //this.submitted = false;
    console.log(code);

    this.updateCode(code);
  }

  private updateCode(code: UpdateCodeModel, message?: string): void {
    this.isLogged();
    this.seguimientosService.editCode(code).subscribe(
      (data) => {
        if (data.body === 1) {
          this.submitted = false;
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: message ? message : 'Code Actualizado',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.refreshTable();
          });
        } else {
          this.submitted = false;
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'hubo un error actualizando la información',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      (error) => {
        console.log(error);
        this.submitted = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo ha salido mal :(',
        });
      }
    );
  }

  private validateErrors(): boolean {
    if (this.seguimientoModal.controls.nombre_cliente.value == '') {
      this.utilitesService.goToast(true, 'Nombre de cliente requerido')
      return true;
    }
    if (this.seguimientoModal.controls.celular_cliente.value == '') {
      this.utilitesService.goToast(true, 'Celular de cliente requerido')
      return true;
    }
    if (this.seguimientoModal.controls.direccion_cliente.value == '') {
      this.utilitesService.goToast(true, 'Dirección de cliente requerido')
      return true;
    }
    if (this.seguimientoModal.controls.nombre_seguimiento.value == '') {
      this.utilitesService.goToast(true, 'Estado de seguimiento requerido')
      return true;
    }
    if (this.seguimientoModal.controls.correo_cliente.value == '') {
      this.utilitesService.goToast(true, 'Correo de cliente requerido')
      return true;
    }
    if (this.utilitesService.validateEmailRepara(this.seguimientoModal.controls.correo_cliente.value)) {
      this.utilitesService.goToast(true, 'Dominio del correo debe ser diferente')
      return true;
    }
    if (this.seguimientoModal.controls.referencia_equipo.value == '') {
      this.utilitesService.goToast(true, 'Referencia de equipo de cliente requerido')
      return true;
    }
    if (this.seguimientoModal.controls.modelo.value == '') {
      this.utilitesService.goToast(true, 'Modelo equipo de cliente requerido')
      return true;
    }
    if (this.seguimientoModal.controls.disco.value == '') {
      this.utilitesService.goToast(true, 'Disco de equipo de cliente requerido')
      return true;
    }
    return false;
  }

  private refreshTable(): void {
    this.refresh = true;
    this.seguimientos = [];
    setTimeout(() => {
      this.ngOnInit();
      this.refresh = false;
    }, 500);
  }

  private refreshButtons(): void {
    this.refreshBut = true;
    setTimeout(() => {
      this.refreshBut = false;
    }, 500);
  }

  private isLogged(): void {
    if (!this.tokenService.isLogged()) {
      window.location.reload();
    }
  }

}
