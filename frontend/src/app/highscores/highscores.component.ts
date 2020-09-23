import { Component, OnInit } from '@angular/core';
import { GameinfoService } from '../service/gameinfo.service';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent implements OnInit {


  scoreInfo: any;
  constructor(private gameInfoService : GameinfoService) { }

  ngOnInit(): void {
    this.getScoreInfo();
  
  }

  getScoreInfo(){

    this.gameInfoService.getFullScoreInfo().subscribe(response => {
      this.scoreInfo = response;
      console.log(response);
    })
    

  }



}
