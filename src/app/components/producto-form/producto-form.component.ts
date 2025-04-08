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
      fechaCaducidad: ['', [Validators.required, this.fechaFuturaValidator]],
      categoria: ['', Validators.required],
      tieneDescuento: [false],
      descuento: [0]
    });

    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [0, [Validators.required, Validators.min(1)]],
      moneda: ['', Validators.required], // <-- NUEVO CAMPO
      fechaCaducidad: ['', [Validators.required, this.fechaFuturaValidator]],
      categoria: ['', Validators.required],
      tieneDescuento: [false],
      descuento: [0]
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
      moneda: this.f['moneda'].value, // <-- Asegúrate de incluir esto
      fechaCaducidad: this.f['fechaCaducidad'].value,
      categoria: this.f['categoria'].value,
      tieneDescuento: this.f['tieneDescuento'].value,
      descuento: this.f['tieneDescuento'].value ? this.f['descuento'].value : 0
    };

    this.productoService.agregarProducto(producto);
    alert('✅ Producto guardado correctamente');

    // 👉 Aquí haces el reset con los valores por defecto
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
    const fechaActual = new Date();
    const fechaIngresada = new Date(control.value);
    if (!control.value) return null;
    return fechaIngresada > fechaActual ? null : { fechaPasada: true };
  }
}
