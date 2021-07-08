import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AudioSprintService {
  audioTimerSound = new Audio('../../../../assets/sounds/audio-sprint-game/audio_timer.mp3');
  audioRightAnswer = new Audio('../../../../assets/sounds/audio-sprint-game/audio_correct.mp3');
  audioWrongAnswer = new Audio('../../../../assets/sounds/audio-sprint-game/audio_error.mp3');
  playSoundError(): void {
    this.audioWrongAnswer.play();
  }

  stopSoundError(): void {
    this.audioWrongAnswer.pause();
  }

  playSoundTimer(): void {
    this.audioTimerSound.play();
  }

  stopSoundTimer(): void {
    this.audioTimerSound.pause();
  }

  playSoundAudioRightAnswer(): void {
    this.audioRightAnswer.play();
  }

  stopSoundAudioRightAnswer(): void {
    this.audioRightAnswer.pause();
  }
}
