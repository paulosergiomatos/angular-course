import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CursosService } from './../cursos.service';
import { Curso } from './../models/curso';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
// preserveWhitespaces faz com que
// o espaço de  quebra de linha no html
// seja respeitado

export class CursosListaComponent implements OnInit {

  // a variavel cursos esta sendo criada no html -> ! async as cursos
  // cursos: Curso[] | undefined;

  // o recurso de utilizar o $ como sufixo
  // para indicar um observable chama-se notação filandesa
  cursos$: Observable<Curso[]> | undefined;
  error$ = new Subject<boolean>();
  constructor(private service: CursosService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // subsituido pelo cursos$
    // this.service.list()
    //   .subscribe((dados: any) => this.cursos = dados);
    this.onRefresh();
  }

  onRefresh(): void {
    this.cursos$ = this.service.list()
      .pipe(
        // o catch error deve ser sempre o ultimo operador do pipe caso esteja usando mais de um
        // exemplo um map ou tap etc
        catchError(error => {
          console.error(error);
          this.error$.next(true); // next emite o valor
          // this.handleError();
          return of();
        })
      );
  }
  // exemplo de subscribe usando os tres parametros da funcao:
  // 1 - sucess, 2 - error, 3 - complete
  exemploSubscribe(): void {
    // pode usar o pipe subsituiindo os dois ultimos parametros do subscribe
    this.service.list()
      .pipe(
        catchError(error => {
          console.error(error);
          return of();
        })
      )

      .subscribe(
        (dados: any) => {
          console.log(dados);
        },
        // (error: any) => console.error(error),
        // () => console.log('Observable completo')
      );
  }
}
