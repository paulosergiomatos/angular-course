import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { CrudService } from './../shared/crud-service';
import { Curso } from './models/curso';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {

constructor(public http: HttpClient) {
  super(http, `${environment.API}cursos` );
}

}
