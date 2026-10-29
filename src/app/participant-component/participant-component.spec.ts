import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantComponent } from './participant-component';

describe('Participant', () => {
  let component: ParticipantComponent;
  let fixture: ComponentFixture<ParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParticipantComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
