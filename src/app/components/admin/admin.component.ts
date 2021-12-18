import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserModel } from 'src/app/models/createUser.interface';
import { JwtAuthService } from 'src/app/services/jwt-auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { EnumActiveInactive } from 'src/app/static/enum-active-inactive';
import { EnumRolesUser, EnumRolesUserText } from 'src/app/static/enum-roles-user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  public userIdLS: any = localStorage.getItem('user');
  public userRolLS: any = localStorage.getItem('rol');
  public userLogged: any = null;
  public backWelcome: string = '';

  @ViewChild('content') content: any

  public listRoles: { name: string, value: number }[] = [
    { name: 'Seleccionar', value: 0 },
    { name: EnumRolesUserText.ADMIN, value: EnumRolesUser.ADMIN },
    { name: EnumRolesUserText.ADVISER, value: EnumRolesUser.ADVISER },
    { name: EnumRolesUserText.DOMICILIARY, value: EnumRolesUser.DOMICILIARY },
    { name: EnumRolesUserText.TECHNICAL, value: EnumRolesUser.TECHNICAL }
  ]
  public rolSelected: any = 0;

  public listStates: { name: string, value: number }[] = [
    { name: 'Seleccionar', value: 0 },
    { name: 'Activo', value: EnumActiveInactive.ACTIVO },
    { name: 'Inactivo', value: EnumActiveInactive.INACTIVO },
  ]
  public stateSelected: any = 0;

  public listContrats: { name: string, value: string }[] = [
    { name: 'Seleccionar', value: '' },
    { name: 'Definido', value: 'definido' },
    { name: 'Indefinido', value: 'indefinido' },
    { name: 'Prestación de servicios', value: 'prestacion' },
    { name: 'Temporal', value: 'temporal' }
  ]
  public contratSelected: any = '';

  public updateUserForm: FormGroup = new FormGroup({
    idusuario: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
    codigo: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required]),
    fechanacimiento: new FormControl('', [Validators.required]),
    tipocontrato: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    id_estado: new FormControl('', [Validators.required]),
    id_rol: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
  });

  public edit: boolean = false;
  public refresh: boolean = false;
  public refreshBut: boolean = false;
  public submitted: boolean = false;


  constructor(private usuariosService: UsuariosService,
    private utilitesService: UtilitiesService,
    private tokenService: JwtAuthService,
    public modal: NgbModal,
    private router: Router
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
    this.usuariosService.getUsers().subscribe((data) => {
      if (data) {
        let userData = data;
        for (const user of userData) {
          if (user.idusuario == this.userIdLS) {
            this.userLogged = user;
          }
        }
      }
    })
  }

  public updateUsers(): void {
    this.isLogged();
    if (this.validateErrors()) {
      return;
    }
    const user: UpdateUserModel = {
      idusuario: this.updateUserForm.controls.idusuario.value,
      nombre: this.updateUserForm.controls.nombre.value,
      apellido: this.updateUserForm.controls.apellido.value,
      //clave: this.updateUserForm.controls.clave.value == '' ? this.userLogged.clave : this.updateUserForm.controls.clave.value,
      codigo: '0', //IMPLEMENTACION EN NUEVAS VERSIONES
      cedula: this.updateUserForm.controls.cedula.value.toString(),
      fechanacimiento: this.updateUserForm.controls.fechanacimiento.value,
      tipocontrato: this.contratSelected,
      correo: this.updateUserForm.controls.correo.value,
      id_estado: parseInt(this.stateSelected),
      id_rol: parseInt(this.rolSelected),
      telefono: this.updateUserForm.controls.telefono.value.toString(),
    }

    this.usuariosService.updateUser(user).subscribe((data) => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Usuario Actualizado',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.reload();
      })
    }, (error) => {
      let message: string = 'Algo ha salido mal :(';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
      })
    })
  }

  public openModal(content: any) {
    this.updateUserForm.reset();
    this.isLogged();

    this.contratSelected = this.userLogged.tipocontrato;
    this.updateUserForm.setValue({
      idusuario: this.userLogged.idusuario,
      nombre: this.userLogged.nombre,
      apellido: this.userLogged.apellido,
      clave: '',
      codigo: '0', //IMPLEMENTACION EN NUEVAS VERSIONES
      cedula: this.userLogged.cedula,
      fechanacimiento: this.userLogged.fechanacimiento,
      tipocontrato: this.userLogged.tipocontrato,
      correo: this.userLogged.correo,
      telefono: this.userLogged.telefono,
      id_rol: this.userLogged.id_rol,
      id_estado: this.userLogged.id_estado,
    });
    this.stateSelected = this.userLogged.id_estado;
    this.rolSelected = this.userLogged.id_rol;
    this.modal.open(content, { scrollable: true, size: 'lg' });
  }

  private validateErrors(): boolean {
    if (this.updateUserForm.controls.cedula.value == '') {
      this.utilitesService.goToast(true, 'Cedula de usuario requerida')
      return true;
    }
    if (this.updateUserForm.controls.cedula.value.toString().length < 8) {
      this.utilitesService.goToast(true, 'Cedula de usuario debe tener al menos 9 caracteres')
      return true;
    }
    if (this.updateUserForm.controls.nombre.value == '') {
      this.utilitesService.goToast(true, 'Nombre de usuario requerido')
      return true;
    }
    if (this.updateUserForm.controls.apellido.value == '') {
      this.utilitesService.goToast(true, 'Apellido de usuario requerido')
      return true;
    }
    if (this.updateUserForm.controls.fechanacimiento.value == '') {
      this.utilitesService.goToast(true, 'Fecha de nacimiento de usuario requerida')
      return true;
    }
    if (this.updateUserForm.controls.tipocontrato.value == '') {
      this.utilitesService.goToast(true, 'Tipo de contrato de usuario requerido')
      return true;
    }
    if (this.updateUserForm.controls.correo.value == '') {
      this.utilitesService.goToast(true, 'Email de usuario requerido')
      return true;
    }
    if (this.updateUserForm.controls.id_estado.value == '' || this.updateUserForm.controls.id_estado.value == 0) {
      this.utilitesService.goToast(true, 'Estado de usuario requerido')
      return true;
    }
    if (this.updateUserForm.controls.id_rol.value == '' || this.updateUserForm.controls.id_rol.value == 0) {
      this.utilitesService.goToast(true, 'Rol de usuario requerido')
      return true;
    }
    if (this.updateUserForm.controls.telefono.value == '') {
      this.utilitesService.goToast(true, 'Telefono de usuario requerido')
      return true;
    }
    if (!this.utilitesService.validateEmailRepara(this.updateUserForm.controls.correo.value)) {
      this.utilitesService.goToast(true, 'El email debe ser del dominio @reparatuapple.com.co')
      return true;
    }
    return false;
  }

  private isLogged(): void {
    if (!this.tokenService.isLogged()) {
      this.content.dismiss();
      this.router.navigate(['/dashboard-admin']);
    }
  }

}
