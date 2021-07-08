import { Component, Input } from '@angular/core';
import { ElectronicTextbookService } from '../../electronic-textbook.service';
@Component({
  selector: 'app-buttons-dictionary',
  templateUrl: './buttons-dictionary.component.html',
  styleUrls: ['./buttons-dictionary.component.scss'],
})
export class ButtonsDictionaryComponent {
  @Input() page: number;
  public activeItem: string;
  public buttons = [
    { rus: 'Изученные', en: 'studied' },
    { rus: 'Сложные', en: 'difficult' },
    { rus: 'Удаленные', en: 'deleted' },
  ];

  constructor(public textBookService: ElectronicTextbookService) {
    this.activeItem = this.textBookService.getDictionarySection;
  }

  onClick(index: string): void {
    this.textBookService.setDictionarySection = index;
    this.textBookService.pages = 0;
    this.activeItem = index;
  }
}
