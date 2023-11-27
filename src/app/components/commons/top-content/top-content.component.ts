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

  // handleFilterEvent(event: any) {
  //   console.log('Filter Event:', event);
  //   const selectedValue = event.target?.value;
  //   if (selectedValue !== undefined && selectedValue !== null) {
  //     this.filterEvent.emit(selectedValue);
  //   }
  // }

  // handleOrderEvent(event: any) {
  //   console.log('Order Event:', event);
  //   const selectedValue = event.target?.value;
  //   if (selectedValue !== undefined && selectedValue !== null) {
  //     this.orderEvent.emit(selectedValue);
  //   }
  // }

  // handleSearchEvent(event: Event) {
  //   console.log('Search Event:', event);
  //   event.preventDefault();
  //   const searchValue = (event.target as HTMLFormElement)?.querySelector('input')?.value || '';
  //   this.searchEvent.emit(searchValue);
  // }
  // top-content.component.ts

handleFilterEvent(event: any) {
  console.log('Filter Event:', event);
  this.filterEvent.emit(event.target.value);
}

handleOrderEvent(event: any) {
  console.log('Order Event:', event);
  this.orderEvent.emit(event.target.value);
}

}

