import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCube, faCubes, faHelmetSafety, faTags, faTruck, faLayerGroup, faHome } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  imports: [FontAwesomeModule, RouterLink],
  styleUrls: ['./index.component.css']
})
export default class IndexComponent {
private iconLibrary = inject(FaIconLibrary);

  constructor() {
    this.iconLibrary.addIcons(faCube, faCubes, faHelmetSafety, faTags, faTruck, faLayerGroup, faHome);
  }

    getIconName(icon: string) {
    return icon.replace('fa', '').toLowerCase();
  }
 

}
