import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'span[app-footer-credentials]',
  templateUrl: './footer-credentials.component.html',
  styleUrls: ['./footer-credentials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterCredentialsComponent {
  @HostBinding('class') class = 'dev-team__credentials';
}
