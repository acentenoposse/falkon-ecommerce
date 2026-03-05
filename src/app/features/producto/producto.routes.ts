import { Routes } from '@angular/router';
import { ProductoPage } from './paginas/producto.page';

export const PRODUCTO_ROUTES: Routes = [
  { path: ':id', component: ProductoPage },
];
