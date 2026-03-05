export type CategoriaProducto =
  | 'remeras'
  | 'buzos'
  | 'pantalones'
  | 'camperas'
  | 'accesorios';

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: CategoriaProducto;
  precio: number;
  imagenUrl: string;
  etiqueta?: string; // ej: "Nuevo", "Sale"
  stock?: number;
}
