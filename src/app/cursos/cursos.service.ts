import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './models/curso';
import { tap, delay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CursosService {

  private readonly API = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) { }

  list(): any {
    return this.http.get<Curso[]>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }
}
