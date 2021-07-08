import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SprintGameComponent } from './sprint-game.component';

const routes: Routes = [{ path: '', component: SprintGameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SprintGameRoutingModule {}
