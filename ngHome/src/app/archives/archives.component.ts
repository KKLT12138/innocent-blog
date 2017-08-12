import { Component, OnInit } from '@angular/core';
import { PostService } from '../share/post.service';
import { parseTime } from '../share/timeToDate.fn';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['../../public/css/archives.css'],
  providers: [
    PostService
  ]
})
export class ArchivesComponent implements OnInit {

  postList: any[] = [
    {
      item: {
        year: 1970,
        posts: [
          {
            id: '',
            title: '',
            date: ''
          }
        ]
      }
    }
  ];

  pageConfig = {
    totalNum: 0,
    currentPage: 1,
    totalPage: 0,
    pageSize: 10
  };

  constructor(
    private _postService: PostService,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.setTitle("Tianzhen呀-归档");
    this.getTagList(this.pageConfig.currentPage, this.pageConfig.pageSize);
  }

  getTagList(currentPage, pageSize) {
    return this._postService.getPostList(currentPage, pageSize)
      .subscribe(datas => {
        this.pageConfig.totalNum = datas.totalNum;
        this.pageConfig.totalPage = Math.ceil(this.pageConfig.totalNum / this.pageConfig.pageSize);
        this.postList = [];
        let tempArr = [];
        datas.data.forEach((data, index) => {
          let year = (new Date(data.date)).getFullYear();

          if (tempArr.indexOf(year) == -1) {
            tempArr.push(year);
          }
        });
        for (let i = 0; i < tempArr.length; i++) {
          this.postList.push({
            item: {
              year: tempArr[i],
              posts: []
            }
          });
        }
        let data = datas.data;
        for (let i in data) {
          for (let j in this.postList) {
            let year = (new Date(data[i].date)).getFullYear();
            if (year == this.postList[j].item.year) {
              this.postList[j].item.posts.push({
                id: data[i]._id,
                title: data[i].title,
                date: parseTime(data[i].date, 2)
              });
            }
          }
        }
      });
  }

  getPageData(currentPage) {
    this.getTagList(currentPage, this.pageConfig.pageSize);
  }

  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
