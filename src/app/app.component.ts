import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ParamKey } from './app-routing.enum';

@Component({
  selector: 'body[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent {
  footerVisibility = true;
  showModal = false;
  isAuthenticated = false;

  auth(value): void {
    this.isAuthenticated = value;
  }

  openModal(value: boolean): void {
    this.showModal = value;
  }

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        if (
          val.url.includes(ParamKey.audiocallPromo) ||
          val.url.includes(ParamKey.savannaPromo) ||
          val.url.includes(ParamKey.sprintGame) ||
          val.url.includes('audiocall')
        ) {
          this.footerVisibility = false;
        } else {
          this.footerVisibility = true;
        }
      }
    });
  }
}
