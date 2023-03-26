import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { slovakiaTreeModel } from './tree.model';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent {
  private tree = slovakiaTreeModel;
  public filteredTree: any = [slovakiaTreeModel];

  treeControl = new NestedTreeControl<any>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<any>();
  search = new FormControl('');

  constructor() {
    this.dataSource.data = this.filteredTree;
    this.treeControl.dataNodes = this.filteredTree;
    this.treeControl.expandAll();
  }

  hasChild = (_: number, node: any) =>
    !!node.children && node.children.length > 0;

  stackSearch() {
    const tree: any = this.tree;
    const target = this.search.value;

    let result = [];

    // tree traversal - we create a stack out of our tree
    // then we check for the target and at the same time we add to the stack children
    for (const stack = [tree]; stack.length; ) {
      const curr = stack.pop();

      if (curr.title === target) {
        result.push(curr);
      }
      stack.push(...curr.children);
    }
    this.filteredTree = result;
    this.dataSource.data = this.filteredTree;
    return result;
  }

  reset() {
    this.filteredTree = [this.tree];
    this.dataSource.data = this.filteredTree;
  }
}
