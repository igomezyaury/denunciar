import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user;

  public sidebarOpened: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
    ) {
    this.user = JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit(): void {
  }

  logout(){
    /**
     * @todo: Show confirmation dialog before logout
     */
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }

  toggleSidebar(){
    this.sidebarOpened = !this.sidebarOpened;
  }
}
