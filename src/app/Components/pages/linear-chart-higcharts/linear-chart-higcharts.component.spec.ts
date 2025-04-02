import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearChartHigchartsComponent } from './linear-chart-higcharts.component';

describe('LinearChartHigchartsComponent', () => {
  let component: LinearChartHigchartsComponent;
  let fixture: ComponentFixture<LinearChartHigchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinearChartHigchartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinearChartHigchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
