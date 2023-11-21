import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './components/home/home.module';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./components/home/home.module').then( m => HomeModule) //incluir 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
