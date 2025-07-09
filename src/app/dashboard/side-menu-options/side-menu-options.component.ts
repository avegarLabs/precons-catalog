import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCube, faCubes, faHelmetSafety, faTags, faTruck, faLayerGroup, faHome } from '@fortawesome/free-solid-svg-icons';

interface MenuOptions {
  icon: string;
  label: string;
  subLabel: string;
  route?: string;
  action?: 'logout';
}

@Component({
  selector: 'app-side-menu-options',
  imports: [RouterLink, FontAwesomeModule, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  private iconLibrary = inject(FaIconLibrary);
  router = inject(Router);
  constructor() {
    this.iconLibrary.addIcons(faCube, faCubes, faHelmetSafety, faTags, faTruck, faLayerGroup, faHome);
  }

  menuOptions: MenuOptions[] = [
    {
      icon: 'faHome',
      label: 'Inicio',
      subLabel: 'Inicio',
      route: '/dashboard/index',
    },
    {
      icon: 'faCube',
      label: 'Recursos',
      subLabel: 'Materiales',
      route: '/dashboard/resources',
    },
     {
      icon: 'helmet-safety',
      label: 'Mano de Obra',
      subLabel: 'Fuerza de Trabajo',
      route: '/dashboard/workers',
    },
     {
      icon: 'faTruck',
      label: 'Equipos',
      subLabel: 'Equipos',
      route: '/dashboard/equipment',
    },
    {
      icon: 'faCubes',
      label: 'Juego de Productos',
      subLabel: 'Juego de Productos',
      route: '/dashboard/juego',
    },
     {
      icon: 'layer-group',
      label: 'Semielaborados',
      subLabel: 'Sum. Semielaborados',
      route: '/dashboard/semi',
    },
     {
      icon: 'faTags',
      label: 'Renglones',
      subLabel: 'Renglones Constructivos',
      route: '/dashboard/renglones',
    },

  ];

 /* logout() {
  this.auth.logout();
  this.router.navigate(['/login']);
}*/

  getIconName(icon: string) {
    return icon.replace('fa', '').toLowerCase();
  }
}
