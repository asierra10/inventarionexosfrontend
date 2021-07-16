import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductoComponent } from './components/producto/producto.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  {
    path : '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path : 'products',
    component : ProductoComponent
  },
  {
    path : 'users',
    component : UsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
