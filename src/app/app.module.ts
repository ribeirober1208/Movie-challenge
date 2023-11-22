import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/commons/header/header.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { MainComponent } from './components/commons/main/main.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule} from '@angular/common/http';
import { TmdbService } from 'src/services/tmdb.service';
import { MovieListComponent } from './components/movie-list/movie-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    MovieListComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
  ],
  providers: [
    TmdbService,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
