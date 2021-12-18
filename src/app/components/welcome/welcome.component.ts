import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

  constructor( private usuarios: UsuariosService ) { }

  ngOnInit(): void {
    //this.usuarios.getUsers()
    //.subscribe( usuarios => {
    //  //console.log(usuarios);
    //})
  }

}
