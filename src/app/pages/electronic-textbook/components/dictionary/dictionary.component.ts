import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@app/shared/services/loading.service';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ElectronicTextbookService } from '../../electronic-textbook.service';
import { IWord } from '../../word';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent implements OnDestroy, AfterViewInit {
  array: IWord[];
  path: string;
  page: number;
  wordsDictionary = new BehaviorSubject<IWord[]>([]);
  isDictionary: boolean;
  isLouder = false;
  subscription: Subscription;
  subscriptionRoute: Subscription;
  constructor(
    private activateRoute: ActivatedRoute,
    private textbookService: ElectronicTextbookService,
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.textbookService.dictionary = true;
    this.isDictionary = this.textbookService.dictionary;
    this.textbookService.isUserWords.subscribe((value) => {
      if (value) {
        this.isLouder = !!(!this.textbookService.userWords.length && value);
        this.textbookService.getUserWordsArray();
      }
    });
    this.subscription = this.textbookService.getWords().subscribe((data) => {
      this.wordsDictionary.next(data);
      this.array = this.filterArrayWords().slice(this.page * 20, (this.page + 1) * 20);
      if (data.length) {
        this.isLouder = true;
      }
    });
  }

  ngAfterViewInit(): void {
    this.subscriptionRoute = this.activateRoute.params.subscribe((routeParams) => {
      const { group, page } = routeParams;
      this.textbookService.setDictionarySection = group;
      this.path = group;
      this.page = +page;
      this.array = this.filterArrayWords().slice(this.page * 20, (this.page + 1) * 20);
      this.cdr.detectChanges();
    });
  }

  filterArrayWords(): IWord[] {
    let array: IWord[];
    if (this.path === 'difficult') {
      array = this.wordsDictionary
        .getValue()
        .filter((word) => word.userWord.difficulty === 'hard' && !word.userWord.optional.delete);
    } else if (this.path === 'deleted') {
      array = this.wordsDictionary.getValue().filter((word) => word.userWord.optional.delete);
    } else {
      array = this.wordsDictionary.getValue();
    }
    this.textbookService.setPagination = array.length;
    return array;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionRoute.unsubscribe();
    this.textbookService.updateWordsArray([]);
    this.isLouder = true;
  }
}
