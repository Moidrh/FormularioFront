import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { RegistrosComponent } from './registros/registros.component';

const routes: Routes = [
  {path: 'formulario', component: FormularioComponent},
  {path: 'registros', component: RegistrosComponent},
  {path: '**', redirectTo: '/formulario'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
