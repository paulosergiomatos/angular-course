import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'upload'
  },
  {
    path: 'cursos',
    // loadChildren: './cursos/cursos.module#CursosModule'
    // a partir do angular  8 mudou para a sintaxe abaixo
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
