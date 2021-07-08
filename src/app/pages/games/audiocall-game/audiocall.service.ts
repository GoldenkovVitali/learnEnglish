import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AudiocallService {
  error = new Audio('../../../../assets/sounds/error.mp3');
  failure = new Audio('../../../../assets/sounds/failure.mp3');
  correct = new Audio('../../../../assets/sounds/correct.mp3');
  success = new Audio('../../../../assets/sounds/success.mp3');
  numberOfCorrectAnswers = 0;
  numberOfErrors = 0;
  strikeSerie = 0;

  playSound(sound) {
    sound.play();
  }

  updateStrikeSerie(answer: boolean) {
    if (answer) {
      this.strikeSerie += 1;
      if (+localStorage.getItem('audiocall-strike') < this.strikeSerie) {
        localStorage.setItem('audiocall-strike', `${this.strikeSerie}`);
      }
    } else {
      this.strikeSerie = 0;
    }
  }
}
