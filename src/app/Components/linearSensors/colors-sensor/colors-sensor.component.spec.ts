import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsSensorComponent } from './colors-sensor.component';

describe('ColorsSensorComponent', () => {
  let component: ColorsSensorComponent;
  let fixture: ComponentFixture<ColorsSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorsSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorsSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
