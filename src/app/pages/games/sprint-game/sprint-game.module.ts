import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SprintGameComponent } from './sprint-game.component';
import { SprintGameRoutingModule } from './sprint-game-routing.module';

@NgModule({
  declarations: [SprintGameComponent],
  imports: [FormsModule, CommonModule, SprintGameRoutingModule],
  exports: [SprintGameComponent],
})
export class SprintGameModule {}
