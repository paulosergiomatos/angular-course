import { HttpClient } from '@angular/common/http';
import { delay, take, tap } from 'rxjs/operators';
import { BaseClass } from './base-class';

export class CrudService <T extends BaseClass> {

  // private readonly API = `${environment.API}records`;

  constructor(public http: HttpClient, private API_URL: string) { }
  list(): any {
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(1500), // o delay é apenas para simular o tempo de requisicao no servidor
        tap(console.log)
      );
  }

  loadByID(id: number): any {
    // dica: quando utiliza o take(1) o angular ja faz o unsubscribe
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(record: T): any {
    // utilizando o take(1) para ja finalizar o observable após a operação
    return this.http.post(this.API_URL, record).pipe(take(1));
  }

  private update(record: T): any {
    return this.http.put(`${this.API_URL}/${record.id}`, record).pipe(take(1));
  }

  save(record: T): any {
    if (record.id > 0) {
      return  this.update(record);
    }
    return this.create(record);
  }

  remove(id: any): any {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }


}
