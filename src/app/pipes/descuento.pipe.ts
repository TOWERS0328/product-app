import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuento'
})
export class DescuentoPipe implements PipeTransform {
  transform(precio: number, aplicaDescuento: boolean): any {
    if (aplicaDescuento) {
      const nuevoPrecio = precio * 0.85;
      return `<s>$${precio.toFixed(2)}</s> <b class="text-success">$${nuevoPrecio.toFixed(2)}</b>`;
    }
    return `$${precio.toFixed(2)}`;
  }
}
