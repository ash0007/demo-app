export class TreeNode<T> {
    private _data: T;
    private _parent: TreeNode<T>;
    private _children: TreeNode<T>[];
  
    constructor(data: T, parent: TreeNode<T>, children: TreeNode<T>[] = []) {
      this._data = data;
      this._parent = parent;
      this._children = children;
    }
  
    get data(): T {
      return this._data;
    }
  
    get parent(): TreeNode<T> {
      return this._parent;
    }
  
    get children(): TreeNode<T>[] {
      return this._children;
    }
  
    addChild(child: TreeNode<T>) {
      this._children.push(child);
    }
  
    getLevel() {
      let level = 0;
      let currentParent = this._parent;
  
      while (currentParent != null) {
        level++;
        currentParent = currentParent.parent;
      }
  
      return level;
    }
  }
  