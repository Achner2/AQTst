import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChlorineMeterComponent } from './chlorine-meter.component';

describe('ChlorineMeterComponent', () => {
  let component: ChlorineMeterComponent;
  let fixture: ComponentFixture<ChlorineMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChlorineMeterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChlorineMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
