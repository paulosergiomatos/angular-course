import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';


@NgModule({
  declarations: [CursosListaComponent],
  imports: [
    CommonModule,
    CursosRoutingModule
  ]
})
export class CursosModule { }
