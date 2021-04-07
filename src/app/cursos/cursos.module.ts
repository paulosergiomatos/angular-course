import { CursosFormComponent } from './cursos-form/cursos-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursosRoutingModule } from './cursos-routing.module';

@NgModule({
  declarations: [CursosListaComponent, CursosFormComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CursosModule { }
