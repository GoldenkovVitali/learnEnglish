import { AfterViewInit, Component, Input } from '@angular/core';
import { URL_FILES } from '@app/core/common/constants';
import { ElectronicTextbookService } from '../../electronic-textbook.service';
import { ICardInfo, IWord } from '../../word';

@Component({
  selector: 'app-card-word',
  templateUrl: './card-word.component.html',
  styleUrls: ['./card-word.component.scss'],
})
export class CardWordComponent implements AfterViewInit {
  @Input() word: IWord;
  @Input() isDictionary: boolean;
  urlImage: string;

  cardInfo: ICardInfo;

  constructor(public textbookService: ElectronicTextbookService) {
    this.textbookService.getCardInfo().subscribe((data) => {
      this.cardInfo = data;
    });
  }

  ngAfterViewInit(): void {
    this.urlImage =
      this.word.image.slice(0, 5) === 'files'
        ? URL_FILES + this.word.image
        : `data:image/jpg;base64,${this.word.image}`;
  }

  playAudio(): void {
    const url = [this.word.audio, this.word.audioExample, this.word.audioMeaning];
    this.textbookService.playAudio(url);
  }

  addWordHard(): void {
    this.textbookService[this.word.userWord ? 'updateUserWord' : 'addUserWord'](
      this.word.id,
      'hard',
      {
        date: Date.now(),
        repeat: this.word.userWord ? this.word.userWord.optional.repeat : 0,
        delete: false,
      },
      'Слово добавлено в сложные'
    );
  }

  addWordDeleted(): void {
    const difficulty = this.word.userWord ? this.word.userWord.difficulty : 'easy';
    this.textbookService[this.word.userWord ? 'updateUserWord' : 'addUserWord'](
      this.word.id,
      difficulty,
      {
        date: Date.now(),
        repeat: this.word.userWord ? this.word.userWord.optional.repeat : 0,
        delete: true,
      },
      'Слово добавлено в удаленные'
    );
  }

  removeFromDeleted(): void {
    this.textbookService.updateUserWord(
      this.word.id,
      this.word.userWord.difficulty,
      {
        ...this.word.userWord.optional,
        delete: false,
      },
      'Слово удаленно из удаленных'
    );
  }

  removeFromHard(): void {
    this.textbookService.updateUserWord(
      this.word.id,
      'easy',
      this.word.userWord.optional,
      'Слово удаленно из сложных'
    );
  }
}
