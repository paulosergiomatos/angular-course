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
        delay(1500), // o delay é apenas para simular o tempo de requisicao no servidor
        tap(console.log)
      );
  }

  loadByID(id: number): any{
    // dica: quando utiliza o take(1) o angular ja faz o unsubscribe
    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }

  create(curso: Curso): any {
    // utilizando o take(1) para ja finalizar o observable após a operação
    return this.http.post(this.API, curso).pipe(take(1));
  }

}
