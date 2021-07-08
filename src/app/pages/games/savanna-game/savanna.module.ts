import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SavannaGameComponent } from './components/game/savanna-game.component';
import { SavannaPromoComponent } from './components/savanna-promo/savanna-promo.component';
import { SavannaRoutingModule } from './savanna-routing.module';
import { SavannaResultsComponent } from './components/savanna-results/savanna-results.component';

@NgModule({
  declarations: [SavannaPromoComponent, SavannaGameComponent, SavannaResultsComponent],
  imports: [CommonModule, SavannaRoutingModule, FormsModule],
})
export class SavannaModule {}
