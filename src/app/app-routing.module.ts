import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoComponent } from './pages/promo/promo.component';
import { ParamKey, QueryParamKey } from './app-routing.enum';
import { ConstructorGameModule } from './pages/games/constructor-game/constructor-game.module';
import { AuthGuard } from './shared/layout/header/guard/auth.guard';

const routes: Routes = [
  { path: ParamKey.promo, component: PromoComponent, pathMatch: 'full' },
  { path: ParamKey.promo, component: PromoComponent },
  {
    path: `${ParamKey.games}/${ParamKey.audiocallPromo}`,
    loadChildren: (): any =>
      import('./pages/games/audiocall-game/audiocall.module').then(
        (module) => module.AudiocallModule
      ),
  },
  {
    path: `${ParamKey.games}/${ParamKey.savannaPromo}`,
    loadChildren: (): any =>
      import('./pages/games/savanna-game/savanna.module').then((module) => module.SavannaModule),
  },
  {
    path: `${ParamKey.games}/${ParamKey.sprintGame}`,
    loadChildren: (): any =>
      import('./pages/games/sprint-game/sprint-game.module').then(
        (module) => module.SprintGameModule
      ),
  },
  {
    path: ParamKey.games,
    loadChildren: (): any =>
      import('./pages/game-page/game-page.module').then((module) => module.GamePageModule),
  },
  {
    path: ParamKey.team,
    loadChildren: (): any => import('./pages/team/team.module').then((module) => module.TeamModule),
  },
  {
    path: ParamKey.statistics,
    loadChildren: (): any =>
      import('./pages/statistics/statistics.module').then((module) => module.StatisticsModule),
    canActivate: [AuthGuard],
  },
  {
    path: ParamKey.wordConstructor,
    loadChildren: async (): Promise<ConstructorGameModule> =>
      import('./pages/games/constructor-game/constructor-game.module').then(
        (module) => module.ConstructorGameModule
      ),
  },
  {
    path: ParamKey.textBook,
    loadChildren: (): any =>
      import('./pages/electronic-textbook/electronic-textbook.module').then(
        (module) => module.ElectronicTextbookModule
      ),
    canActivate: [AuthGuard],
  },
  { path: ParamKey.notFound, redirectTo: QueryParamKey.redirectTo },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
