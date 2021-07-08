import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructorGameComponent } from './constructor-game.component';
import { ConstructorGameRoutingModule } from './constructor-game-routing.module';

@NgModule({
  declarations: [ConstructorGameComponent],
  imports: [CommonModule, ConstructorGameRoutingModule],
})
export class ConstructorGameModule {}
