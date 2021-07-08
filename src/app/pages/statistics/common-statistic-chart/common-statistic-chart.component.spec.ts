import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStatisticChartComponent } from './common-statistic-chart.component';

describe('CommonStatisticChartComponent', () => {
  let component: CommonStatisticChartComponent;
  let fixture: ComponentFixture<CommonStatisticChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonStatisticChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonStatisticChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
