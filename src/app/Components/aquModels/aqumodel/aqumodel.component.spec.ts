import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqumodelComponent } from './aqumodel.component';

describe('AqumodelComponent', () => {
  let component: AqumodelComponent;
  let fixture: ComponentFixture<AqumodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqumodelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AqumodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
