import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.routes').then(m => m.HOME_ROUTES),
  },
  {
    path: 'carrito',
    loadChildren: () =>
      import('./features/carrito/carrito.routes').then(m => m.CARRITO_ROUTES),
  },
  {
    path: 'producto',
    loadChildren: () =>
      import('./features/producto/producto.routes').then(m => m.PRODUCTO_ROUTES),
  },
  {
  path: 'checkout',
  loadChildren: () =>
    import('./features/checkout/checkout.routes').then(m => m.CHECKOUT_ROUTES),
},
  { path: '**', redirectTo: '' },
];
