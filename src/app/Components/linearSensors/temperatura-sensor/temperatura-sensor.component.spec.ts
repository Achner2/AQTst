import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperaturaSensorComponent } from './temperatura-sensor.component';

describe('TemperaturaSensorComponent', () => {
  let component: TemperaturaSensorComponent;
  let fixture: ComponentFixture<TemperaturaSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemperaturaSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemperaturaSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
