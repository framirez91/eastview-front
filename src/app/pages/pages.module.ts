import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElOjoComponent } from './el-ojo/el-ojo.component';
import { LaBrujaComponent } from './la-bruja/la-bruja.component';



@NgModule({
  declarations: [
    // ElojoComponent
    ElOjoComponent,
    LaBrujaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
