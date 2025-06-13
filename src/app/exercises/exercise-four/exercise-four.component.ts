import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Note } from './model/note';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { getAllNotes, getNotesByTag } from './store/note.selector';
import { addNote, deleteNote, getNotes, updateNote } from './store/note.action';

@Component({
  selector: 'app-exercise-four',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './exercise-four.component.html',
  styleUrl: './exercise-four.component.css'
})
export class ExerciseFourComponent implements OnInit, OnDestroy {
  notes$ = new Observable<Note[]>;
  filteredNotes$? = new Observable<Note[]>;
  formModel: any = {};
  tags: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(private store: Store<any>) {
    this.notes$ = store.select(getAllNotes);
    this.notes$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.tags = Array.from(
        new Set(data.reduce((allTags: any[], item: any) => allTags.concat(item.tags), []))
      );
    })
  }

  ngOnInit(): void {
    this.loadGroceries();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadGroceries() {
    this.store.dispatch(getNotes({ payload: {} }));
  }

  onSubmit() {
    let data = structuredClone(this.formModel);
    data.tags = data.tags.split(',').map((tag: any) => tag.trim());
    if (this.formModel.id) {
      this.store.dispatch(updateNote.noteUpdating({ payload: data }));
    } else {
      console.log(new Date().toISOString())
      data.createdAt = new Date();
      this.store.dispatch(addNote.noteAdding({ payload: data }));
    }
    this.resetForm();
  }

  editItem(item: any) {
    this.formModel = structuredClone(item);
    this.formModel.tags = this.formModel.tags.join(', ');
  }

  deleteItem(item: Note) {
    this.store.dispatch(deleteNote.noteDeleting({ payload: item }));
  }

  resetForm() {
    this.formModel = {};
  }

  onTagSelect(event: Event) {
    const selectedTag = (event.target as HTMLSelectElement).value;
    if (selectedTag) this.filteredNotes$ = this.store.select(getNotesByTag(selectedTag));
    else this.filteredNotes$ = undefined;
  }
}
