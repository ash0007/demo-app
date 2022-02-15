import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from '../models/tree-models';

@Component({
  selector: 'app-tree-child',
  templateUrl: './tree-child.component.html',
  styleUrls: ['./tree-child.component.css']
})
export class TreeChildComponent implements OnInit {
  @Input()
  node: TreeNode<string>;

  constructor() { }

  ngOnInit() {
  }
}
