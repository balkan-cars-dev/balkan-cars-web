import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPartsPanel } from './car-parts-panel';

describe('CarPartsPanel', () => {
  let component: CarPartsPanel;
  let fixture: ComponentFixture<CarPartsPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarPartsPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPartsPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
