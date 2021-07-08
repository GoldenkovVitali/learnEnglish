import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'div[app-footer-slider]',
  templateUrl: './footer-slider.component.html',
  styleUrls: ['./footer-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterSliderComponent {
  @HostBinding('class') class = 'dev-team__slider';
}
