import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent implements OnInit {
  //taking input from repository compnent.
  @Input() types: any[] = []; 
  @Input() filterType: string = '';
  //Providing Output to repository component.
  @Output() selectValue = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  //Passing data to repository component.
  onSelectedValue(event: any) {
    this.selectValue.next(event.target.value);
  }

}
