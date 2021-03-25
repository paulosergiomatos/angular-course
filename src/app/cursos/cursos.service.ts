import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './models/curso';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CursosService {

// utilizando os arquivos de configuracao do angular '/environment/environment.ts'
  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list(): any {
    return this.http.get<Curso[]>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }
}
