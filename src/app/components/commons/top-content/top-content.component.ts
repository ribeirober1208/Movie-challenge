import { Component, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-top-content',
  templateUrl: './top-content.component.html',
  styleUrls: ['./top-content.component.css']
})
export class TopContentComponent {
  @Output() filterEvent = new EventEmitter<string>();

}
