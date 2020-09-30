import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member.CardComponent } from './member.card.component';

describe('Member.CardComponent', () => {
  let component: Member.CardComponent;
  let fixture: ComponentFixture<Member.CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member.CardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Member.CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
