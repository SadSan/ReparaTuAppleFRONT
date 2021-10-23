import { ActivatedRoute, Router } from '@angular/router';
import { SeguimientosService } from 'src/app/services/seguimiento.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-tracking',
  templateUrl: './product-tracking.component.html',
  styleUrls: ['./product-tracking.component.sass']
})
export class ProductTrackingComponent implements OnInit {

  constructor( private seguimientosService: SeguimientosService, private route :ActivatedRoute) { }

  ngOnInit(): void {
  this.getClientByCode()
  }

  public seguimientoInfo: any;
  public estado: string = "";

  public textoRecogida = ""

  public getClientByCode() {
    const code = this.route.snapshot.paramMap.get('code');
    
    this.seguimientosService.getSeguimientosByCode(code).subscribe((data) => {
      if (data) {
        this.seguimientoInfo = data.body[0];
        this.estado = this.seguimientoInfo.nombre_seguimiento;
        console.log(this.seguimientoInfo);
        
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo ha salido mal :('
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
