import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloroSensorComponent } from './cloro-sensor.component';

describe('CloroSensorComponent', () => {
  let component: CloroSensorComponent;
  let fixture: ComponentFixture<CloroSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloroSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloroSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
