import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeachPage } from './beach.page';

describe('BeachPage', () => {
  let component: BeachPage;
  let fixture: ComponentFixture<BeachPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BeachPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
