import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhGaugeComponent } from './ph-gauge.component';

describe('PhGaugeComponent', () => {
  let component: PhGaugeComponent;
  let fixture: ComponentFixture<PhGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhGaugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
