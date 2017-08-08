import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['../../public/css/tags.css']
})
export class TagsComponent implements OnInit, AfterViewInit {
  @ViewChild('tagsContent') tagsContent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    for (let tag of this.tagsContent.nativeElement.children) {
      tag.style.fontSize = Math.floor(Math.random() * 34 + 12) + 'px';
      let h = Math.random() * 360;
      let s = Math.random() * 100;
      let l = Math.random() * 70 + 30;
      tag.style.color = `hsl(${h}, ${s}%, ${l}%)`;
    }
  }

}
