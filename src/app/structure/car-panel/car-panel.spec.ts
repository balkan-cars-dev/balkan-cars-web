import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPanel } from './car-panel';

describe('CarPanel', () => {
  let component: CarPanel;
  let fixture: ComponentFixture<CarPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
