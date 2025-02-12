import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // ✅ Import HttpClient

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(), // ✅ Fix for animations
    provideHttpClient(withInterceptorsFromDi()) // ✅ Fix for HttpClientModule
  ]
}).catch(err => console.error(err));
