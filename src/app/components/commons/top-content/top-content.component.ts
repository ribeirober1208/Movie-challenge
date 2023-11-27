import { Component, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-top-content',
  templateUrl: './top-content.component.html',
  styleUrls: ['./top-content.component.css']
})
export class TopContentComponent {
  @Output() filterEvent = new EventEmitter<string>();
  @Output() orderEvent = new EventEmitter<string>();
  @Output() searchEvent = new EventEmitter<string>();

  applyFilter(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement)?.value || '';
    this.filterEvent.emit(selectedValue);
  }

  applyOrder(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement)?.value || '';
    this.orderEvent.emit(selectedValue);
  }

  applySearch(event: Event) {
    event.preventDefault();
    const searchValue = (event.target as HTMLFormElement)?.querySelector('input')?.value || '';
    this.searchEvent.emit(searchValue);
  }
}

