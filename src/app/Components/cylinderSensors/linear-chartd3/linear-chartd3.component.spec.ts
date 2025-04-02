import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearChartd3Component } from './linear-chartd3.component';

describe('LinearChartd3Component', () => {
  let component: LinearChartd3Component;
  let fixture: ComponentFixture<LinearChartd3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinearChartd3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinearChartd3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
