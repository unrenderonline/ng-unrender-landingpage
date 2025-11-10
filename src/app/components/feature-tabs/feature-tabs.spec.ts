import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTabs } from './feature-tabs';

describe('FeatureTabs', () => {
  let component: FeatureTabs;
  let fixture: ComponentFixture<FeatureTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureTabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
