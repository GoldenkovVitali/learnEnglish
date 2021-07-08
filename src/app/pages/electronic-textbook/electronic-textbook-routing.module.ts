import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import CategoryComponent from './components/category/category.component';
import ElectronicTextbookComponent from './electronic-textbook.component';
import { PageComponent } from './components/page/page.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';

const routes: Routes = [
  {
    path: '',
    component: ElectronicTextbookComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'group/0/page/0',
      },
      {
        path: 'group/:group',
        component: CategoryComponent,
      },
      { path: 'group/:group/page/:page', component: PageComponent },
      {
        path: 'dictionary/:group/page/:page',
        component: DictionaryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class ElectronicTextbookRoutingModule {
  components = [ElectronicTextbookComponent, CategoryComponent];
}
