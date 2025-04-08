import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router'; // ✅ NUEVO
import { routes } from './app/app.routes';       // ✅ NUEVO

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [provideRouter(routes)]             // ✅ AÑADIDO
}).catch((err) => console.error(err));
