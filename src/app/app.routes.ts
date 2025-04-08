import { Routes } from '@angular/router';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ProductoListaComponent } from './components/producto-lista/producto-lista.component';

export const routes: Routes = [
  { path: '', redirectTo: 'formulario', pathMatch: 'full' }, // redirección por defecto
  { path: 'formulario', component: ProductoFormComponent },
  { path: 'lista', component: ProductoListaComponent }
];
