import { Component, OnInit } from '@angular/core';

import { FriendService } from '../share/friend.service';
import { DataService } from '../share/data.service';

@Component({
  selector: 'blog-sidebar',
  templateUrl: './blog-sidebar.component.html',
  styleUrls: ['../../public/css/sidebar.css'],
  providers: [
    FriendService
  ]
})
export class BlogSidebarComponent implements OnInit {
  friends: any[] = [
    {
      id: '',
      name: '',
      url: '',
      order: ''
    }
  ];

  numbs = {
    postNum: 0,
    categoryNum: 0,
    tagNum: 0
  };


  constructor(
    private _friendService: FriendService,
    private _dataService: DataService
  ) { }

  ngOnInit() {
    this.getFriends();

    this._dataService.getPostNum()
      .subscribe((data) => {
        this.numbs.postNum = data.num;
      });

    this._dataService.getCategoryNum()
      .subscribe((data) => {
        this.numbs.categoryNum = data.num;
      });

    this._dataService.getTagNum()
      .subscribe((data) => {
        this.numbs.tagNum = data.num;
      });
  }

  getFriends() {
    return this._friendService.getFriends()
      .subscribe(datas => {
        datas.forEach( (data, index) => {
          this.friends[index] = {};
          this.friends[index].id = data._id;
          this.friends[index].name = data.name;
          this.friends[index].url = data.url;
          this.friends[index].order = data.order;
        });
      }, error => {
        console.error('友链载入失败');
      });
  }

}
