import { Component, OnInit, ViewChild } from '@angular/core';

import { TagService } from './tag.service';

@Component({
  selector: 'admin-tagslist',
  templateUrl: './tagslist.component.html',
  styleUrls: [
    '../../public/css/main.css',
    '../../public/css/formmain.css'
  ],
  providers: [
    TagService
  ]
})
export class TagsListComponent implements OnInit {
  @ViewChild('tagName') tagName;

  tags: any[] = [
    {
      id: 'loading..',
      tagName: 'loading..',
      numb: 'loading..',
      percent: 'loading'
    }
  ];

  modal = {
    display: false,
    open: () => {
      this.modal.display = true;
      setTimeout(() => {
        this.tagName.nativeElement.focus();
      }, 100);

    },
    close: () => {
      this.modal.display = false;
    }
  };
  constructor(
    private _tagService: TagService
  ) { }

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    return this._tagService.getTags()
      .subscribe(datas => {
        datas.forEach( (data, index) => {
          this.tags[index] = {};
          this.tags[index].id = data._id;
          this.tags[index].tagName = data.name;
        })
      });
  }

}
