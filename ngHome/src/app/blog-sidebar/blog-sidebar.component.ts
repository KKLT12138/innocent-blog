import { Component, OnInit } from '@angular/core';

import { FriendService } from '../share/friend.service';

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

  constructor(
    private _friendService: FriendService
  ) { }

  ngOnInit() {
    this.getFriends();
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
