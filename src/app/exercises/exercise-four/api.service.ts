import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Note } from "./model/note";

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    apiUrl = 'http://localhost:5000/notes';
    constructor(private http: HttpClient) { }

    getAllNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(this.apiUrl);
    }

    addNote(note: Note): Observable<Note> {
        return this.http.post<Note>(this.apiUrl, note);
    }

    updateNote(note: Note): Observable<Note> {
        return this.http.put<Note>(this.apiUrl + '/' + note.id, note);
    }

    deleteNote(note: Note): Observable<Note> {
        return this.http.delete<Note>(this.apiUrl + '/' + note.id);
    }
}