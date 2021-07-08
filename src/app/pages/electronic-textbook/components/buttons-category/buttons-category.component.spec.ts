import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsCategoryComponent } from './buttons-category.component';

describe('ButtonsCategoryComponent', () => {
  let component: ButtonsCategoryComponent;
  let fixture: ComponentFixture<ButtonsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonsCategoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
