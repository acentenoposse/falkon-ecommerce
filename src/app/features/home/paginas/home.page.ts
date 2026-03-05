import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Navbar } from '../../../shared/componentes/navbar/navbar';
import { Footer } from '../../../shared/componentes/footer/footer';
import { ProductCard } from '../../../shared/componentes/product-card/product-card';

import { PRODUCTOS } from '../../../data/mock/productos.mock';
import { CategoriaProducto, Producto } from '../../../data/modelos/producto.modelo';

type Orden = 'popular' | 'precio-asc' | 'precio-desc';

@Component({
  selector: 'fw-home-page',
  standalone: true,
  imports: [CommonModule, Navbar, Footer, ProductCard],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  protected readonly q = signal('');
  protected readonly categoria = signal<CategoriaProducto | 'todas'>('todas');
  protected readonly orden = signal<Orden>('popular');

  protected readonly categorias: { key: CategoriaProducto | 'todas'; label: string }[] = [
    { key: 'todas', label: 'Todas' },
    { key: 'remeras', label: 'Remeras' },
    { key: 'buzos', label: 'Buzos' },
    { key: 'pantalones', label: 'Pantalones' },
    { key: 'camperas', label: 'Camperas' },
    { key: 'accesorios', label: 'Accesorios' },
  ];

  protected readonly productos = computed<Producto[]>(() => {
    const query = this.q().trim().toLowerCase();
    const cat = this.categoria();
    const ord = this.orden();

    let list = PRODUCTOS.slice();

    if (cat !== 'todas') list = list.filter(p => p.categoria === cat);

    if (query) {
      list = list.filter(p => (p.nombre + ' ' + p.descripcion).toLowerCase().includes(query));
    }

    if (ord === 'precio-asc') list.sort((a, b) => a.precio - b.precio);
    if (ord === 'precio-desc') list.sort((a, b) => b.precio - a.precio);

    return list;
  });

  onBuscar(value: string) {
    this.q.set(value);
  }
}
