import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  formulario!: FormGroup;
  categorias: string[] = ['Tecnología', 'Hogar', 'Ropa', 'Alimentos', 'Libros'];

  constructor(private fb: FormBuilder, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [0, [Validators.required, Validators.min(1)]],
      moneda: ['', Validators.required],
      fechaCaducidad: ['', [Validators.required, this.fechaFuturaValidator]],
      categoria: ['', Validators.required],
      tieneDescuento: [false],
      descuento: [0]
    });

    this.formulario.get('tieneDescuento')?.valueChanges.subscribe(valor => {
      const descuentoCtrl = this.formulario.get('descuento');
      if (valor) {
        descuentoCtrl?.setValidators([Validators.required, Validators.min(1), Validators.max(100)]);
      } else {
        descuentoCtrl?.clearValidators();
      }
      descuentoCtrl?.updateValueAndValidity();
    });
  }

  get f() {
    return this.formulario.controls;
  }

  guardar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const producto: Producto = {
      nombre: this.f['nombre'].value,
      precio: this.f['precio'].value,
      moneda: this.f['moneda'].value,
      fechaCaducidad: this.f['fechaCaducidad'].value,
      categoria: this.f['categoria'].value,
      tieneDescuento: this.f['tieneDescuento'].value,
      descuento: this.f['tieneDescuento'].value ? this.f['descuento'].value : 0
    };

    this.productoService.agregarProducto(producto);
    alert('✅ Producto guardado correctamente');

    this.formulario.reset({
      nombre: '',
      precio: 0,
      moneda: '',
      fechaCaducidad: '',
      categoria: '',
      tieneDescuento: false,
      descuento: 0
    });
  }

  fechaFuturaValidator(control: AbstractControl) {
    if (!control.value) return null;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fecha = new Date(control.value);
    fecha.setHours(0, 0, 0, 0); // 🔁 Esto es lo que faltaba

    return fecha > hoy ? null : { fechaPasada: true };
  }

}
