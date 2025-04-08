

export interface Producto {
  nombre: string;
  precio: number;
  moneda: string; // <-- NUEVO
  fechaCaducidad: string;
  categoria: string;
  tieneDescuento: boolean;
  descuento: number; // <- Agregar esto
}
