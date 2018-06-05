import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BnppfComponent } from './bnppf.component';

describe('BnppfComponent', () => {
  let component: BnppfComponent;
  let fixture: ComponentFixture<BnppfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BnppfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BnppfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
