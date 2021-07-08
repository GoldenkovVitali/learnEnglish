import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCredentialsComponent } from './footer-credentials.component';

describe('FooterCredentialsComponent', () => {
  let component: FooterCredentialsComponent;
  let fixture: ComponentFixture<FooterCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterCredentialsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
