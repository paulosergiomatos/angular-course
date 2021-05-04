import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UploadFileService {

  constructor(private http: HttpClient) { }

  upload(files: Set<File>, url: string): any {
    // para enviar os arquivos no corpo do request, utiliza-se a classe FormData
    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));
    // utilizando um request customizado. Dieferente do padrao Get, Post, Put, Delete
    // const request = new HttpRequest('POST', url, formData);
    // return this.http.request(request);

    // da forma convencional seria apenas:
    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress:  true
    }); // {observe: 'events'} utilizando o parametro options para observar eventos
    // reportProgress:  true para capturar eventos de progresso do upload (SÓ SERVE PARA UPLOAD E DOWNLOAD)
  }
}
