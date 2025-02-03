import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaudalSensorComponent } from './caudal-sensor.component';

describe('CaudalSensorComponent', () => {
  let component: CaudalSensorComponent;
  let fixture: ComponentFixture<CaudalSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaudalSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaudalSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
