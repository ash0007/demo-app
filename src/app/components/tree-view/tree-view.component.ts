import { Component, OnInit } from '@angular/core';
import { Tree } from './models/tree';
import { TreeNode } from './models/tree-models';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {

  tree: Tree<string>;
  constructor() { }

  ngOnInit(): void {
  }
  initTreeData() {
    let tree = new Tree<string>("root-node-data");
    let root: TreeNode<string> = tree.getRoot()
    for(let i = 0; i < 10; i++) {
      let node: TreeNode<string> = new TreeNode("First Level Node " + i, root);
      root.addChild(node);

      for(let j = 0; j < 3; j++) {
        let innerNode: TreeNode<string> = new TreeNode("Second Level Node " + i + ":" + j, node);
        node.addChild(innerNode);
        
        let innerNode2: TreeNode<string> = new TreeNode("Third Level Node " + i + ":" + j + ":0", innerNode);
        innerNode.addChild(innerNode2)
      }

    }
    this.tree = tree;
  }

}
