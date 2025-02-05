import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoSensorComponent } from './flujo-sensor.component';

describe('FlujoSensorComponent', () => {
  let component: FlujoSensorComponent;
  let fixture: ComponentFixture<FlujoSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlujoSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlujoSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
