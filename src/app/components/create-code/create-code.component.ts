import { SeguimientosService } from 'src/app/services/seguimiento.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-code',
  templateUrl: './create-code.component.html',
  styleUrls: ['./create-code.component.sass'],
})
export class CreateCodeComponent implements OnInit {

  
  
  ngOnInit(): void {
    this.consecutiveCode();
  }
  
  public nombre_seguimiento = new FormControl({value: 'Por Asignar', disabled: true});
  public cod_seguimiento = new FormControl({value: 0, disabled: true});
  //public descripcion = new FormControl('', [
  //  Validators.required,
  //  Validators.minLength(3),
  //]);
  public nombre_cliente = new FormControl('', [Validators.required]);
  public celular_cliente = new FormControl('', [Validators.required]);
  public direccion_cliente = new FormControl('', [Validators.required]);
  public reporte_falla = new FormControl('', [Validators.required]);
  public referencia_equipo = new FormControl('', [Validators.required]);
  public modelo = new FormControl('', [Validators.required]);
  public disco = new FormControl('', [Validators.required]);
  public Ob_cliente = new FormControl('', [Validators.required]);
  public valor_negociado = new FormControl('', [Validators.required]);
  public correo_cliente = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public createCodeForm: FormGroup = new FormGroup({
    cod_seguimiento: this.cod_seguimiento,
    nombre_seguimiento: this.nombre_seguimiento,
    //descripcion: this.descripcion,
    nombre_cliente: this.nombre_cliente,
    celular_cliente: this.celular_cliente,
    direccion_cliente: this.direccion_cliente,
    reporte_falla: this.reporte_falla,
    referencia_equipo: this.referencia_equipo,
    modelo: this.modelo,
    disco: this.disco,
    Ob_cliente: this.Ob_cliente,
    valor_negociado: this.valor_negociado,
    correo_cliente: this.correo_cliente,
  });

  constructor(private seguimiento: SeguimientosService) {}
  
  public consecutiveCode(): void {
    this.seguimiento.getSeguimientos().subscribe((data) => {
      const lastRegister = data[data.length - 1];
      if (!lastRegister) {
        this.cod_seguimiento.setValue(1000);
      } else {
        this.cod_seguimiento.setValue(lastRegister.cod_seguimiento + 1);
      }
    });
  }

  public createCode(): void {
    const code = {
      nombre_seguimiento: this.nombre_seguimiento.value,
      descripcion: "lorem",
      id_equipo: this.cod_seguimiento.value,
      Idusuario: localStorage.getItem('user'),
      nombre_cliente: this.nombre_cliente.value,
      celular_cliente: this.celular_cliente.value,
      direccion_cliente: this.direccion_cliente.value,
      confirmacion_cliente: "false",
      reporte_falla: this.reporte_falla.value,
      referencia_equipo: this.referencia_equipo.value,
      modelo: this.modelo.value,
      disco: this.disco.value,
      Ob_cliente: this.Ob_cliente.value,
      valor_negociado: this.valor_negociado.value,
      correo_cliente: this.correo_cliente.value,
      cod_seguimiento: this.cod_seguimiento.value,
    };

    if (this.createCodeForm.valid === true) {
      this.seguimiento.createCode(code).subscribe((data) => {
        if (data.body === 1) {
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Code Creado',
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formulario invalido',
      });
    }
    
  }
}
