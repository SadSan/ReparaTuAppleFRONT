import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.sass']
})
export class ListUsersComponent implements OnInit {

  ngOnInit(): void {
    this.getAllUsers()
  }

  public userData: any;

  constructor(private usuariosService: UsuariosService) {
  }

  public async getAllUsers(): Promise<any> {
    this.usuariosService.getUsers().subscribe((data) => {
      if (data) {
        this.userData = data;
        for (const user of this.userData) {
          switch (user.id_rol) {
            case 1:
              user.id_rol = "Administrador";
              break;
            case 2:
              user.id_rol = "Comercial";
              break;
            case 3:
              user.id_rol = "Domiciliario";
              break;

            default:
              break;
          }

          if (user.id_estado && user.id_estado == 1) {
            user.id_estado = "Activo";
          }else{
            user.id_estado = "Inactivo";
          }

        }
      }
      console.log(this.userData);
    })
  }

}
