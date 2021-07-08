import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudiocallGameComponent } from './components/game/audiocall-game.component';
import { AudiocallPromoComponent } from './components/audiocall-promo/audiocall-promo.component';
import { AudiocallRoutingModule } from './audiocall-routing.module';

@NgModule({
  declarations: [AudiocallPromoComponent, AudiocallGameComponent],
  imports: [CommonModule, AudiocallRoutingModule, FormsModule],
})
export class AudiocallModule {}
