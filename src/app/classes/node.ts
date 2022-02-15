abstract class NodeType {
    private _node_id: number;
    constructor() {}
    set node_id(_id) {
        this._node_id = _id;
    }
    get node_id(): number {
        return this._node_id;
    }
}

class Tree<T extends NodeType> {
    private _root: TreeNode<T>;
    constructor();
    constructor(data: T);
    constructor(data?: T) {
        if(!data) {
            this._root = new TreeNode<T>();
        } else {
            this._root = new TreeNode<T>(data);
        }
    }
}

class TreeNode<T> {
    private _data: T;
    private _parent: TreeNode<T>;
    private _children: Array<TreeNode<T>>;
    constructor();
    constructor(data: T);
    constructor(data: T, parent: TreeNode<T>, children: Array<TreeNode<T>>);
    constructor(data: T = null, parent: TreeNode<T> = null, children: Array<TreeNode<T>> = []) {
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
    get children(): Array<TreeNode<T>> {
        return this._children;
    }
    hasChildren(): boolean {
        return this._children?.length > 0;
    }
    getLevel(): number {
        let level = 0;
        let currentParent = this._parent;
        while(currentParent !== null) {
            level++;
            currentParent = currentParent.parent;
        }
        return level;
    }
    addChild(child: TreeNode<T>): boolean {
        let flag = false;
        this._children.push(child);
        return flag;
    }
    private hasNodePresentInChildren(node): boolean {
        let flag = false;
        const currentNode = this.children?.[0]?.parent;
        this.iterationOverChildren(currentNode, (child, index, parent) => {
            if(!flag && !!child) {}
        });
        return flag;
    }
    iterationOverChildren(node: TreeNode<T>, iteratee: Function = (arg1, arg2, arg3) => {}): void {
        let index = -1;
        const length = node?.children?.length || 0;
        const result = new Array(length);
        let tempNode = null;
        if(node.hasChildren()) {
            tempNode = node?.children?.[index];
            iteratee(tempNode, index, node?.parent);
        }
    }
}