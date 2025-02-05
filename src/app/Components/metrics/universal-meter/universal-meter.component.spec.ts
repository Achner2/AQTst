import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalMeterComponent } from './universal-meter.component';

describe('UniversalMeterComponent', () => {
  let component: UniversalMeterComponent;
  let fixture: ComponentFixture<UniversalMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UniversalMeterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniversalMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
