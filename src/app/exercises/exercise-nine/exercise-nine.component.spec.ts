import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseNineComponent } from './exercise-nine.component';

describe('ExerciseNineComponent', () => {
  let component: ExerciseNineComponent;
  let fixture: ComponentFixture<ExerciseNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
