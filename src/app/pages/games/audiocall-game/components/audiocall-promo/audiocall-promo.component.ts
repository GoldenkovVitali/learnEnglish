import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-audiocall-promo',
  templateUrl: './audiocall-promo.component.html',
  styleUrls: ['./audiocall-promo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudiocallPromoComponent implements OnInit {
  startFromMenu;

  groupValue = 1;
  pageValue = 1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.startFromMenu = param.startFromMenu;
      if (this.startFromMenu === 'true') {
        this.startFromMenu = true;
      } else {
        this.startFromMenu = false;
      }
    });
  }
}
