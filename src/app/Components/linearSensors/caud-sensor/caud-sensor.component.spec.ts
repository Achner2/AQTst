import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaudSensorComponent } from './caud-sensor.component';

describe('CaudSensorComponent', () => {
  let component: CaudSensorComponent;
  let fixture: ComponentFixture<CaudSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaudSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaudSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
