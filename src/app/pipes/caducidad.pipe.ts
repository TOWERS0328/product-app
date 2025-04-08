import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caducidad'
})
export class CaducidadPipe implements PipeTransform {
  transform(fecha: Date): string {
    const hoy = new Date();
    const caduca = new Date(fecha);
    const diferencia = (caduca.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);

    if (diferencia < 5) {
      return `<span class="text-danger">¡Caduca pronto!</span>`;
    }

    return `Válido hasta ${caduca.toLocaleDateString('es-CO')}`;
  }
}
