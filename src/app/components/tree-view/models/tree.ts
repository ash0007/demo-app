import { TreeNode } from "./tree-models";

export class Tree<T> {

  private _root: TreeNode<T>;

  constructor(data: T) {
    this._root = new TreeNode<T>(data, null);
  }

  getRoot(): TreeNode<T> {
    return this._root;
  }
  
}