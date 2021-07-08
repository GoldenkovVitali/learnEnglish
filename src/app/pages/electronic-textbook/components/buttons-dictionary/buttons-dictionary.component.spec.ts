import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsDictionaryComponent } from './buttons-dictionary.component';

describe('ButtonsDictionaryComponent', () => {
  let component: ButtonsDictionaryComponent;
  let fixture: ComponentFixture<ButtonsDictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonsDictionaryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
