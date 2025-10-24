import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPanel } from './blog-panel';

describe('BlogPanel', () => {
  let component: BlogPanel;
  let fixture: ComponentFixture<BlogPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
