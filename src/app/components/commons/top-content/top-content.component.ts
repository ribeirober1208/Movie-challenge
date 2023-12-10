// top-content.component.ts

import { Component, EventEmitter, Output, Input, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-content',
  templateUrl: './top-content.component.html',
  styleUrls: ['./top-content.component.css']
})
export class TopContentComponent implements OnInit {
  @ViewChild("filter") filter!: ElementRef<HTMLInputElement>;
  @ViewChild("order") order!: ElementRef<HTMLSelectElement>;
  @ViewChild("search") search!: ElementRef<HTMLInputElement>;

  @Output() filterEvent = new EventEmitter<string>();
  @Output() orderEvent = new EventEmitter<string>();
  @Output() searchEvent = new EventEmitter<string>();
  @Output() searchButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() genres: any[] = []; 
  @Input() selectedGenre: string = '';
  @Input() selectedOrder: string = ''; 
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
  
  constructor() {}

  ngOnInit(): void {}

  getSelectedGener(event: any) {
    this.filterEvent.emit(event.target.value);
  }

  // getSelectedOrder(event: any) {
  //   this.orderEvent.emit(event.target.value);   
  // }

  getSearch(event: any) {
    this.searchEvent.emit(event.target.value);    
  }

  onSearchButtonClick() {
    this.searchButtonClick.emit();
  }

  clear() {
    this.filterEvent.emit("");
    this.orderEvent.emit("");
    this.searchEvent.emit("");
  }

  handleFilterEvent(event: Event) {
    //console.log("evento", (event.target as HTMLSelectElement).value);
    this.filterEvent.emit((event.target as HTMLSelectElement).value);
  }

  handleOrderEvent(event: Event) {
    console.log("Order", (event.target as HTMLSelectElement).value);
    this.orderEvent.emit((event.target as HTMLSelectElement).value);
  }

  handleSearchEvent(event: Event) {
    console.log((event.target as HTMLSelectElement).value);
    this.searchEvent.emit((event.target as HTMLSelectElement).value);
  }
}