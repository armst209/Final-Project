import { Component, OnInit } from '@angular/core';
import { GameinfoService } from '../../service/gameinfo.service';



@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  charSelect : any;
  scores: any;
  loginId: any;

  constructor(private gameInfoService : GameinfoService) { }

  ngOnInit(): void {
    this.getCharacters();
    this.getHighScores();
    
  }

  getCharacters(){

    this.gameInfoService.getCharInfo().subscribe(response => {
      this.charSelect = response;
      console.log(response)
    })
  }

  getHighScores(){

    this.gameInfoService.getScores().subscribe(response => {
      this.scores = response;
      console.log(response)
    })
  }

  getLoginId(){

    this.gameInfoService.getUniqueId().subscribe(response => {
      this.loginId = response;
      console.log(response)
    })
  }
  

}
