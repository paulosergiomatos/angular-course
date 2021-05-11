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

  download(url: string): any {
    return this.http.get(url, {
      responseType: 'blob' as 'json',
      // reportProgress precisa do  content-lenght retornado pelo backend
    });
  }

  handleFile(res: any, fileName: string): any {
    // logica para download do blob utilizando javascript
            // criando um blob do arquivo e definindo o tipo
            const file = new Blob([res], {
              type: res.type
            });


            // para quem utiliza IE
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(file);
              return;
            }

            // associando o blob com a janela do browser
            const blob = window.URL.createObjectURL(file);

            // criando um elemento link com o DOM do JS para disparar o download
            const link = document.createElement('a');
            link.href = blob;
            link.download = fileName;

            // link.click(); // não funciona no firefox... o codigo abaixo funcionara no chrome e firefox
            link.dispatchEvent(new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window
            }));

            // o firefox precisa de um delay para conseguir fazer a limpeza pode ser bem pequeno 100ms
            setTimeout(() => {
              // limpando os objetos criados dinamicamente
              window.URL.revokeObjectURL(blob);
              link.remove();
            }, 100);
      }
}
