import { CollectionViewer, DataSource, SelectionChange } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, merge, Observable } from "rxjs";
import { DynamicDatabase } from "./dynamic-database.service";

// export class DynamicFlatNode {
//     constructor(public item: string, public level = 1, public expandable = false,
//         public isLoading = false) { }
// }

export interface DynamicFlatNode {
    item: string;
    level: number;
    expandable: boolean;
    isLoading?: boolean;
}

export class TreeDataSource implements DataSource<DynamicFlatNode> {
    data: Array<DynamicFlatNode>;
    dataChange: BehaviorSubject<Array<DynamicFlatNode>>;
    connect: (collectionVCiewer: CollectionViewer) => Observable<Array<DynamicFlatNode>>;
    disconnect: (collectionViewer: CollectionViewer) =>  void;
}

@Injectable({ providedIn: 'root' })
export class DynamicDataSource {

    private treeDataSource: TreeDataSource;
    dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);
    get data(): Array<DynamicFlatNode> {
        return this.dataChange.value;
    }

    set data(value: Array<DynamicFlatNode>) {
        this._treeControl.dataNodes = value;
        this.dataChange.next(value);
    }
    
    get DataSource(): TreeDataSource {
        return this.treeDataSource;
    }
    set DataSource(_treeDataSource) {
        this._treeControl.dataNodes = _treeDataSource.data;
        this.dataChange.next(_treeDataSource.data);
        if(!_treeDataSource) {
            this.treeDataSource = {
                data: this.dataChange.value,
                dataChange: new BehaviorSubject<Array<DynamicFlatNode>>([]),
                connect: (collectionViewer: CollectionViewer) => {
                    this._treeControl.expansionModel.changed.subscribe((change) => {
                        if ((change as SelectionChange<DynamicFlatNode>).added || (change as SelectionChange<DynamicFlatNode>).removed) {
                            this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
                        }
                    });
                    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
                },
                disconnect: (collectionViewer: CollectionViewer) => {
                    console.log(collectionViewer);
                }
            }
        } else {
            this.treeDataSource = _treeDataSource;
        }
    }

    constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>, private _database: DynamicDatabase) { }
    // connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    //     this._treeControl.expansionModel.changed.subscribe((change) => {
    //         if ((change as SelectionChange<DynamicFlatNode>).added || (change as SelectionChange<DynamicFlatNode>).removed) {
    //             this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
    //         }
    //     });
    //     return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    // }
    // disconnect(collectionViewer: CollectionViewer): void {
    //     console.log(collectionViewer);
    // }
    handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
        if (change.added) {
            change.added.forEach(node => this.toggleNode(node, true));
        }
        if (change.removed) {
            change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
        }
    }
    toggleNode(node: DynamicFlatNode, expand: boolean) {
        const children = this._database.getChildren(node.item);
        const index = this.data.indexOf(node);
        if (!children || index < 0) {
            return;
        }
        node.isLoading = true;
        setTimeout(() => {
            if (expand) {
                const nodes = children.map(name => {
                    const obj:  DynamicFlatNode = {
                        item: name,
                        level: node.level + 1,
                        expandable: this._database.isExpandable(name)
                    }
                    return obj;
                });
                // const nodes = children.map(name => new DynamicFlatNode(name, node.level + 1, this._database.isExpandable(name)));
                this.data.splice(index + 1, 0, ...nodes);
            } else {
                let count = 0;
                for (let i = index + 1; i < this.data.length && this.data[i].level > node.level; i++, count++) { }
                this.data.splice(index + 1, count);
            }
            this.dataChange.next(this.data);
            node.isLoading = false;
        }, 1000);
    }

}