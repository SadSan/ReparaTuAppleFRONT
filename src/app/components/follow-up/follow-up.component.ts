import { UpdateCodeModel } from './../../models/createCode.interface';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SeguimientosService } from 'src/app/services/seguimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.sass']
})
export class FollowUpComponent implements OnInit {

  public usersDB: any;
  public seguimientos: any[] = [];

  public nombre_seguimiento = new FormControl('', Validators.required);
  public descripcion = new FormControl('', Validators.required);
  public id_equipo = new FormControl('', Validators.required);
  public idusuario = new FormControl('', Validators.required);
  public nombre_cliente = new FormControl('', [Validators.required]);
  public celular_cliente = new FormControl('', [Validators.required]);
  public direccion_cliente = new FormControl('', [Validators.required]);
  public confirmacion_cliente = new FormControl('', [Validators.required]);
  public reporte_falla = new FormControl('', [Validators.required]);
  public referencia_equipo = new FormControl('', [Validators.required, Validators.email]);
  public modelo = new FormControl('', [Validators.required]);
  public disco = new FormControl('', [Validators.required]);
  public ob_cliente = new FormControl('', [Validators.required]);
  public valor_negociado = new FormControl('', [Validators.required]);
  public correo_cliente = new FormControl('', [Validators.required]);
  public cod_seguimiento = new FormControl('', [Validators.required]);

  public seguimientoModal: FormGroup = new FormGroup({
    nombre_seguimiento: this.nombre_seguimiento,
    descripcion: this.descripcion,
    nombre_cliente: this.nombre_cliente,
    celular_cliente: this.celular_cliente,
    direccion_cliente: this.direccion_cliente,
    confirmacion_cliente: this.confirmacion_cliente,
    reporte_falla: this.reporte_falla,
    referencia_equipo: this.referencia_equipo,
    modelo: this.modelo,
    disco: this.disco,
    ob_cliente: this.ob_cliente,
    valor_negociado: this.valor_negociado,
    correo_cliente: this.correo_cliente,
    cod_seguimiento: this.cod_seguimiento,
  })

  constructor(private seguimientosService: SeguimientosService, public modal: NgbModal) {
  }

  ngOnInit(): void {
    this.getSeguimientos();
  }

  public async getSeguimientos(): Promise<any> {
    this.seguimientosService.getSeguimientos().subscribe((data) => {
      data.forEach((element: any) => {
        console.log(element);

        this.seguimientos.push(element)
      });
    });
  }
  
  editCode() {
    const code: UpdateCodeModel = {
      nombre_seguimiento: this.nombre_seguimiento.value,
      descripcion: this.descripcion.value,
      nombre_cliente: this.nombre_cliente.value,
      celular_cliente: this.celular_cliente.value,
      direccion_cliente: this.direccion_cliente.value,
      confirmacion_cliente: this.confirmacion_cliente.value,
      reporte_falla: this.reporte_falla.value,
      referencia_equipo: this.referencia_equipo.value,
      modelo: this.modelo.value,
      disco: this.disco.value,
      ob_cliente: this.ob_cliente.value,
      valor_negociado: this.valor_negociado.value,
      correo_cliente: this.correo_cliente.value,
    }

    this.seguimientosService.editCode(code).subscribe((data) => {
      console.log(data);
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario Creado',
        showConfirmButton: false,
        timer: 1500
      })
    }, (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo ha salido mal :('
      })

    })
  }
  
  public async openModal(contenido: any, code: any): Promise<any> {
    this.seguimientosService.getSeguimientosByCode(code).subscribe((data) => {
      if (data.body[0]) {
        this.nombre_seguimiento.setValue(data.body[0].nombre_seguimiento);
        this.descripcion.setValue(data.body[0].descripcion);
        this.id_equipo.setValue(data.body[0].id_equipo);
        this.idusuario.setValue(data.body[0].idusuario);
        this.nombre_cliente.setValue(data.body[0].nombre_cliente);
        this.celular_cliente.setValue(data.body[0].celular_cliente);
        this.direccion_cliente.setValue(data.body[0].direccion_cliente);
        this.confirmacion_cliente.setValue(data.body[0].confirmacion_cliente);
        this.reporte_falla.setValue(data.body[0].reporte_falla);
        this.referencia_equipo.setValue(data.body[0].referencia_equipo);
        this.modelo.setValue(data.body[0].modelo);
        this.disco.setValue(data.body[0].disco);
        this.ob_cliente.setValue(data.body[0].ob_cliente);
        this.valor_negociado.setValue(data.body[0].valor_negociado);
        this.correo_cliente.setValue(data.body[0].correo_cliente);
        this.cod_seguimiento.setValue(data.body[0].cod_seguimiento);
        this.modal.open(contenido, { scrollable: true, size: 'xl' });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha encontrado la información solicitada :('
        });
      }
    }, (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo ha salido mal :('
      });
    });
  }
}
