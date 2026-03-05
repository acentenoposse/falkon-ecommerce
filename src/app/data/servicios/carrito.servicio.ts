
import { Injectable, computed, signal } from '@angular/core';
import { Producto } from '../modelos/producto.modelo';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

const LS_KEY = 'falkon_carrito_v1';

@Injectable({ providedIn: 'root' })
export class CarritoServicio {

  private readonly _items = signal<ItemCarrito[]>(this.cargar());
  readonly items = this._items.asReadonly();

  readonly totalItems = computed(() =>
    this._items().reduce((acc, it) => acc + it.cantidad, 0)
  );

  readonly subtotal = computed(() =>
    this._items().reduce((acc, it) => acc + it.cantidad * it.producto.precio, 0)
  );

  add(producto: Producto, cantidad = 1) {
    const items = [...this._items()];
    const idx = items.findIndex(i => i.producto.id === producto.id);

    if (idx >= 0) items[idx] = { ...items[idx], cantidad: items[idx].cantidad + cantidad };
    else items.push({ producto, cantidad });

    this.set(items);
  }

  inc(productoId: string) {
    const it = this._items().find(i => i.producto.id === productoId);
    if (!it) return;
    this.setQty(productoId, it.cantidad + 1);
  }

  dec(productoId: string) {
    const it = this._items().find(i => i.producto.id === productoId);
    if (!it) return;
    this.setQty(productoId, it.cantidad - 1);
  }

  setQty(productoId: string, cantidad: number) {
    const items = this._items()
      .map(i => (i.producto.id === productoId ? { ...i, cantidad } : i))
      .filter(i => i.cantidad > 0);

    this.set(items);
  }

  remove(productoId: string) {
    this.set(this._items().filter(i => i.producto.id !== productoId));
  }

  clear() {
    this.set([]);
  }

  private set(items: ItemCarrito[]) {
    this._items.set(items);
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }

  private cargar(): ItemCarrito[] {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
