import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElOjoComponent } from './pages/el-ojo/el-ojo.component';
import { LaBrujaComponent } from './pages/la-bruja/la-bruja.component';

const routes: Routes = [
  // ruta del ojo 
  {path:'elojo',component: ElOjoComponent},
  {path:'labruja',component: LaBrujaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
