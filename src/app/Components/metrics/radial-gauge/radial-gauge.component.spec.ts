import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialGaugeComponent } from './radial-gauge.component';

describe('RadialGaugeComponent', () => {
  let component: RadialGaugeComponent;
  let fixture: ComponentFixture<RadialGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadialGaugeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadialGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
