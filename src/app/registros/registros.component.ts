import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit{

  public users: User[] = [];

  public processUsers: string[] = [];

  constructor(private UserService: UserService) {
  }

  ngOnInit(): void {
    this.searchAllUsers();
  }

  searchAllUsers(){
    this.UserService.getAllUsers()
        .subscribe(u=>{
          this.users = u;
        });
  }

  clean(){
    this.users = [];
  }

  saveUsersToProccess(u){
    this.processUsers.push(u.id);
    
  }

  updateProceso() {
    this.UserService.updateProccess(this.processUsers)
        .subscribe(u=>{
          if(u == 1){
            Swal.fire('Exito!', 'Usuario(s) procesado(s) satisfactoriamente', 'success');
            this.searchAllUsers();
          } else {
            Swal.fire('Fallido', 'Uno o más usuarios no pudieron ser actualizados', 'success');
            this.searchAllUsers();
          }
        }
        );
  }

}
