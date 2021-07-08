import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SavannaService {
  strikeSerie = 0;

  updateStrikeSerie(answer: boolean) {
    if (answer) {
      this.strikeSerie += 1;
      if (+localStorage.getItem('savannah-strike') < this.strikeSerie) {
        localStorage.setItem('savannah-strike', `${this.strikeSerie}`);
      }
    } else {
      this.strikeSerie = 0;
    }
  }
}
