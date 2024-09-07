import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from './Models/notes.model';

@Injectable({
  providedIn: 'root'
}
)
export class NotesService {

  apiURL: string = 'https://localhost:7152/';

  constructor(private httpClient: HttpClient) { }

  public createNote(note: Note): Observable<Note[]> {
    const body = { "userId": note.userId, "content": note.content }
    return this.httpClient.post<Note[]>(`${this.apiURL}api/Notes/createNote/`, body);
  }

  public getNotes(userId: number): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`${this.apiURL}api/Notes/getNotes/${userId}`);
  }

  public updateNote(note: Note): Observable<Note> {
    const body = { "userId": note.userId, "content": note.content, "recordId":note.recordId}
    console.log(body);
    return this.httpClient.put<Note>(`${this.apiURL}api/Notes/updateNote`, body);
  }

  public deleteNote(noteId: number) {
    return this.httpClient.delete(`${this.apiURL}api/Notes/deleteNote/${noteId}`);
  }
}