import { Component } from '@angular/core';
import { ElectronicTextbookService } from '../../electronic-textbook.service';

@Component({
  selector: 'app-buttons-game',
  templateUrl: './buttons-game.component.html',
  styleUrls: ['./buttons-game.component.scss'],
})
export class ButtonsGameComponent {
  constructor(private textBookService: ElectronicTextbookService) {}

  get groupValue(): number {
    return this.textBookService.groups;
  }

  get pageValue(): number {
    return this.textBookService.pages;
  }

  onClick(): void {
    this.textBookService.addWordsToLearned();
  }
}
