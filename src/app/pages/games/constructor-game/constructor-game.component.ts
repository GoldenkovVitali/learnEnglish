import { Component, HostBinding, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElectronicTextbookService } from '@app/pages/electronic-textbook/electronic-textbook.service';
import { WordsApiService } from '../../../server/api';

@Component({
  selector: 'app-constructor-game',
  templateUrl: './constructor-game.component.html',
  styleUrls: ['./constructor-game.component.scss'],
})
export class ConstructorGameComponent implements OnInit {
  @HostBinding('class.fullscreen') changeFullscreen = false;
  isMistake = false;
  @ViewChild('keysBlock') keysBlock;
  isUserDoMistake = false;
  rightAnswers = 0;
  wrongAnswers = 0;
  showResult = false;
  isLevelChosen = false;
  page = 0;
  selectedGroup = 0;
  selectedPage = 0;
  baseImgUrl = 'https://raw.githubusercontent.com/GoldenkovVitali/rslang-data/master/';
  isEndRaund = false;
  context = '';
  translateWord = '';
  placeIndex = 0;
  word = '';
  raund = 0;
  letterArr: string[];
  rightLettersArr = [];
  rightAnswersStreak = 0;
  wordsArr = [];

  constructor(
    private apiService: WordsApiService,
    private etextBookService: ElectronicTextbookService,
    private route: ActivatedRoute
  ) {}

  sliceWord(word: string): string[] {
    return word.split('');
  }

  randomiseLetters(letterArr: string[]): string[] {
    return letterArr.sort();
  }

  getReadyForGameWord(word: string): string[] {
    const letterArr = this.sliceWord(word);
    return this.randomiseLetters(letterArr);
  }

  checkLetter(letter: string, index: number, event: Event) {
    if (letter == this.word[this.placeIndex]) {
      this.letterArr.splice(index, 1);
      this.rightLettersArr[this.placeIndex] = letter;
      this.placeIndex++;
      if (this.placeIndex === this.word.length) {
        this.endRaund();
      }
      if (this.raund > 10) {
        this.word = '';
        this.raund = 0;
        this.showResult = true;
      }
    } else {
      this.isUserDoMistake = true;
      (<HTMLElement>event.target).classList.add('error');
      (<HTMLElement>event.target).classList.remove('ready-letter');
      setTimeout(() => {
        (<HTMLElement>event.target).classList.remove('error');
        (<HTMLElement>event.target).classList.add('ready-letter');
      }, 500);
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      if (param.selectedPage !== undefined && param.selectedGroup !== undefined) {
        this.selectedGroup = param.selectedGroup;
        this.page = param.selectedPage;
        this.getData();
      }
    });
    if (
      !localStorage.getItem('wordConstructorRightAnswers') &&
      !localStorage.getItem('wordConstructorWrongAnswers') &&
      !localStorage.getItem('wordConstructorRightStreak')
    ) {
      localStorage.setItem('wordConstructorRightAnswers', '0');
      localStorage.setItem('wordConstructorWrongAnswers', '0');
      localStorage.setItem('wordConstructorRightStreak', '0');
    }
  }

  getData(): void {
    this.apiService.getWordsByPageAndGroup(this.page, this.selectedGroup).subscribe((data) => {
      this.wordsArr = data;
      this.nextRaund();
    });
  }

  nextRaund(): void {
    this.isUserDoMistake = false;
    this.baseImgUrl = 'https://raw.githubusercontent.com/GoldenkovVitali/rslang-data/master/';
    this.isLevelChosen = true;
    this.isEndRaund = false;
    this.placeIndex = 0;
    this.letterArr = [];
    this.rightLettersArr = [];

    this.word = this.wordsArr[this.raund].word;
    this.translateWord = this.wordsArr[this.raund].wordTranslate;
    this.context = `${this.wordsArr[this.raund].word} ${
      this.wordsArr[this.raund].transcription
    } - ${this.wordsArr[this.raund].wordTranslate}`;
    this.baseImgUrl += this.wordsArr[this.raund].image;
    for (let i = 0; i < this.word.length; i++) {
      this.rightLettersArr.push('');
    }
    this.letterArr = this.getReadyForGameWord(this.word);
  }

  showAnswer(): void {
    for (let i = 0; i < this.word.length; i++) {
      this.rightLettersArr[i] = this.word[i];
    }

    this.placeIndex = -1;

    this.letterArr = [];

    this.isUserDoMistake = true;

    this.endRaund();

    if (this.raund > 10) {
      this.word = '';
      this.raund = 0;
      this.showResult = true;
    }
  }

  @HostListener('window:keydown', ['$event'])
  keysHandler(event): void {
    if (event.code === 'Enter' && this.isEndRaund) {
      this.nextRaund();
    } else if (event.code === 'Enter' && !this.isEndRaund && !this.showResult) {
      this.showAnswer();
    }
    if (event.key === this.word[this.placeIndex]) {
      this.letterArr.splice(this.letterArr.indexOf(this.word[this.placeIndex]), 1);
      this.rightLettersArr[this.placeIndex] = this.word[this.placeIndex];
      this.placeIndex++;
      if (this.placeIndex === this.word.length) {
        this.endRaund();
      }
      if (this.raund > 10) {
        this.word = '';
        this.raund = 0;
        this.showResult = true;
      }
    } else if (event.key !== this.word[this.placeIndex]) {
      this.isUserDoMistake = true;
      for (let i = 0; i < this.keysBlock.nativeElement.children.length; i++) {
        this.isMistake = true;
        setTimeout(() => {
          this.isMistake = false;
        }, 500);
      }
    }
  }

  endRaund(): void {
    this.raund++;
    this.isEndRaund = true;

    if (this.isUserDoMistake) {
      localStorage.setItem(
        'wordConstructorWrongAnswers',
        JSON.stringify(Number(localStorage.getItem('wordConstructorWrongAnswers')) + 1)
      );
      this.wrongAnswers++;
    } else {
      this.rightAnswers++;
      this.rightAnswersStreak = this.rightAnswers;
      if (Number(localStorage.getItem('wordConstructorRightStreak')) < this.rightAnswersStreak) {
        localStorage.setItem('wordConstructorRightStreak', JSON.stringify(this.rightAnswersStreak));
      }
      localStorage.setItem(
        'wordConstructorRightAnswers',
        JSON.stringify(Number(localStorage.getItem('wordConstructorRightAnswers')) + 1)
      );
    }
    if (this.page != 30) {
      this.page++;
    } else {
      alert('Вы прошли все слова группы!');
      location.reload();
    }
  }

  continueGame(): void {
    this.showResult = false;
    this.rightAnswers = 0;
    this.wrongAnswers = 0;
    this.nextRaund();
  }

  reload(): void {
    location.reload();
  }

  onChangeGroup(selected): void {
    this.selectedGroup = Number(selected) - 1;
  }

  onChangePage(selected): void {
    this.selectedPage = Number(selected);
    this.page = this.selectedPage;
  }

  changeFullscreenMode(): void {
    this.changeFullscreen = !this.changeFullscreen;
  }
}
