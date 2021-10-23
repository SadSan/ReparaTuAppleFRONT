import { Router } from '@angular/router';
import { SeguimientosService } from 'src/app/services/seguimiento.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {

  ngOnInit(): void {
  }

  public codeForm = new FormControl('', [Validators.required]);

  public consultaForm: FormGroup = new FormGroup({
    code: this.codeForm,
  })

  constructor(private seguimientosService: SeguimientosService, private router: Router) {
    this.codeForm.setValue('');
  }

  public async getClientByCode(): Promise<any> {
    const code = this.codeForm.value;
    this.seguimientosService.getSeguimientosByCode(code).subscribe((data) => {
      if (data) {
        this.router.navigate(['estado-mi-producto', {code: code}])
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No existe un producto con el codigo ingresado :('
        })
      }
    }, (err) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo ha salido mal :('
      })
    })
  }
}
