import { UploadFileService } from './../../upload-file.service';
import { Component, OnInit } from '@angular/core';
import { InputFiles } from 'typescript';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  // o tipo Set faz automaticamente o expurgo de dados duplicados... caso o usuario selecione o mesmo arquivo duas vezes
  files: Set<File> | undefined;

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
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
      this.service.upload(this.files, 'http://localhost:8000/upload')
        .subscribe((response: any) => console.log('Upload concluido'));
    }
    // TODO: fazer o unsubscribe
  }
}
