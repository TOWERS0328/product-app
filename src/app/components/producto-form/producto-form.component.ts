import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
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

  formulario: any;

  categorias: string[] = ['Tecnología', 'Hogar', 'Ropa', 'Alimentos', 'Libros'];

  constructor(private fb: FormBuilder, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [0, [Validators.required, Validators.min(1)]],
      fechaCaducidad: ['', [Validators.required, this.fechaFuturaValidator]],
      categoria: ['', Validators.required],
      descuento: [false]
    });
  }

  get f() {
    return this.formulario.controls;
  }

  guardar() {
    if (this.formulario.invalid) return;

    const producto: Producto = {
      nombre: this.f.nombre.value,
      precio: this.f.precio.value,
      fechaCaducidad: this.f.fechaCaducidad.value,
      categoria: this.f.categoria.value,
      tieneDescuento: this.f.descuento.value
    };

    this.productoService.agregarProducto(producto);
    alert('✅ Producto guardado correctamente');
    this.formulario.reset(); // limpia el formulario
  }

  fechaFuturaValidator(control: any) {
    const fechaActual = new Date();
    const fechaIngresada = new Date(control.value);
    return fechaIngresada > fechaActual ? null : { fechaPasada: true };
  }
}
