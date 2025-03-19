import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsFilterComponent } from './equipments-filter.component';

describe('EquipmentsFilterComponent', () => {
  let component: EquipmentsFilterComponent;
  let fixture: ComponentFixture<EquipmentsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentsFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
