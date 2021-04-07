import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CursosService } from './../cursos.service';
import { AlertModalService } from './../../shared/alert-modal.service';

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
  constructor(private http: HttpClient, private fb: FormBuilder, private service: CursosService,
              private modal: AlertModalService, private location: Location ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  hasError(field: string): any {
    const res = this.form?.get(field)?.errors;
    return res;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      // não esqueça de usar o subscribe para ativar o observable
      this.service.create(this.form.value).subscribe(
        () =>  {this.modal.showAlertSuccess('sucesso');
                this.location.back();
        }
         //this.modal.showAlertDanger('Erro ao criar curso, tente novamente!')
        // success => console.log('sucesso'),
        // error => console.error(error),
        // () => console.log('request completado')
      );
      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente!';
      if (this.form.value.id) {
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar curso, tente novamente!';
      }
    }
  }

  onCancel(): void {
    this.submitted = false;
    this.form.reset();
    // console.log('onCancel');
  }
}
