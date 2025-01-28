import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForescastCharComponent } from './forescast-char.component';

describe('ForescastCharComponent', () => {
  let component: ForescastCharComponent;
  let fixture: ComponentFixture<ForescastCharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForescastCharComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForescastCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
