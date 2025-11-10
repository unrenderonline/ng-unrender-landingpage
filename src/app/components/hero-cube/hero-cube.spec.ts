import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCube } from './hero-cube';

describe('HeroCube', () => {
  let component: HeroCube;
  let fixture: ComponentFixture<HeroCube>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroCube]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroCube);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
