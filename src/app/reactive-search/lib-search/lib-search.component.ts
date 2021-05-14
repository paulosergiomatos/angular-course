import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map, filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$ = new Observable<any>();
  total = 0;
  readonly FIELDS = 'name,description,version,homepage';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // tornando a pesquisa reativa... vamos escutar as mudancas inputadas no campo busca
    this.results$ = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 1), // dependendo do tipo de pesquisa pode ser maior que  1
        debounceTime(300), // é um delay para evitar requisições para cada letra digitada
        distinctUntilChanged(), // só manda o valor quando o valor nao for repetido
        // tap(value => console.log(value)) // o tap serve para printar ...
        switchMap(value => this.http.get(this.SEARCH_URL, {
          params: {
            search: value,
            fields: this.FIELDS
          }
        })), // usando este operador vc evita sobrecarga de requisiçoes pois este cancela requisicoes anteriores
        tap((res: any) => this.total = res.total), // uso o tap para passar o valor para a minha variavel
        map((res: any) => res.results)
      );
  }

  onSearch(): any {

    let value = this.queryField.value;
    // tslint:disable-next-line: no-conditional-assignment
    if (value && (value = value.trim()) !== '') {
      // ? a interrogacao é para informar a passagem de parametros
      // & o  ecomercial é para os demais parametros
      // this.results$ = this.http.get(`${this.SEARCH_URL}?fields=${fields}&search=${this.queryField.value}`)

      // utilizando o angular params... o proprio angular cria a url
      // com as interrogações e ecomerciais conforme o exemplo acima
      const params = {
        search: value,
        fields: this.FIELDS
      };

      let params2 = new HttpParams(); // similar ao anterior porem de forma mais dinamica tambem é do angular
      params2 = params2.append('search', value);
      params2 = params2.append('fields', this.FIELDS);
      // params2 = params2.append() ...


      this.results$ = this.http.get(this.SEARCH_URL, { params: params2 })
        .pipe(
          tap((res: any) => this.total = res.total),
          map(res => res.results)
        );
    }
  }
}
