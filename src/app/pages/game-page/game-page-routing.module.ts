import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import GamePageComponent from './game-page.component';

const routes: Routes = [
  {
    path: '',
    component: GamePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class GamePageRoutingModule {}
