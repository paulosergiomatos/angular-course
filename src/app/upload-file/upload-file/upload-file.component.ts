import { pipe } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { UploadFileService } from './../../upload-file.service';
import { InputFiles } from 'typescript';
import { Subscription } from 'rxjs';
import { AlertModalService } from './../../shared/alert-modal.service';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  constructor(private service: UploadFileService, private alertService: AlertModalService) { }

  // o tipo Set faz automaticamente o expurgo de dados duplicados... caso o usuario selecione o mesmo arquivo duas vezes
  files: Set<File> | undefined;
  subscription$: Subscription = new Subscription();
  progress = 0;

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
      this.progress = 0;
    }
  }
  onUpload(): any {
    if (this.files && this.files.size > 0) {

      // const obs = this.service.upload(this.files, 'http://localhost:8000/upload'); foi para a conf do proxy
      const obs = this.service.upload(this.files, `${environment.BASE_URL}/upload`);
      // o /api é convencao para separar  rota e url do backend
      this.subscription$ = obs
        .pipe(
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse() // depois que receber o response ... pode considerar concluido
        )
        .subscribe(() => this.alertService.showAlertSuccess('Arquivo carregado com sucesso'));


      // .subscribe((event: HttpEvent<object>) => {
      //   // console.log(event);
      //   if (event.type === HttpEventType.Response) {
      //     this.alertService.showAlertSuccess('Arquivo carregado com sucesso');
      //     // console.log('Upload concluido');
      //   }
      //   else if (event.type === HttpEventType.UploadProgress) {
      //     if (event.total) {
      //       const percentDone = Math.round((event.loaded * 100) / (event.total > 0 ? event.total : 1));
      //       // console.log('Progresso', percentDone);
      //       this.progress = percentDone;
      //     }
      //   }
      // }
      // );
    }
  }

  onDownloadExcel(): void {
    this.service.download(`${environment.BASE_URL}/downloadExcel`)
      .subscribe((res: any) => {
        // console.log(res)
        this.service.handleFile(res, 'report.xlsx');
      });
  }

  onDownloadPDF(): void {
    this.service.download(`${environment.BASE_URL}/downloadPDF`)
      .subscribe((res: any) => {
        //  console.log(res)
        this.service.handleFile(res, 'report.pdf');
      });
  }

}
