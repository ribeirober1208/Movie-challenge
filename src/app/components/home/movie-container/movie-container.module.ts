import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieContainerRoutingModule } from './movie-container-routing.module';
import { MovieContainerComponent } from './movie-container.component';


@NgModule({
  declarations: [
    MovieContainerComponent
  ],
  imports: [
    CommonModule,
    MovieContainerRoutingModule
  ],
  exports: [
    MovieContainerComponent
  ]
})
export class MovieContainerModule { }
