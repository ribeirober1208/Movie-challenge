import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, untracked } from '@angular/core';

@Component({
  selector: 'app-top-content',
  templateUrl: './top-content.component.html',
  styleUrls: ['./top-content.component.css']
})
export class TopContentComponent implements OnInit {
  @Output() getSelectedGenerEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() getSelectedOrderEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() getSearchEmitter: EventEmitter<string> = new EventEmitter<string>();
  //o botão é emitido como void porque ele não tem retorno
  @Output() searchButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() genres: any[] = [];
  //O view child é como o getElement, ele consegue acessar o valor do elemento
  //através de uma variável de escopo
  @ViewChild("filter") filter!: ElementRef;
  @ViewChild("order") order!: ElementRef;
  @ViewChild("search") search!: ElementRef;

  //Array com a lista de ordenações da API
  orderList: any[] = [
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
  ]
  
  
  constructor() {}

  ngOnInit(): void {}

  //Captura os valores dos eventos e emite para a home
  getSelectedGener(event: any) {
    this.getSelectedGenerEmitter.emit(event.target.value);
  }

  getSelectedOrder(event: any) {
   this.getSelectedOrderEmitter.emit(event.target.value);   
  }

  getSearch(event: any) {
    this.getSearchEmitter.emit(event.target.value);    
   }

  //Emite o clique no botão para acessar o e.value do search
  onSearchButtonClick() {
    this.searchButtonClick.emit();
  }

  //Emite os eventos vazios para limpar as buscas
  clear(){
    this.getSelectedGenerEmitter.emit("0");
    this.getSelectedOrderEmitter.emit("");
    this.getSearchEmitter.emit("");
  }
}