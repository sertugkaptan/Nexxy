import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HostListener } from '@angular/core';
import { NgStyle } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgStyle,RouterLink,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Nexxy';
  navbg:any;

  @HostListener('document:scroll') 
  scrollOver(){
    console.log(document.body.scrollTop,"scrolllength#");

    if(document.body.scrollTop > 0 || document.documentElement.scrollTop>0){
      this.navbg = {
        'background-color':'#000000'
      }
    }else{
      this.navbg={}
    }
  }
}
