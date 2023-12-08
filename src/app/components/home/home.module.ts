import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TopContentComponent } from '../commons/top-content/top-content.component';

@NgModule({
  declarations: [
    HomeComponent,
    MovieDetailsComponent,
    PaginationComponent,
    TopContentComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],

  exports: [
    HomeComponent,

  ], 
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
    
  ]

})

export class HomeModule { }
