import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';
import { ParamKey } from '@app/app-routing.enum';
import { AuthGuard } from '../guard/auth.guard';
import { MainNav } from './header-menu.enum';

@Component({
  selector: 'div[app-header-menu]',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMenuComponent implements OnInit, OnChanges {
  @HostBinding('class') class = 'menu';
  @Input() isAuthenticated;
  canActive;

  navMenu: Array<Array<string>>;

  menuRoutes: object;

  constructor(public authGuard: AuthGuard) {
    this.navMenu = Object.entries(MainNav);
    this.menuRoutes = ParamKey;
  }

  ngOnInit(): void {
    this.canActive = this.isAuthenticated;
  }

  ngOnChanges(changes): void {
    this.isAuthenticated = changes.isAuthenticated.currentValue;
    this.canActive = this.authGuard.canActivate(null, null);
  }
}
