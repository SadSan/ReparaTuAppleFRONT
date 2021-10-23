import { SeguimientosService } from './../../services/seguimiento.service';
import { Component, OnInit } from '@angular/core';
import { NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-domiciliary',
  templateUrl: './domiciliary.component.html',
  styleUrls: ['./domiciliary.component.sass']
})
export class DomiciliaryComponent implements OnInit {

  constructor(private seguimientosService: SeguimientosService) { }

  public seguimientos: any[] = [];

  ngOnInit(): void {
    this.getSeguimientos();
  }

  public async getSeguimientos(): Promise<any> {
    this.seguimientosService.getSeguimientos().subscribe((data) => {
      data.forEach((element: any) => {
        console.log(element);
        if (element.nombre_seguimiento == "RECOGIDA") {
          this.seguimientos.push(element)
        }
        
      });
    });
  }

}
