import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-savanna-promo',
  templateUrl: './savanna-promo.component.html',
  styleUrls: ['./savanna-promo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavannaPromoComponent implements OnInit {
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
