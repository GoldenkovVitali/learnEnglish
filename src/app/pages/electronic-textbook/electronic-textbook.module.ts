import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import SharedModule from '@app/shared/shared.module';
import CategoryComponent from './components/category/category.component';
import ElectronicTextbookComponent from './electronic-textbook.component';
import ElectronicTextbookRoutingModule from './electronic-textbook-routing.module';

import { CardWordComponent } from './components/card-word/card-word.component';
import { PageComponent } from './components/page/page.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ButtonsGameComponent } from './components/buttons-game/buttons-game.component';
import { ButtonsCategoryComponent } from './components/buttons-category/buttons-category.component';
import { ButtonsDictionaryComponent } from './components/buttons-dictionary/buttons-dictionary.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
@NgModule({
  declarations: [
    CategoryComponent,
    ElectronicTextbookComponent,
    CardWordComponent,
    PageComponent,
    SettingsDialogComponent,
    PaginationComponent,
    ButtonsGameComponent,
    ButtonsCategoryComponent,
    ButtonsDictionaryComponent,
    DictionaryComponent,
  ],
  imports: [CommonModule, SharedModule, ElectronicTextbookRoutingModule],
})
export class ElectronicTextbookModule {}
