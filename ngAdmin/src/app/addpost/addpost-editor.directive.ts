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
    console.dir(this.postBox);
    let postBoxStyle = getComputedStyle(this.postBox) || this.postBox.currentStyle;
    console.dir(postBoxStyle);
    let postBoxRightWidth = 355;
    let postBoxLeftWidth = parseInt(postBoxStyle.width) - postBoxRightWidth;
    this.postBox.children[0].style.width = postBoxLeftWidth + 'px';

    console.log(postBoxLeftWidth);
  }

}
