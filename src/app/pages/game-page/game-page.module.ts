import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import GamePageRoutingModule from './game-page-routing.module';
import GamePageComponent from './game-page.component';

@NgModule({
  imports: [CommonModule, GamePageRoutingModule, FormsModule],
  declarations: [GamePageComponent],
})
export class GamePageModule {}
