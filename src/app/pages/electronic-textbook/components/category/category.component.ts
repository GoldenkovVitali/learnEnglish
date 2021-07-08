import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ElectronicTextbookService } from '../../electronic-textbook.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export default class CategoryComponent {
  constructor(
    private activateRoute: ActivatedRoute,
    private textbookService: ElectronicTextbookService
  ) {
    const { group }: Params = this.activateRoute.snapshot.params;
    if (group) {
      this.textbookService.groups = +group;
    }
  }
}
