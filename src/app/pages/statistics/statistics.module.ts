import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import StatisticsRoutingModule from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { StatisticChartComponent } from './statistic-chart/statistic-chart.component';
import { CommonStatisticChartComponent } from './common-statistic-chart/common-statistic-chart.component';

@NgModule({
  imports: [CommonModule, StatisticsRoutingModule, ChartsModule],
  declarations: [StatisticsComponent, StatisticChartComponent, CommonStatisticChartComponent],
})
export class StatisticsModule {}
