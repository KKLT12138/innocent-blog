import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'admin-friend',
  templateUrl: './friend.component.html',
  styleUrls: [
    '../../public/css/main.css',
    '../../public/css/formmain.css'
  ]
})
export class FriendComponent implements OnInit {
  @ViewChild('friendName') friendName;

  modal = {
    display: false,
    open: () => {
      this.modal.display = true;
      setTimeout(() => {
        this.friendName.nativeElement.focus();
      }, 100);

    },
    close: () => {
      this.modal.display = false;
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
