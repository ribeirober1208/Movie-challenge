import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './components/home/home.module';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailsComponent } from './components/home/movie-details/movie-details.component';

const routes: Routes = [
  {
    path:'', 
    component: HomeComponent,
     
  },
  
  {
    path:'',
    loadChildren: () => import('./components/home/home.module').then( m => HomeModule)},

  {
    path: 'details/:id',
    component: MovieDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
