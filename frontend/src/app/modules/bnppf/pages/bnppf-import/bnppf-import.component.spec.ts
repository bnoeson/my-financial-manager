import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BnppfImportComponent } from './bnppf-import.component';

describe('BnppfImportComponent', () => {
  let component: BnppfImportComponent;
  let fixture: ComponentFixture<BnppfImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BnppfImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BnppfImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
