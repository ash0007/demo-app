import { Component, OnInit } from '@angular/core';
import { BooleanMagicBox } from 'src/app/classes/AIBinarySystem';

@Component({
  selector: 'app-boolean-box-host',
  templateUrl: './boolean-box-host.component.html',
  styleUrls: ['./boolean-box-host.component.scss']
})
export class BooleanBoxHostComponent implements OnInit {

  magicBox: any = null;
  constructor() { }

  ngOnInit(): void {
    const magicBox = new BooleanMagicBox(2);
    magicBox.create();
    this.magicBox = Object.keys(magicBox.output).slice(0,20).map(fn => magicBox.output[fn]);
  }

}
