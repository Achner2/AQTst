import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelSensorComponent } from './nivel-sensor.component';

describe('NivelSensorComponent', () => {
  let component: NivelSensorComponent;
  let fixture: ComponentFixture<NivelSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NivelSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NivelSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
