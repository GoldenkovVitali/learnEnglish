import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstructorGameComponent } from './constructor-game.component';

const routes: Routes = [
  {
    path: '',
    component: ConstructorGameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstructorGameRoutingModule {}
