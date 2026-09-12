import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculosListPage } from './vehiculos-list.page';

describe('VehiculosListPage', () => {
  let component: VehiculosListPage;
  let fixture: ComponentFixture<VehiculosListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
