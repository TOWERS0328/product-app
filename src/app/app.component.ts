import { Component } from '@angular/core';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ProductoListaComponent } from './components/producto-lista/producto-lista.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductoFormComponent, ProductoListaComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'product-app';
}
