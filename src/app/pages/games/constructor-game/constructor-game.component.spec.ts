import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorGameComponent } from './constructor-game.component';

describe('ConstructorGameComponent', () => {
  let component: ConstructorGameComponent;
  let fixture: ComponentFixture<ConstructorGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConstructorGameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
