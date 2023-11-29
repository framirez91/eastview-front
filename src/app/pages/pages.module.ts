import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElOjoComponent } from './el-ojo/el-ojo.component';
import { LaBrujaComponent } from './la-bruja/la-bruja.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    // ElojoComponent
    ElOjoComponent,
    LaBrujaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
    
  ]
})
export class PagesModule { }
