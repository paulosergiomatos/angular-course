import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


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
  constructor(private http: HttpClient, private fb: FormBuilder) { }

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
