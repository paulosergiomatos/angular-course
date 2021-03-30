import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnviarValorService } from '../enviar-valor.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-poc',
  template: `
    <app-poc-base  [nome]="nome"
       valor="valor" estilo="bg-danger">
    </app-poc-base>
  `
})
export class PocComponent implements OnInit, OnDestroy {

  nome = 'Componente sem unsubscribe';
  valor: string | undefined;

  constructor(private service: EnviarValorService) { }

  ngOnInit(): void {
    this.service.getValor()
      .pipe(tap(v => console.log(this.nome, v)))
      // tslint:disable-next-line: deprecation
      .subscribe(novoValor => this.valor = novoValor);
  }

  ngOnDestroy(): void {
    console.log(`${this.nome} foi destruido`);
  }

}
