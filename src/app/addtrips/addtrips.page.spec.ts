import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddtripsPage } from './addtrips.page';

describe('AddtripsPage', () => {
  let component: AddtripsPage;
  let fixture: ComponentFixture<AddtripsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
