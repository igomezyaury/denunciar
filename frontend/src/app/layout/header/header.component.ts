import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user;

  public sidebarOpened: boolean = false;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.sidebarOpened = !this.sidebarOpened;
  }
}
