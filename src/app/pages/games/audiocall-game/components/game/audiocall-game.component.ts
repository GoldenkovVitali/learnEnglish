import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordsApiService } from '@app/server/api';
import { AudiocallService } from '../../audiocall.service';

@Component({
  selector: 'app-audiocall-game',
  templateUrl: './audiocall-game.component.html',
  styleUrls: ['./audiocall-game.component.scss'],
})
export class AudiocallGameComponent implements OnInit {
  @HostBinding('class.fullscreen') changeFullscreen = false;

  group: number;
  page: number;
  requestMediaUrl = 'https://raw.githubusercontent.com/GoldenkovVitali/rslang-data/master/';
  wordsFromApi: any[] = [];
  currentWords: any[] = [];
  wordsQuantityInRound = 5;
  currentLastWordInRound = 0;
  askedWordIndex = 0;
  wordImg = '';
  wordExample = '';
  answer = '';
  numberOfCorrectAnswers = 0;
  numberOfErrors = 0;
  correctAnswer = false;
  correctStyle = false;
  active = false;
  startGame = true;
  endGame = false;
  pressedKey: string;

  constructor(
    private route: ActivatedRoute,
    private backEndService: WordsApiService,
    private gameService: AudiocallService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.group = param.group;
      this.page = param.page;
      this.getWordsFromBE();
      document.querySelectorAll('body')[0].addEventListener('keyup', (key) => {
        this.checkWordByKey(key.key);
      });
    });
  }

  getWordsFromBE(): void {
    this.backEndService.getWordsByPageAndGroup(+this.page, +this.group).subscribe((data) => {
      this.wordsFromApi = data;
      this.buildWordsArrayForGameRound();
      this.getRandomWord(this.currentWords.length);
      this.getSound().play();
    });
  }

  buildWordsArrayForGameRound() {
    this.currentWords = this.wordsFromApi.slice(
      this.currentLastWordInRound,
      this.currentLastWordInRound + this.wordsQuantityInRound
    );
  }

  getRandomWord(max) {
    this.askedWordIndex = Math.floor(Math.random() * max);
  }

  getSound() {
    const wordSoundUrl = this.currentWords[this.askedWordIndex].audio;
    const askedWordSound = new Audio(`${this.requestMediaUrl}${wordSoundUrl}`);
    return askedWordSound;
  }

  getImg() {
    const wordImgUrl = this.currentWords[this.askedWordIndex].image;
    const askedWordImage = `${this.requestMediaUrl}${wordImgUrl}`;
    return askedWordImage;
  }

  checkWord(word) {
    if (this.currentWords[this.askedWordIndex].id === word.id) {
      this.currentWords[this.askedWordIndex].correctStyle = true;
      this.gameService.playSound(this.gameService.correct);
      this.correctStyle = true;
      this.active = true;
      this.wordImg = this.getImg();
      this.wordExample = `
      ${this.currentWords[this.askedWordIndex].word}
      ${this.currentWords[this.askedWordIndex].transcription} -
      ${this.currentWords[this.askedWordIndex].wordTranslate}
      `;
      this.correctAnswer = true;
      this.numberOfCorrectAnswers += 1;
      this.gameService.updateStrikeSerie(true);
    } else {
      this.gameService.playSound(this.gameService.error);
      word.errorStyle = true;
      this.numberOfErrors += 1;
      this.gameService.updateStrikeSerie(false);
    }
  }

  checkWordByKey(keyCode) {
    const keyCodeNumberType = +keyCode;
    if (typeof keyCodeNumberType === 'number' && keyCodeNumberType < 6) {
      if (keyCodeNumberType === this.askedWordIndex + 1) {
        this.currentWords[this.askedWordIndex].correctStyle = true;
        this.gameService.playSound(this.gameService.correct);
        this.correctStyle = true;
        this.active = true;
        this.wordImg = this.getImg();
        this.wordExample = `
        ${this.currentWords[this.askedWordIndex].word}
        ${this.currentWords[this.askedWordIndex].transcription} -
        ${this.currentWords[this.askedWordIndex].wordTranslate}
        `;
        this.correctAnswer = true;
        this.numberOfCorrectAnswers += 1;
      } else {
        this.gameService.playSound(this.gameService.error);
        this.currentWords[keyCodeNumberType - 1].errorStyle = true;
        this.numberOfErrors += 1;
      }
    }
  }

  repeatSound() {
    this.getSound().play();
  }

  startNextRound() {
    if (this.currentLastWordInRound > 14) {
      this.startGame = false;
      this.endGame = true;
    }
    this.currentLastWordInRound += this.wordsQuantityInRound;
    this.correctStyle = false;
    this.correctAnswer = false;
    this.active = false;
    this.answer = '';
    this.buildWordsArrayForGameRound();
    this.getRandomWord(this.currentWords.length);
  }

  showAnswer() {
    this.answer = `Ответ: ${this.currentWords[this.askedWordIndex].wordTranslate}`;
  }

  addStatistic() {
    localStorage.setItem(
      'audiocall-correct',
      `${(this.gameService.numberOfCorrectAnswers += this.numberOfCorrectAnswers)}`
    );

    localStorage.setItem(
      'audiocall-errors',
      `${(this.gameService.numberOfErrors += this.numberOfErrors)}`
    );
  }

  playTrack(wordTrack) {
    const soundIndexInMainArr = +wordTrack.target.id;
    const wordSoundUrl = this.wordsFromApi[soundIndexInMainArr].audio;
    const sound = new Audio(`${this.requestMediaUrl}${wordSoundUrl}`);
    sound.play();
  }

  changeFullscreenMode() {
    this.changeFullscreen = !this.changeFullscreen;
  }
}
