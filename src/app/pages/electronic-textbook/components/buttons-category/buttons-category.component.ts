import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-category',
  templateUrl: './buttons-category.component.html',
  styleUrls: ['./buttons-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsCategoryComponent {
  @Input() group: number;
  @Input() colorLink: string;

  @Output() clickCategory = new EventEmitter<number>();

  categories = ['one', 'two', '3', '4', '5', '6'];

  onClickCategory(id: number): void {
    this.clickCategory.emit(id);
  }
}
