import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerCpuComponent } from './server-cpu.component';

describe('ServerCpuComponent', () => {
  let component: ServerCpuComponent;
  let fixture: ComponentFixture<ServerCpuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServerCpuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServerCpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
