import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private service: CursosService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // subsituido pelo cursos$
    // this.service.list()
    //   .subscribe((dados: any) => this.cursos = dados);

    this.cursos$ = this.service.list();
  }
}
