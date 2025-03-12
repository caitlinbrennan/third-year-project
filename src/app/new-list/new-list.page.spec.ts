import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewListPage } from './new-list.page';

describe('NewListPage', () => {
  let component: NewListPage;
  let fixture: ComponentFixture<NewListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
