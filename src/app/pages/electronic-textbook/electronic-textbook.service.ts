import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { URL_FILES } from '@app/core/common/constants';
import { WordsApiService } from '@app/server/api';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { ICardInfo, IOptional, IUserInfo, IUserWord, IWord } from './word';

@Injectable({ providedIn: 'root' })
export class ElectronicTextbookService {
  private group = 0;
  private page = 0;
  private isDictionary = false;
  private colors = ['#a29bfe', '#f53b57', '#fd79a8', '#55efc4', '#ffeaa7', '#b2bec3'];
  private paginationPages = 30;
  private dictionarySection = 'studied';
  action = false;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  private wordsSource = new BehaviorSubject<IWord[]>([]);
  public words = this.wordsSource.asObservable();

  private wordsDictionarySource = new BehaviorSubject<IWord[]>([]);
  public wordsDictionary = this.wordsDictionarySource.asObservable();

  isPlay = true;
  isUserWords = new BehaviorSubject<boolean>(false);
  userData: IUserInfo;
  categoryWords: IWord[] = [];
  userWords: IUserWord[] = [];

  private cardInfoSource = new BehaviorSubject<ICardInfo>({
    isTextExampleTranslate: true,
    isWordTranslate: true,
    isButtonDelete: true,
    isButtonAdd: true,
  });

  public cardInfo = this.cardInfoSource.asObservable();

  constructor(private api: WordsApiService, public snackBar: MatSnackBar) {}

  get groups(): number {
    return this.group;
  }

  set groups(value: number) {
    this.group = value;
  }

  public get pages(): number {
    return this.page;
  }

  public set pages(value: number) {
    this.page = value;
  }

  get dictionary(): boolean {
    return this.isDictionary;
  }

  set dictionary(value: boolean) {
    this.isDictionary = value;
  }

  get getDictionarySection(): string {
    return this.dictionarySection;
  }

  set setDictionarySection(value: string) {
    this.dictionarySection = value;
  }

  get pagination(): number {
    return this.paginationPages;
  }

  set setPagination(pagination: number) {
    this.paginationPages = this.isDictionary ? Math.ceil(pagination / 20) : pagination;
  }

  getCardInfo = (): Observable<ICardInfo> => this.cardInfo;

  setCardInfo(obj: ICardInfo): void {
    this.cardInfoSource.next({ ...obj });
  }

  playAudio(url: string[]): void {
    const audioObj = new Audio();
    this.isPlay = false;
    let song = 0;
    const newUrl = `${url[song].slice(0, 5) === 'files' ? URL_FILES : `data:audio/mpeg;base64,`}`;
    audioObj.addEventListener('ended', () => {
      song += 1;
      song = song < url.length ? song : 0;

      if (song !== 0) {
        audioObj.src = `${newUrl}${url[song]}`;
        audioObj.load();
        audioObj.play();
      } else {
        this.isPlay = true;
      }
    });
    audioObj.src = `${newUrl + url[song]}`;
    audioObj.play();
  }

  getColor(index: number): string {
    return this.colors[index];
  }

  getWords(): Observable<IWord[]> {
    return this.words;
  }

  getUserWordsArray(): void {
    forkJoin(this.userWords.map((word) => this.api.getWordById(word.wordId))).subscribe((data) => {
      const wordsDictionary: any = this.userWords.map((word, index) => {
        return {
          ...data[index],
          userWord: word,
        };
      });
      this.updateWordsArray(wordsDictionary);
    });
  }

  updateWordsArray(array: IWord[]): void {
    this.wordsSource.next(array);
  }

  getWordsPageAndGroup(): void {
    this.api.getWordsByPageAndGroup(this.page, this.group).subscribe((data: IWord[]) => {
      const array = data.map((word) => {
        const findWord = this.userWords.find((userWord) => userWord.wordId === word.id);
        return findWord ? { ...word, userWord: findWord } : word;
      });
      this.wordsSource.next(array);
    });
  }

  getUserWords(userId: string, token: string): void {
    this.userData = { userId, token };
    this.api
      .getAllUsersWords(this.userData.userId, this.userData.token)
      .subscribe((data: IUserWord[]) => {
        this.userWords = data;
        this.isUserWords.next(true);
      });
  }

  addUserWord(wordId: string, wordDifficulty: string, optional: IOptional, message?: string): void {
    this.api
      .createUserWord(this.userData.userId, wordId, this.userData.token, wordDifficulty, optional)
      .subscribe((data: IUserWord) => {
        this.userWords = [...this.userWords, data];
        const newArrayWord = this.wordsSource
          .getValue()
          .map((word) => (word.id === data.wordId ? { ...word, userWord: data } : word));
        this.wordsSource.next(newArrayWord);
        this.openSnackBar(message);
      });
  }

  updateUserWord(
    wordId: string,
    wordDifficulty: string,
    optional: IOptional,
    message: string
  ): void {
    this.api
      .updateUserWord(this.userData.userId, wordId, this.userData.token, wordDifficulty, optional)
      .subscribe((data: IUserWord) => {
        this.userWords = [
          ...this.userWords.map((word) => (word.wordId === data.wordId ? { ...data } : word)),
        ];
        const newArrayWord = this.wordsSource
          .getValue()
          .map((word) => (word.id === data.wordId ? { ...word, userWord: data } : word));
        this.wordsSource.next(newArrayWord);
        this.openSnackBar(message);
      });
  }

  addWordsToLearned(): void {
    forkJoin(
      this.wordsSource.getValue().map((word) =>
        !word.userWord
          ? this.api.createUserWord(this.userData.userId, word.id, this.userData.token, 'easy', {
              date: Date.now(),
              repeat: 1,
              delete: false,
            })
          : this.api.updateUserWord(
              this.userData.userId,
              word.id,
              this.userData.token,
              word.userWord.difficulty,
              {
                date: Date.now(),
                repeat: word.userWord.optional.delete
                  ? word.userWord.optional.repeat
                  : word.userWord.optional.repeat + 1,
                delete: word.userWord.optional.delete,
              }
            )
      )
    ).subscribe((dataUser: IUserWord[]) => {
      dataUser.forEach((word) => {
        const index = this.userWords.findIndex((item: IUserWord) => item.wordId === word.wordId);
        if (index !== -1) {
          this.userWords[index] = word;
        } else {
          this.userWords.push(word);
        }
      });
    });
  }

  openSnackBar(message: string): void {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.autoHide;
    config.panelClass = ['snackbar'];
    this.snackBar.open(message, undefined, config);
  }
}
