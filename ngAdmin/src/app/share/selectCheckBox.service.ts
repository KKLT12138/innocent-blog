import { Injectable } from '@angular/core';

@Injectable()
export class SelectCheckBoxService {
  selectedCheckBox = [];

  constructor( ) { }

  /* 全选、清空复选框 */
  selectAllCheckBox(checked: boolean, collection, field) {
    this.selectedCheckBox = [];
    if (checked) {
      collection.forEach((doc, index) => {
        this.selectedCheckBox.push(doc[field]);
      })
    }
  }

  /* 整理复选框，将选中的项目id推入数组 */
  selectCheckBox(checked: boolean, value: string) {
    let index: number = this.selectedCheckBox.indexOf(value);
    if (checked) {
      if (index < 0) {
        this.selectedCheckBox.push(value);
      }
    } else {
      if (index > -1) {
        this.selectedCheckBox = this.selectedCheckBox.filter((curValue, index) => {
          return curValue != value;
        })
      }
    }
  }

  /* 清空复选框数组，在切换页面和分页的时候使用 */
  clearCheckBox() {
    this.selectedCheckBox = [];
  }

}
