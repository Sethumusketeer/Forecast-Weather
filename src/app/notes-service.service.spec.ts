import { TestBed } from '@angular/core/testing';

import { NotesService } from './notes-service.service';

describe('NotesServiceService', () => {
  let service: NotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
