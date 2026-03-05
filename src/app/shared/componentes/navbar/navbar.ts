import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoServicio } from '../../../data/servicios/carrito.servicio';

@Component({
  selector: 'fw-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Output() buscar = new EventEmitter<string>();
  protected readonly q = signal('');

  constructor(protected readonly carrito: CarritoServicio) {}

  onInput(value: string) {
    this.q.set(value);
    this.buscar.emit(value);
  }
}
