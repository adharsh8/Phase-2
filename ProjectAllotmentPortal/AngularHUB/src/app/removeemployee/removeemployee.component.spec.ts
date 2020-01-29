import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveemployeeComponent } from './removeemployee.component';

describe('RemoveemployeeComponent', () => {
  let component: RemoveemployeeComponent;
  let fixture: ComponentFixture<RemoveemployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveemployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
