import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavannaPromoComponent } from './components/savanna-promo/savanna-promo.component';
import { SavannaGameComponent } from './components/game/savanna-game.component';
import { SavannaResultsComponent } from './components/savanna-results/savanna-results.component';

const routes: Routes = [
  { path: '', component: SavannaPromoComponent },
  { path: 'start', component: SavannaPromoComponent },
  { path: 'savannagame', component: SavannaGameComponent },
  { path: 'savannagame/savannaresults', component: SavannaResultsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavannaRoutingModule {}
