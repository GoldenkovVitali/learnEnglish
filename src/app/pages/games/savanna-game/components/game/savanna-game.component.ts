import { Component, OnInit, HostBinding, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordsApiService } from '@app/server/api';
import { SavannaService } from '../../savanna.service';

@Component({
  selector: 'app-savanna-game',
  templateUrl: './savanna-game.component.html',
  styleUrls: ['./savanna-game.component.scss'],
})
export class SavannaGameComponent implements OnInit, OnDestroy {
  group: number;
  page: number;

  wordsFromApi: any[] = [];
  className = '';
  diamonWidth = 20;
  heartsPlay = [
    'savanna-grey-heart',
    'savanna-grey-heart',
    'savanna-grey-heart',
    'savanna-grey-heart',
    'savanna-grey-heart',
  ];

  savannaFallingWord: string;
  savannaWordCounter = 0;
  translations: any[] = [
    { wordTranslate: '' },
    { wordTranslate: '' },
    { wordTranslate: '' },
    { wordTranslate: '' },
  ];

  savannaHeartsCounter = 0;
  savannaWrongAnswers = 0;
  savannaRightAnswers = 0;
  buttonClicked = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backEndService: WordsApiService,
    private gameService: SavannaService
  ) {}

  ngOnInit(): void {
    this.setItemToLocalStorage();
    this.route.queryParams.subscribe((param) => {
      this.group = param.group;
      this.page = param.page;
      this.getWordsFromBE();
    });
  }

  ngOnDestroy(): void {
    this.clearAllSetTimeouts();
  }

  @HostBinding('class.fullscreen') changeFullscreen = false;

  @HostListener('document:keydown.1', ['$event'])
  onKeydownHandlerOne(): void {
    this.checkAnswer(this.translations[0].wordTranslate);
  }

  @HostListener('document:keydown.2', ['$event'])
  onKeydownHandlerTwo(): void {
    this.checkAnswer(this.translations[1].wordTranslate);
  }

  @HostListener('document:keydown.3', ['$event'])
  onKeydownHandlerThree(): void {
    this.checkAnswer(this.translations[2].wordTranslate);
  }

  @HostListener('document:keydown.4', ['$event'])
  onKeydownHandlerFour(): void {
    this.checkAnswer(this.translations[3].wordTranslate);
  }

  shuffleArr = (arr) => arr.sort(() => Math.random() - 0.5);

  getWordsFromBE(): void {
    this.backEndService.getWordsByPageAndGroup(+this.page, +this.group).subscribe((data) => {
      this.wordsFromApi = data;
      this.startGame();
      this.setClassToFallingWord();
    });
  }

  startGame(): void {
    this.clearAllSetTimeouts();
    this.savannaFallingWord = `${this.wordsFromApi[this.savannaWordCounter].word}`;
    this.setRandomWords();
    this.setClassToFallingWord();
    this.notCheckAnswer();
  }

  checkAnswer(event): void {
    event === `${this.wordsFromApi[this.savannaWordCounter].wordTranslate}`
      ? ((this.buttonClicked = true),
        (this.savannaRightAnswers += 1),
        this.gameService.updateStrikeSerie(true),
        (this.savannaWordCounter += 1),
        (this.diamonWidth += 1),
        (this.className = ''),
        this.setItemToLocalStorage(),
        this.setClassToFallingWord(),
        this.savannaRightAnswers !== 20 ? this.startGame() : null)
      : (this.heartsPlay.pop(),
        (this.savannaWrongAnswers += 1),
        this.gameService.updateStrikeSerie(false),
        this.setItemToLocalStorage(),
        this.startGame());
    this.savannaWrongAnswers === 5 || this.savannaWordCounter === 20
      ? (this.router.navigateByUrl('/games/savanna/savannagame/savannaresults'),
        this.setItemToLocalStorage())
      : null;
  }

  setItemToLocalStorage(): void {
    localStorage.setItem('savannaRightAnswers', `${this.savannaRightAnswers}`);
    localStorage.setItem('savannaWrongAnswers', `${this.savannaWrongAnswers}`);
  }

  setClassToFallingWord(): void {
    setTimeout(() => {
      this.className = 'savanna-animated';
    }, 150);
  }

  setRandomWords(): void {
    let translations = this.wordsFromApi
      .slice()
      .filter((word) => word.id !== this.wordsFromApi[this.savannaWordCounter].id);
    translations = this.shuffleArr(translations);
    translations = translations.slice(0, 3);
    translations.push(this.wordsFromApi[this.savannaWordCounter]);
    this.translations = this.shuffleArr(translations);
  }

  notCheckAnswer(): void {
    setTimeout(() => {
      if (this.buttonClicked === false) {
        this.heartsPlay.pop();
        this.savannaWrongAnswers += 1;
        this.setItemToLocalStorage();
        this.className = '';
        this.setClassToFallingWord();
        this.startGame();
      }
      if (this.savannaWrongAnswers === 5) {
        this.router.navigateByUrl('/games/savanna/savannagame/savannaresults');
      }
    }, 8000);
    this.buttonClicked = false;
  }

  clearAllSetTimeouts(): void {
    for (let i = setTimeout(() => {}, 0); i > 0; i -= 1) {
      window.clearTimeout(i);
      if (window.cancelAnimationFrame) window.cancelAnimationFrame(i);
    }
  }

  changeFullscreenMode(): void {
    this.changeFullscreen = !this.changeFullscreen;
  }
}
