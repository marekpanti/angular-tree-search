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

  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();
  search = new FormControl('');

  constructor() {
    this.dataSource.data = this.filteredTree;
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  stackSearch() {
    const tree: any = this.tree;
    const target = this.search.value;
    console.log(this.search);
    console.log(target);
    let result = [];
    for (const stack = [tree]; stack.length; ) {
      const curr = stack.pop();

      if (curr.title === target) {
        // return curr.label;
        result.push(curr);
      }
      // console.log(curr);
      stack.push(...curr.children);
    }
    console.log(result);
    this.filteredTree = result;
    this.dataSource.data = this.filteredTree;
    return result;
  }
}
