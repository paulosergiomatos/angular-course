import { Component, OnInit } from '@angular/core';
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

  cursos: Curso[] | undefined;
  constructor(private service: CursosService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.service.list()
      .subscribe((dados: any) => this.cursos = dados);
  }
}
