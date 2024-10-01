import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TouristAttractionPage } from './tourist-attraction.page';

describe('TouristAttractionPage', () => {
  let component: TouristAttractionPage;
  let fixture: ComponentFixture<TouristAttractionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristAttractionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
