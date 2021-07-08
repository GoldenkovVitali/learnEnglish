import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PromoComponent } from '@app/pages/promo/promo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import MaterialModule from './component/material/material.module';

import { HeaderComponent } from './layout/header/header.component';
import { HeaderMenuComponent } from './layout/header/header-menu/header-menu.component';
import { HeaderLogoComponent } from './layout/header/header-logo/header-logo.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthButtonComponent } from './layout/auth-button/auth-button.component';
import { FooterSliderComponent } from './layout/footer/footer-slider/footer-slider.component';
import { FooterCredentialsComponent } from './layout/footer/footer-credentials/footer-credentials.component';
import { PromoButtonComponent } from './layout/promo-button/promo-button.component';
import HoverPersonInfoDirective from './directives/hover-person-info.directive';
import { SpinnerComponent } from './component/spinner/spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderMenuComponent,
    HeaderLogoComponent,
    FooterComponent,
    AuthButtonComponent,
    FooterSliderComponent,
    FooterCredentialsComponent,
    PromoButtonComponent,
    PromoComponent,
    HoverPersonInfoDirective,
    SpinnerComponent,
  ],
  imports: [RouterModule, CommonModule, MaterialModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    HeaderMenuComponent,
    HeaderLogoComponent,
    FooterComponent,
    AuthButtonComponent,
    FooterSliderComponent,
    FooterCredentialsComponent,
    PromoButtonComponent,
    PromoComponent,
    HoverPersonInfoDirective,
    MaterialModule,
    SpinnerComponent,
  ],
  providers: [],
})
export default class SharedModule {}
