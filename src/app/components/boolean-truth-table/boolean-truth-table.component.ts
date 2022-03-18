import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boolean-truth-table',
  templateUrl: './boolean-truth-table.component.html',
  styleUrls: ['./boolean-truth-table.component.scss']
})
export class BooleanTruthTableComponent implements OnInit {
  @Input() magic: any;
  
  constructor() { }

  ngOnInit(): void {
    console.log(window.innerWidth);
  }

}
