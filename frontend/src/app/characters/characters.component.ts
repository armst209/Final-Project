import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameinfoService } from '../service/gameinfo.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  charSelect: any;
  

  constructor(private gameInfoService: GameinfoService, private route : Router) { }

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

    document.getElementById('characterName').innerText = 'Aaron';
    
    console.log(document.getElementById('characterName').innerText);
    this.route.navigate(["/game"]);

  }
  playerTwoSelected() {
    console.log('you hit player two selected')

    document.getElementById('characterName').innerText = 'Amber';
    
    console.log(document.getElementById('characterName').innerText);
    this.route.navigate(["/game"]);

  }

  playerThreeSelected() {

    document.getElementById('characterName').innerText = this.charSelect.find(x => x.id == 3).name;
    
    console.log(document.getElementById('characterName').innerText);
    this.route.navigate(["/game"]);

  }

  

}
