import { AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';

import { GameinfoService } from '../service/gameinfo.service';



@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, AfterViewInit {



  cards = [
    {img: 'https://image-cdn.essentiallysports.com/wp-content/uploads/20200829002100/Animal-Crossing-New-Horizons-PC-Unlocked-Version-Download-Full-Free-Game-Setup-1600x900-4.jpg'},
    {img: 'https://i1.wp.com/www.newsgroove.co.uk/wp-content/uploads/2019/08/_467_The-20-Most-Popular-Video-Games-Right-Now-2019-Wealthy-Gorilla.jpg?resize=800%2C400&ssl=1'},
    {img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1mNYWn7LrLRE1grD_5WEAYgmucSTW6GY5Lg&usqp=CAU'},
    {img: 'https://hb.imgix.net/166356e60e08a6c0f4369bbb5cdca84289f0914a.jpeg?auto=compress,format&fit=crop&h=353&w=616&s=dc491aebdff622b0c82b32a0caf2d4d8'},
    {img: 'https://img-eshop.cdn.nintendo.net/i/e015bde170dda60a4e939f78181dabd69879951e22c47ca4a0871176d5b910fc.jpg?w=1000'},
    {img: 'https://www.vidpaw.com/img/topics/fortnite.jpg'},
    {img: 'https://cdn.gaminggorilla.com/wp-content/uploads/2020/05/Most-Popular-Video-Games-Super-Smash-Bros-Ultimate.jpg'},
    {img: 'https://1.bp.blogspot.com/-ziD3HoEr-O0/XTbG69n022I/AAAAAAAAS0s/JkGSkdPTSjAVTPPrFMwwTKJMPTTYQ8_bQCLcBGAs/s640/gta.jpg'},
    {img: 'https://gmsrp.cachefly.net/images/19/12/23/520e23f606b4627af293ffce94204cf2/960.jpg'},
  ];

  slides: any = [[]];
  constructor(private renderer : Renderer2, private gameInfoService : GameinfoService) {
 
  }

  chunk(arr: any, chunkSize: number) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  ngOnInit(): void {
    this.slides = this.chunk(this.cards, 3);
   
  }

  ngAfterViewInit() {
    const buttons = document.querySelectorAll('.btn-floating');
    buttons.forEach((el: any) => {
      this.renderer.removeClass(el, 'btn-floating');
      this.renderer.addClass(el, 'px-3');
      this.renderer.addClass(el.firstElementChild, 'fa-3x');
    });
  }

  getHighScore(){
    
    return document.getElementById('high-score').innerHTML;
  }

}



