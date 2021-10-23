import { CreateClientModel } from './../../models/createClient.interface';
import Swal from 'sweetalert2';
import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  ngOnInit(): void {
  }

  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public nombreCliente = new FormControl('', [Validators.required]);
  public numDoc = new FormControl('', [Validators.required]);
  public typeDoc = new FormControl('', [Validators.required]);
  public aceptoRegistro = new FormControl('', [Validators.required]);
  public terminos = new FormControl('', [Validators.required]);
  public telefono = new FormControl('', [Validators.required]);
  public telefonoDos = new FormControl('', [Validators.required]);
  public fechaNaci = new FormControl('', [Validators.required]);

  public emailError = false;
  public passwordError = false;
  public nameError = false;
  public numDocError = false;
  public tipoDocError = false;
  public telError = false;
  public tel2Error = false;
  public fechaError = false;
  public terminosError = false;
  public registroError = false;

  public nextStep = false;

  public pasoUnoForm: FormGroup = new FormGroup({
    password: this.password,
    email: this.email,
  })
  public pasoDosForm: FormGroup = new FormGroup({
    nombre: this.nombreCliente,
    numDoc: this.numDoc,
    typeDoc: this.typeDoc,
    telefono: this.telefono,
    telefonoDos: this.telefonoDos,
    fechaNaci: this.fechaNaci,
    terminos: this.terminos,
    aceptoRegistro: this.aceptoRegistro
  })

  constructor(private clienteService: ClientesService) {
    this.email.setValue('');
    this.password.setValue('');
    this.nombreCliente.setValue('');
    this.numDoc.setValue('');
    this.typeDoc.setValue('');
    this.telefono.setValue('');
    this.telefonoDos.setValue('');
    this.fechaNaci.setValue('');
    this.terminos.setValue(false);
    this.aceptoRegistro.setValue(false);
  }

  pasoUno() {
    if (this.email.status === "INVALID") {
      this.emailError = true;
    } else if (this.email.status === "VALID") {
      this.emailError = false;
    }
    if (this.password.status === "INVALID") {
      this.passwordError = true;
    } else if (this.password.status === "VALID") {
      this.passwordError = false;
    }
    if (this.password.status === "VALID" && this.email.status === "VALID") {
      this.nextStep = true
    }
  }
  pasoDos() {
    if (this.nombreCliente.status === "INVALID") {
      this.nameError = true;
    } else if (this.nombreCliente.status === "VALID") {
      this.nameError = false;
    }
    if (this.numDoc.status === "INVALID") {
      this.numDocError = true;
    } else if (this.numDoc.status === "VALID") {
      this.numDocError = false;
    }
    if (this.typeDoc.status === "INVALID") {
      this.tipoDocError = true;
    } else if (this.typeDoc.status === "VALID") {
      this.tipoDocError = false;
    }
    if (this.telefono.status === "INVALID") {
      this.telError = true;
    } else if (this.telefono.status === "VALID") {
      this.telError = false;
    }
    if (this.telefonoDos.status === "INVALID") {
      this.tel2Error = true;
    } else if (this.telefonoDos.status === "VALID") {
      this.tel2Error = false;
    }
    if (this.fechaNaci.status === "INVALID") {
      this.fechaError = true;
    } else if (this.fechaNaci.status === "VALID") {
      this.fechaError = false;
    }
    if (this.terminos.value === false) {
      this.terminosError = true;
    } else if (this.terminos.value === true) {
      this.terminosError = false;
    }
    if (this.aceptoRegistro.value === false) {
      this.registroError = true;
    } else if (this.aceptoRegistro.value === true) {
      this.registroError = false;
    }
    if (this.nombreCliente.status === "VALID" &&
      this.numDoc.status === "VALID" &&
      this.typeDoc.status === "VALID" &&
      this.telefono.status === "VALID" &&
      this.telefonoDos.status === "VALID" &&
      this.fechaNaci.status === "VALID" &&
      this.terminos.value === true &&
      this.aceptoRegistro.value === true
    ) {
      const cliente: CreateClientModel = {
        nombre_cliente: this.nombreCliente.value,
        documento_cliente: this.numDoc.value.toString(),
        tipo_documento: this.typeDoc.value,
        correo_cliente: this.email.value,
        fecha_nacimiento_cli: this.fechaNaci.value,
        acepto_registro: this.aceptoRegistro.value.toString(),
        terminos_condiciones: this.terminos.value.toString(),
        telefono_cliente: this.telefono.value.toString(),
        telefono2_cliente: this.telefonoDos.value.toString(),
        passwords: this.password.value,
      }
      this.clienteService.createClient(cliente).subscribe(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario Creado',
          showConfirmButton: false,
          timer: 1500
        })
      },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha salido mal :('
          })
        });
    }
  }
}