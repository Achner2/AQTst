import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorGaugeComponent } from './color-gauge.component';

describe('ColorGaugeComponent', () => {
  let component: ColorGaugeComponent;
  let fixture: ComponentFixture<ColorGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorGaugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
