import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-common-statistic-chart',
  templateUrl: './common-statistic-chart.component.html',
  styleUrls: ['./common-statistic-chart.component.scss'],
})
export class CommonStatisticChartComponent implements OnInit {
  @Input()
  wordsToday: number;

  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#1c77c3',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  ngOnInit(): void {
    this.lineChartData = [{ data: [this.wordsToday], label: 'Изучено слов всего' }];
    this.lineChartLabels = ['День 1'];
  }
}
