import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurbidezSensorComponent } from './turbidez-sensor.component';

describe('TurbidezSensorComponent', () => {
  let component: TurbidezSensorComponent;
  let fixture: ComponentFixture<TurbidezSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TurbidezSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurbidezSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
