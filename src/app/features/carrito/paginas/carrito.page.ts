
import { Component, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Navbar } from '../../../shared/componentes/navbar/navbar';
import { Footer } from '../../../shared/componentes/footer/footer';
import { CarritoServicio } from '../../../data/servicios/carrito.servicio';

@Component({
  selector: 'fw-carrito-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, Navbar, Footer],
  templateUrl: './carrito.page.html',
  styleUrl: './carrito.page.scss',
})
export class CarritoPage {

  constructor(protected readonly carrito: CarritoServicio) {}

  protected readonly envio = computed(() =>
    this.carrito.subtotal() > 0 ? 6500 : 0
  );

  protected readonly total = computed(() =>
    this.carrito.subtotal() + this.envio()
  );
}
