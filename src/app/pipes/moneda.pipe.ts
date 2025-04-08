import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneda'
})
export class MonedaPipe implements PipeTransform {
  transform(valor: number, tipoMoneda: string = 'USD'): string {
    if (!valor) return '';

    let formato = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: tipoMoneda,
      minimumFractionDigits: 0,
    });

    return formato.format(valor);
  }
}
