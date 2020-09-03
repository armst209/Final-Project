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

  // tslint:disable-next-line:typedef
  getCharacters() {
    this.gameInfoService.getCharInfo().subscribe(response => {
      this.charSelect = response;
      console.log(response);
    });
  }

}
