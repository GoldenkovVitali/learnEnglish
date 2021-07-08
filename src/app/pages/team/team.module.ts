import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import SharedModule from '@app/shared/shared.module';
import { TeamRoutingModule } from './team-routing.module';

import { TeamComponent } from './team.component';
import AboutUsComponent from './about-us/about-us.component';
import CardPersonComponent from './card-person/card-person.component';

@NgModule({
  declarations: [TeamComponent, AboutUsComponent, CardPersonComponent],
  imports: [CommonModule, TeamRoutingModule, SharedModule],
})
export class TeamModule {}
