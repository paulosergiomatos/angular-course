import { environment } from './../../../environments/environment';
import { UploadFileService } from './../../upload-file.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InputFiles } from 'typescript';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  constructor(private service: UploadFileService) { }

  // o tipo Set faz automaticamente o expurgo de dados duplicados... caso o usuario selecione o mesmo arquivo duas vezes
  files: Set<File> | undefined;
  subscription$: Subscription = new Subscription();

  ngOnInit(): void {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    // fazer o unsubscribe
    this.subscription$.unsubscribe();
    console.log('unsubscribed');
  }

  onChange(event: Event): void {
    const selectedFiles = (event.currentTarget as HTMLInputElement).files;
    const lbl = document.getElementById('customFileLabel');
    if (lbl && selectedFiles) {
      this.files = new Set<File>();
      const fileNames = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const element = selectedFiles.item(i);
        fileNames.push(element?.name);
        if (element) {
          this.files.add(element);
        }
      }
      lbl.innerHTML = fileNames.join(', ');
    }
  }
  onUpload(): any {
    if (this.files && this.files.size > 0) {

      // const obs = this.service.upload(this.files, 'http://localhost:8000/upload'); foi para a conf do proxy
      const obs = this.service.upload(this.files, `${environment.BASE_URL}/upload`);
      // o /api é convencao para separar  rota e url do backend
      this.subscription$ = obs
        .subscribe((response: any) => console.log('Upload concluido'));
    }
  }

}
