import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurbidezGaugeComponent } from './turbidez-gauge.component';

describe('TurbidezGaugeComponent', () => {
  let component: TurbidezGaugeComponent;
  let fixture: ComponentFixture<TurbidezGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TurbidezGaugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurbidezGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
