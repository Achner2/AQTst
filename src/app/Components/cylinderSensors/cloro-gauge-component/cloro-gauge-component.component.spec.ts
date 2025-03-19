import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloroGaugeComponentComponent } from './cloro-gauge-component.component';

describe('CloroGaugeComponentComponent', () => {
  let component: CloroGaugeComponentComponent;
  let fixture: ComponentFixture<CloroGaugeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloroGaugeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloroGaugeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
