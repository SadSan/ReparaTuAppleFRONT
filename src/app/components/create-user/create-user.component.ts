import { Component, OnInit } from '@angular/core';
import { CreateUserModel } from '../../models/createUser.interface';
import { UsuariosService } from '../../services/usuarios.service';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass']
})

export class CreateUserComponent implements OnInit {

  ngOnInit(): void {

  }

  public cedula = new FormControl('', [Validators.required, Validators.minLength(10)]);
  public nombres = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public apellidos = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public codigo = new FormControl('', [Validators.required, Validators.minLength(10)]);
  public fechaNacimiento = new FormControl('', [Validators.required]);
  public rol = new FormControl('', [Validators.required]);
  public tipoContrato = new FormControl('', [Validators.required]);
  public telefono = new FormControl('', [Validators.required]);
  public clave = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);

  public createUserForm: FormGroup = new FormGroup({
    cedula: this.cedula,
    nombres: this.nombres,
    apellidos: this.apellidos,
    codigo: this.codigo,
    fechaNacimiento: this.fechaNacimiento,
    rol: this.rol,
    tipoContrato: this.tipoContrato,
    email: this.email,
    telefono: this.telefono,
    clave: this.clave,
  })

  constructor(private usuarioService: UsuariosService) {
    this.cedula.setValue('');
    this.nombres.setValue('');
    this.apellidos.setValue('');
    this.codigo.setValue('');
    this.fechaNacimiento.setValue('');
    this.rol.setValue(0);
    this.tipoContrato.setValue('');
    this.email.setValue('');
    this.telefono.setValue('');
    this.clave.setValue('');
  }

  createUsers() {
    const user: CreateUserModel = {
      cedula: this.cedula.value,
      nombre: this.nombres.value,
      apellido: this.apellidos.value,
      codigo: this.codigo.value,
      fechanacimiento: this.fechaNacimiento.value,
      id_rol: this.rol.value,
      tipocontrato: this.tipoContrato.value,
      correo: this.email.value,
      telefono: this.telefono.value.toString(),
      clave: this.clave.value,
      id_estado: 1,
    }
    this.usuarioService.createUser(user).subscribe(() => {
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
}
