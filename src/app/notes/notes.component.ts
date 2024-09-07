import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes-service.service';
import { Note } from '../Models/notes.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  userData = this.authService.getUser();
  notes: Note[] = [];
  newNote: Note = { content: '', recordId: 0, userId: 0, editMode: false};

  constructor(public authService: AuthService, private notesService: NotesService) { }

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.notesService.getNotes(this.userData.userId).subscribe((data: Note[]) => {
      this.notes = data;
    });
  }

  addNote() {
    if (this.newNote.content) {
      this.newNote.userId = this.userData.userId;
      this.notesService.createNote(this.newNote).subscribe(
        (res: Note[]) => {
          this.notes = res;
        },
        err => console.log(err)
      );
    }
  }

  enableEdit(note: Note) {
    note.editMode = true;
  }

  updateNote(note: Note, index: number) {
    this.notesService.updateNote(note).subscribe(
      (updatedNote: Note )=> {
        this.notes[index] = updatedNote;
        note.editMode = false;
      },
      err => console.log(err)
    );
  }

  deleteNote(index: number) {
    const note = this.notes[index];
    this.notesService.deleteNote(note.recordId).subscribe(
      res => this.notes.splice(index, 1),
      err => console.log(err)
    );
  }
}