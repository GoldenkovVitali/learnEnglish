import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsGameComponent } from './buttons-game.component';

describe('ButtonsGameComponent', () => {
  let component: ButtonsGameComponent;
  let fixture: ComponentFixture<ButtonsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonsGameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
