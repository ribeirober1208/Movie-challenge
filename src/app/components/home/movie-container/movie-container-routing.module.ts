import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieContainerComponent } from './movie-container.component';

const routes: Routes = [
  {
    path: '',
    component: MovieContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieContainerRoutingModule { }
