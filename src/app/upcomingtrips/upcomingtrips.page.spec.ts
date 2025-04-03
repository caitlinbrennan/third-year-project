import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpcomingtripsPage } from './upcomingtrips.page';

describe('UpcomingtripsPage', () => {
  let component: UpcomingtripsPage;
  let fixture: ComponentFixture<UpcomingtripsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingtripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
