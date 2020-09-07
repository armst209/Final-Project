import { Component, OnInit } from '@angular/core';
import { GameinfoService } from '../service/gameinfo.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  charSelect: any;
  

  constructor(private gameInfoService: GameinfoService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    this.gameInfoService.getCharInfo().subscribe(response => {
      this.charSelect = response;
      console.log(response);
    });
  }
  
  playerOneSelected() {

    this.gameInfoService.selectedCharacter = this.charSelect.find(x => x.id == 1);
    console.log(this.gameInfoService.selectedCharacter)

  }
  playerTwoSelected() {

    this.gameInfoService.selectedCharacter = this.charSelect.find(x => x.id == 2);
    console.log(this.gameInfoService.selectedCharacter);
  }

  playerThreeSelected() {

    this.gameInfoService.selectedCharacter = this.charSelect.find(x => x.id === 3);
    console.log(this.gameInfoService.selectedCharacter)
  }

  

}
