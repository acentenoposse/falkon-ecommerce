
import { Component, computed, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Navbar } from '../../../shared/componentes/navbar/navbar';
import { Footer } from '../../../shared/componentes/footer/footer';
import { CarritoServicio } from '../../../data/servicios/carrito.servicio';
import { ProductosServicio } from '../../../data/servicios/productos.servicio';
import { Producto } from '../../../data/modelos/producto.modelo';

type Talle = 'S' | 'M' | 'L' | 'XL';
type Color = 'Negro' | 'Beige' | 'Gris' | 'Marrón';

@Component({
  selector: 'fw-producto-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, Navbar, Footer],
  templateUrl: './producto.page.html',
  styleUrl: './producto.page.scss',
})
export class ProductoPage {

  protected readonly id = signal<string>('');
  protected readonly producto = signal<Producto | null>(null);

  protected readonly talle = signal<Talle>('M');
  protected readonly color = signal<Color>('Negro');

  protected readonly talles: Talle[] = ['S','M','L','XL'];
  protected readonly colores: Color[] = ['Negro','Beige','Gris','Marrón'];

  protected readonly imagenes = computed(() => {
    const p = this.producto();
    if (!p) return [];
    return [p.imagenUrl, p.imagenUrl, p.imagenUrl];
  });

  protected readonly activa = signal(0);

  protected readonly qty = computed(() => {
    const p = this.producto();
    if (!p) return 0;
    const it = this.carrito.items().find(x => x.producto.id === p.id);
    return it?.cantidad ?? 0;
  });

  constructor(
    route: ActivatedRoute,
    private readonly productos: ProductosServicio,
    protected readonly carrito: CarritoServicio
  ) {
    const id = route.snapshot.paramMap.get('id') ?? '';
    this.id.set(id);

    const p = this.productos.getById(id);
    this.producto.set(p ?? null);
  }

  setImagen(index: number) {
    this.activa.set(index);
  }

  agregar() {
    const p = this.producto();
    if (!p) return;
    this.carrito.add(p, 1);
  }

  inc() {
    const p = this.producto();
    if (!p) return;
    this.carrito.inc(p.id);
  }

  dec() {
    const p = this.producto();
    if (!p) return;
    this.carrito.dec(p.id);
  }
}
