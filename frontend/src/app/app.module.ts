import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './authentication/token.interceptor';
import { AuthenticationModule } from './authentication/authentication.module';
import { HomeModule } from './home/home.module';
import { AuthenticationService } from './authentication/authentication.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { LayoutModule } from './layout/layout.module';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthenticationModule,
    LayoutModule,
    UserModule,
    HomeModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    UserService,
    DatePipe,
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
