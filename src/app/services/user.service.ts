import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveUser(firstName: string, lastName: string){

    const values = {
      firstName,
      lastName
    }

    const url = `${base_url}/create`;
    return this.http.post<number>(url, { }, {params: values}).pipe(
      map(resp=>{return resp})
    );

  }
}
