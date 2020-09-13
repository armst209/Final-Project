import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';



@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  cards = [
    {img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
  ];

  slides: any = [[]];
  constructor(private renderer : Renderer2) {}

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
    
}



