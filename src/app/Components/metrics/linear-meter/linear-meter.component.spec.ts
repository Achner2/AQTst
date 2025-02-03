import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearMeterComponent } from './linear-meter.component';

describe('LinearMeterComponent', () => {
  let component: LinearMeterComponent;
  let fixture: ComponentFixture<LinearMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinearMeterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinearMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
