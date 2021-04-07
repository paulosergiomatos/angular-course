import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, of, Subject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CursosService } from './../cursos.service';
import { Curso } from './../models/curso';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component'; // nao esquecer de declarar no sharedModule exports

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
  bsModalRef: BsModalRef | undefined;
  nonErrorThrown = true;
  constructor(private service: CursosService,
    /* private modalService: BsModalService*/
              private alertService: AlertModalService) { }

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
          // this.error$.next(true); // next emite o valor
          this.handleError(); // pode ser criado um metodo para tratar o erro
          return of();
        })
      );
  }
  // exemplo de subscribe usando os tres parametros da funcao:
  // 1 - sucess, 2 - error, 3 - complete
  // exemploSubscribe(): void {
  //   // pode usar o pipe subsituiindo os dois ultimos parametros do subscribe
  //   this.service.list()
  //     .pipe(
  //       catchError(error => {
  //         console.error(error);
  //         this.error$.next(true);
  //         return of();
  //       })
  //     )
  //     .subscribe(
  //       (dados: any) => {
  //         console.log(dados);
  //       },
  //       // (error: any) => console.error(error),
  //       // () => console.log('Observable completo')
  //     );
  // }

  handleError(): void {
    // note que o AlertModalComponent não tem instancia ou seja é criado em tempo de execucao
    // sempre que houver este tipo de situacao é necessario informar ao angular por
    // meio do entryComponents que no caso é declarado no shared module, pois o
    // AlertModalComponent não possui um template ou roteamento que o utilize
    // quando utilizar o entryComponents é necessário importar o modulo (sharedmodule) no appmodule
    this.nonErrorThrown = false;
    /*this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';*/
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }
}
