import { Component, inject } from '@angular/core';
import { EntityCollectionServiceFactory } from '@ngrx/data';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Student } from './models/student.model';

@Component({
  selector: 'app-exercise-ten',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './exercise-ten.component.html',
  styleUrl: './exercise-ten.component.css'
})
export class ExerciseTenComponent {
  // EntityCollectionServiceFactory: dynamically creates the StudentEntityService.
  // Creates StudentEntityService using EntityCollectionServiceFactory.
  // 'Student' is the entity name from the metadata(entityMetadata.Student).
  private studentService = inject(EntityCollectionServiceFactory).create<Student>('Student');

  // toSignal: converts Observable (like students$) into a signal.
  // Converts entities$ (Observable) to a Signal using toSignal.
  student = toSignal(this.studentService.entities$);
  data: any = {};

  constructor() {
    this.studentService.getAll(); // Load data on init
  }

  save() {
    if (this.data?.id) {
      this.studentService.update(this.data);
    } else {
      const student: Student = {
        id: Date.now().toString(),
        name: this.data.name,
        age: this.data.age
      };
      this.studentService.add(student);
    }
    this.data = {};
  }

  delete(id: string) {
    this.studentService.delete(id);
  }
  update(data: any) {
    this.data = { ...data };
  }
}
