import { Component, OnInit } from '@angular/core';
import { CreateUserModel } from '../../models/createUser.interface';
import { UsuariosService } from '../../services/usuarios.service';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { EnumActiveInactive } from 'src/app/static/enum-active-inactive';
import { EnumRolesUser, EnumRolesUserText } from 'src/app/static/enum-roles-user';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { JwtAuthService } from 'src/app/services/jwt-auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass']
})

export class CreateUserComponent implements OnInit {

  public listRoles: { name: string, value: number }[] = [
    { name: 'Seleccionar', value: 0 },
    { name: EnumRolesUserText.ADMIN, value: EnumRolesUser.ADMIN },
    { name: EnumRolesUserText.ADVISER, value: EnumRolesUser.ADVISER },
    { name: EnumRolesUserText.DOMICILIARY, value: EnumRolesUser.DOMICILIARY },
    { name: EnumRolesUserText.TECHNICAL, value: EnumRolesUser.TECHNICAL }
  ]
  public rolSelected: number = 0;

  public listContrats: { name: string, value: string }[] = [
    { name: 'Seleccionar', value: '' },
    { name: 'Definido', value: 'definido' },
    { name: 'Indefinido', value: 'indefinido' },
    { name: 'Prestación de servicios', value: 'prestacion' },
    { name: 'Temporal', value: 'temporal' }
  ]
  public contratSelected: string = '';

  public createUserForm: FormGroup = new FormGroup({
    cedula: new FormControl('', [Validators.required]),
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
    tipoContrato: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  ngOnInit(): void {
  }

  constructor(private usuarioService: UsuariosService, private utilitesService: UtilitiesService, private tokenService: JwtAuthService) { }

  public createUsers(): void {
    this.isLogged();
    if (this.validateErrors()) {
      return;
    }

    const user: CreateUserModel = {
      cedula: this.createUserForm.controls.cedula.value.toString(),
      nombre: this.createUserForm.controls.nombres.value,
      apellido: this.createUserForm.controls.apellidos.value,
      codigo: '0', //IMPLEMENTACION EN NUEVAS VERSIONES
      fechanacimiento: this.createUserForm.controls.fechaNacimiento.value,
      id_rol: this.rolSelected,
      tipocontrato: this.contratSelected,
      correo: this.createUserForm.controls.email.value,
      telefono: this.createUserForm.controls.telefono.value.toString(),
      clave: this.createUserForm.controls.clave.value,
      id_estado: EnumActiveInactive.ACTIVO,
    }
    console.log(user);
    

    this.usuarioService.createUser(user).subscribe((data) => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Usuario Creado',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.reload();
      })
    }, (error) => {
      let message: string = 'Algo ha salido mal :(';
      if (error.error == 5) {
        message = 'Cedula duplicada';
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
      })
    })
  }

  private validateErrors(): boolean {
    if (this.createUserForm.controls.cedula.value == '') {
      this.utilitesService.goToast(true, 'Cedula de usuario requerida')
      return true;
    }
    if (this.createUserForm.controls.cedula.value.toString().length < 8) {
      this.utilitesService.goToast(true, 'Cedula de usuario debe tener al menos 9 caracteres')
      return true;
    }
    if (this.createUserForm.controls.nombres.value == '') {
      this.utilitesService.goToast(true, 'Nombre de usuario requerido')
      return true;
    }
    if (this.createUserForm.controls.apellidos.value == '') {
      this.utilitesService.goToast(true, 'Apellido de usuario requerido')
      return true;
    }
    if (this.createUserForm.controls.fechaNacimiento.value == '') {
      this.utilitesService.goToast(true, 'Fecha de nacimiento de usuario requerida')
      return true;
    }
    if (this.createUserForm.controls.rol.value == '' || this.createUserForm.controls.rol.value == 0) {
      this.utilitesService.goToast(true, 'Rol de usuario requerido')
      return true;
    }
    if (this.createUserForm.controls.tipoContrato.value == '') {
      this.utilitesService.goToast(true, 'Tipo de contrato de usuario requerido')
      return true;
    }
    if (this.createUserForm.controls.telefono.value == '') {
      this.utilitesService.goToast(true, 'Telefono de usuario requerido')
      return true;
    }
    if (this.createUserForm.controls.clave.value == '') {
      this.utilitesService.goToast(true, 'clave de usuario requerida')
      return true;
    }
    if (this.createUserForm.controls.clave.value.length < 5) {
      this.utilitesService.goToast(true, 'clave de usuario debe tener al menos 6 caracteres')
      return true;
    }
    if (this.createUserForm.controls.email.value == '') {
      this.utilitesService.goToast(true, 'Email de usuario requerido')
      return true;
    }
    if (!this.utilitesService.validateEmailRepara(this.createUserForm.controls.email.value)) {
      this.utilitesService.goToast(true, 'El email debe ser del dominio @reparatuapple.com.co')
      return true;
    }
    return false;
  }

  private isLogged(): void {
    if (!this.tokenService.isLogged()) {
      window.location.reload();
    }
  }

}
