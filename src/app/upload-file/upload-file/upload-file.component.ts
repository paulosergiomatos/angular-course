import { Component, OnInit } from '@angular/core';
import { InputFiles } from 'typescript';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: Event): void {
    const selectedFiles = (event.currentTarget as HTMLInputElement).files;
    const lbl = document.getElementById('customFileLabel');
    if (lbl && selectedFiles) {
      const fileNames = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const element = selectedFiles.item(i);
        fileNames.push(element?.name);
      }
      lbl.innerHTML = fileNames.join(', ');
    }
  }
}
