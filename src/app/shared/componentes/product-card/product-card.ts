import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Producto } from '../../../data/modelos/producto.modelo';
import { CarritoServicio } from '../../../data/servicios/carrito.servicio';

@Component({
  selector: 'fw-product-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input({ required: true }) producto!: Producto;

  constructor(protected readonly carrito: CarritoServicio) {}

  qty(): number {
    const it = this.carrito.items().find(x => x.producto.id === this.producto.id);
    return it?.cantidad ?? 0;
  }

  agregar() {
    this.carrito.add(this.producto, 1);
  }

  inc() {
    this.carrito.inc(this.producto.id);
  }

  dec() {
    this.carrito.dec(this.producto.id);
  }
}
