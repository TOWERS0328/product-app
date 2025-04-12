import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private key = 'productos';

  obtenerProductos(): Producto[] {
    const datos = localStorage.getItem(this.key);
    return datos ? JSON.parse(datos) : [];
  }

  agregarProducto(producto: Producto) {
    const productos = this.obtenerProductos();
    productos.push(producto);
    localStorage.setItem(this.key, JSON.stringify(productos));
  }

  eliminarProducto(index: number) {
    const productos = this.obtenerProductos();
    productos.splice(index, 1);
    localStorage.setItem(this.key, JSON.stringify(productos));
  }
  
}
