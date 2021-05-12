import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';


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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSearch(): any {
    const fields = 'name,description,version,homepage';
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
        fields
      };

      let params2 = new HttpParams(); // similar ao anterior porem de forma mais dinamica tambem é do angular
      params2 = params2.append('search', value);
      params2 = params2.append('fields', fields);
      // params2 = params2.append() ...


      this.results$ = this.http.get(this.SEARCH_URL, { params: params2 })
        .pipe(
          tap((res: any) => this.total = res.total),
          map(res => res.results)
        );
    }
  }
}
