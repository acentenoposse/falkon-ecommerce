
import { Routes } from '@angular/router';
import { CheckoutPage } from './paginas/checkout.page';
import { CheckoutOkPage } from './paginas/checkout-ok.page';

export const CHECKOUT_ROUTES: Routes = [
  { path: '', component: CheckoutPage },
  { path: 'ok', component: CheckoutOkPage },
];
