/* 指令示例
 * 这段代码仅用于指令功能演示 */
import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[addpost-editor]'
})
export class AddpostEditorDirective implements AfterViewInit {
  postBox: any;
  constructor(private el: ElementRef) {
    this.postBox = el.nativeElement;
  }

  ngAfterViewInit() {
    let postBoxStyle = getComputedStyle(this.postBox) || this.postBox.currentStyle;
    let postBoxRightWidth = 355;
    let postBoxLeftWidth = parseInt(postBoxStyle.width) - postBoxRightWidth;
    this.postBox.children[0].style.width = postBoxLeftWidth + 'px';

  }

}
