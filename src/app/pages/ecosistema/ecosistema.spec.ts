import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ecosistema } from './ecosistema';

describe('Ecosistema', () => {
  let component: Ecosistema;
  let fixture: ComponentFixture<Ecosistema>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ecosistema]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ecosistema);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
