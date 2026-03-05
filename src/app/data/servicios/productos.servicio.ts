import { Injectable } from '@angular/core';
import { PRODUCTOS } from '../mock/productos.mock';
import { Producto } from '../modelos/producto.modelo';

@Injectable({ providedIn: 'root' })
export class ProductosServicio {

  getAll(): Producto[] {
    return PRODUCTOS;
  }

  getById(id: string): Producto | undefined {
    return PRODUCTOS.find(p => p.id === id);
  }
}
