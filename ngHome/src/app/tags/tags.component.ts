import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TagService } from '../share/tag.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['../../public/css/tags.css'],
  providers: [
    TagService
  ]
})
export class TagsComponent implements OnInit, AfterViewInit {

  tagCloud: any[] = [
    {
      id: '',
      name: '',
      fontSize: '16px',
      color: '#000'
    }
  ];

  tagCloudCount = 0;

  constructor(
    private _tagService: TagService,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.setTitle("Tianzhen呀-标签");
    this.getTagCloud();
  }

  ngAfterViewInit() {

  }

  getTagCloud() {
    this._tagService.getTagCloud()
      .subscribe(datas => {
        this.tagCloud = [];
        datas.forEach((data, index) => {
          this.tagCloud[index] = {};
          this.tagCloud[index].id = data._id;
          this.tagCloud[index].name = data.name;
          this.tagCloud[index].fontSize = Math.floor(Math.random() * 34 + 12) + 'px';
          let h = Math.random() * 360;
          let s = Math.random() * 100;
          let l = Math.random() * 70 + 30;
          this.tagCloud[index].color = `hsl(${h}, ${s}%, ${l}%)`;
        });
        this.tagCloudCount = datas.length;
      })
  }

  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

}
