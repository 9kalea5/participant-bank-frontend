import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewParticipant } from './new-participant';

describe('NewParticipant', () => {
  let component: NewParticipant;
  let fixture: ComponentFixture<NewParticipant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewParticipant],
    }).compileComponents();

    fixture = TestBed.createComponent(NewParticipant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
