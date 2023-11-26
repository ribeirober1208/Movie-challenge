import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { PaginationComponent } from './pagination/pagination.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { TopExplorerComponent } from './top-explorer/top-explorer.component';


@NgModule({
  declarations: [
    HomeComponent,
    MovieDetailsComponent,
    PaginationComponent,
    MovieListComponent,
    TopExplorerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],

  exports: [
    HomeComponent
  ]

})

export class HomeModule { }
