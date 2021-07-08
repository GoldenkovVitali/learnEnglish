import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronicTextbookService } from '../../electronic-textbook.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() page: number;
  @Input() quantityPages: number[];
  @Input() isDictionary: boolean;

  pagesPagination: number[];

  constructor(private router: Router, private textbookService: ElectronicTextbookService) {}

  onChangePage(event: Event): void {
    this.page = +(event.target as HTMLSelectElement).value;
    this.textbookService.pages = this.page;
    this.goToRouter();
  }

  onClickPage(value: string): void {
    this.page = value === 'back' ? this.textbookService.pages - 1 : this.textbookService.pages + 1;
    this.textbookService.pages = this.page;
    this.goToRouter();
  }

  goToRouter(): void {
    const path = this.isDictionary
      ? ['textbook/dictionary', this.textbookService.getDictionarySection, 'page', this.page]
      : ['textbook/group', this.textbookService.groups, 'page', this.page];
    this.router.navigate(path);
  }
}
