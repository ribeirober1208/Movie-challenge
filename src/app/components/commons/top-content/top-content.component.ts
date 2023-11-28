// top-content.component.ts

import { Component, EventEmitter, Output, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-top-content',
  templateUrl: './top-content.component.html',
  styleUrls: ['./top-content.component.css']
})
export class TopContentComponent {

  @Output() filterEvent = new EventEmitter<string>();
  @Output() orderEvent = new EventEmitter<string>();
  @Output() searchEvent = new EventEmitter<string>();
  @Input() genres: any[] = []; 
  @Input() orderOptions: any[] = [
    {
      order: "popularity.desc",
      name: "Mais populares",
    },
    {
      order: "popularity.asc",
      name: "Menos populares",
    },
    {
      order: "primary_release_date.desc",
      name: "Mais recentes",
    },
    {
      order: "primary_release_date.asc",
      name: "Menos recentes",
    },
    {
      order: "vote_average.desc", 
      name: "Maiores notas",
    },
    {
      order: "vote_average.asc", 
      name: "Menores notas",
    },
    {
      order: "vote_count.desc",
      name: "Mais votados",
    },
    {
      order: "vote_count.asc", 
      name: "Menos votados",
    }
  ];
  @Input() selectedGenre: string = '';
  @Input() selectedOrder: string = '';
  
  @ViewChild("filter") filter!: ElementRef<HTMLInputElement>;
  @ViewChild("order") order!: ElementRef<HTMLSelectElement>;
  @ViewChild("search") search!: ElementRef<HTMLInputElement>;

  handleFilterEvent() {
    console.log('Evento de Filtro:', this.filter.nativeElement.value);
    this.filterEvent.emit(this.filter.nativeElement.value);
  }

  handleOrderEvent() {
    console.log('Evento de Ordem:', this.order.nativeElement.value);
    this.orderEvent.emit(this.order.nativeElement.value);
  }

  handleSearchEvent() {
    console.log('Evento de Pesquisa:', this.search.nativeElement.value);
    this.searchEvent.emit(this.search.nativeElement.value);
  }
}
