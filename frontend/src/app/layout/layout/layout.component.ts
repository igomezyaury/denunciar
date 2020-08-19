import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild(HeaderComponent, { static: true })
  headerComponent: HeaderComponent;

  public user;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.headerComponent.toggleSidebar();
  }

}
