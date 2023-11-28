import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaBrujaComponent } from './la-bruja.component';

describe('LaBrujaComponent', () => {
  let component: LaBrujaComponent;
  let fixture: ComponentFixture<LaBrujaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaBrujaComponent]
    });
    fixture = TestBed.createComponent(LaBrujaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
