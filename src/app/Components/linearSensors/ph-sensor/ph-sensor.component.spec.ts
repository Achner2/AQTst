import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhSensorComponent } from './ph-sensor.component';

describe('PhSensorComponent', () => {
  let component: PhSensorComponent;
  let fixture: ComponentFixture<PhSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
