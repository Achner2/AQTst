import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSensorComponent } from './color-sensor.component';

describe('ColorSensorComponent', () => {
  let component: ColorSensorComponent;
  let fixture: ComponentFixture<ColorSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
