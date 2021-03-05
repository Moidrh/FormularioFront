import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  forma: FormGroup;

  public user = new User();

  constructor(private fb: FormBuilder, private UserService: UserService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  get firstNameNoValid() {
    return this.forma.get('firstName').invalid && this.forma.get('firstName').touched;
  }

  get lastNameNoValid() {
    return this.forma.get('lastName').invalid && this.forma.get('lastName').touched;
  }

  createForm() {

    this.forma = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]]
    });

  }

  saveUser() {
    if( this.forma.invalid) {
      Object.values(this.forma.controls).forEach(
        c=>{c.markAsTouched()}
      );
    } else {
      this.UserService.saveUser(this.user.firstName, this.user.lastName)
      .subscribe(m=>{
        if(m === 0) {
          Swal.fire('No es posible crear el usuario', 'No es posible crear el usuario', 'error');
        }else {
          Swal.fire('Exito!', 'Usuario creado satisfactoriamente', 'success');
        }
      });

      this.forma.reset();
    }
  }

}
