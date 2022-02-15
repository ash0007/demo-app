import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Tree } from '../models/tree';
import { TreeNode } from '../models/tree-models';

@Component({
  selector: 'app-tree-parent',
  templateUrl: './tree-parent.component.html',
  styleUrls: ['./tree-parent.component.css']
})
export class TreeParentComponent implements OnInit {
  @Input()
  tree: Tree<string>;

  treeNode: TreeNode<string>;

  ngOnChanges(changes: SimpleChanges) {
    if(changes['tree'] && this.tree != null) {
      this.treeNode = this.tree.getRoot();
    }
  }

  constructor() { }

  ngOnInit() {}
}
