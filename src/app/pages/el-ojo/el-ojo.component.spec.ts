import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElOjoComponent } from './el-ojo.component';

describe('ElOjoComponent', () => {
  let component: ElOjoComponent;
  let fixture: ComponentFixture<ElOjoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElOjoComponent]
    });
    fixture = TestBed.createComponent(ElOjoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
