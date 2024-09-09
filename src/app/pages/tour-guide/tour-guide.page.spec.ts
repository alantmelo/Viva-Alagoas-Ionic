import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourGuidePage } from './tour-guide.page';

describe('TourGuidePage', () => {
  let component: TourGuidePage;
  let fixture: ComponentFixture<TourGuidePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TourGuidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
