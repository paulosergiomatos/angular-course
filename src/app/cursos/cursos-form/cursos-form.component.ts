import { Curso } from './../models/curso';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { CursosService } from './../cursos.service';
import { AlertModalService } from './../../shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    reference: new FormControl(),
    quantity: new FormControl('11')
  });
  submitted = false;
  course: Curso | undefined;
  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private service: Cursos2Service,
              private modal: AlertModalService,
              private location: Location,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {

    // tslint:disable-next-line: deprecation
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params.id;
    //     console.log(id);
    //     const curso$ = this.service.loadByID(id);
    //     curso$.subscribe((curso: any) => {
    //       this.updateForm(curso);
    //     });
    //   }
    // );

    // dica: quando utiliza o route.params o angular se encarrega de fazer o unsubscribe
    // this.route.params
    // // utilizando o pipe para obter o id a partir do map
    // .pipe(
    //   map ((params: any) => params.id),
    //   // usando switchMap para fazer a chamada do segundo observable
    //   switchMap(id => this.service.loadByID(id))
    //   // se necessário poderia fazer um segundo switchMap(cursos => obterAulas) por exemplo
    //   // switchMap retorna um observable e por isto podemos fazer o subscribe abaixo
    //   // https://tableless.com.br/entendendo-rxjs-observable-com-angular/
    //   // quando alteramos a url de chamado (tipo mudando de cursos/editar/1 para cursos/editar/2)
    //   // varias vezes ... o switchMap só considera a ultima e descarta as anteriores mas existem outros
    //   // operadores que fazem consideram: veja abaixo
    //   // concatMap => processa e devolve na ordem que receber
    //   // mergeMap => ordem nao importa
    //   // exhasutMap => não processa a proxima até receber a atual (muito usado para login)

    // )
    // // tslint:disable-next-line: deprecation
    // .subscribe(
    //     (curso) => {
    //       // cast de unknow para Curso
    //       this.updateForm(curso as Curso);
    //     }
    //   );

    const curso = this.route.snapshot.data.curso;

    // como o  metodo de load é asincrono é necessário inicializar o form com valores null
    // que depois receberá os dados pelo metodo, no caso, updateForm
    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  // updateForm(curso: Curso): void{
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }


  hasError(field: string): any {
    const res = this.form?.get(field)?.errors;
    return res;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      if (this.form.value.id === -1){
        this.form.value.id = undefined;
      }
      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente!';
      if (this.form.value.id) {
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar curso, tente novamente!';
      }

      // não esqueça de usar o subscribe para ativar o observable
      this.service.save(this.form.value).subscribe(
        () => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        () => {
          this.modal.showAlertSuccess(msgError);
        },
        () => console.log('request completado')
      );
      // this.service.create(this.form.value).subscribe(
      //   () => {
      //     this.modal.showAlertSuccess('sucesso');
      //     this.location.back();
      //   }
      // );
    }
  }

  onCancel(): void {
    this.submitted = false;
    this.form.reset();
    // console.log('onCancel');
  }
}
