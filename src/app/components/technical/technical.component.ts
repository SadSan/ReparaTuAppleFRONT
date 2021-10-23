import { SeguimientosService } from 'src/app/services/seguimiento.service';
import { Component, OnInit } from '@angular/core';
import {NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-technical',
  templateUrl: './technical.component.html',
  styleUrls: ['./technical.component.sass']
})
export class TechnicalComponent implements OnInit {

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
