import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eastview-front';
  showWelcomeMessage: boolean = true; // Variable para controlar la visibilidad del mensaje de bienvenida

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Verificar si la ruta actual está dentro de un grupo de rutas específico
      const mainboardRoutes = ['/elojo', '/labruja'];
      this.showWelcomeMessage = !mainboardRoutes.some(route => event.url.includes(route));
    });
  }
}
