import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GameinfoService {

  constructor(private http: HttpClient) { }


  getCharInfo() : Observable<any>{

    return this.http.get("https://char-info.herokuapp.com/characters/");
   
  }

  getScores(){

    return this.http.get("https://char-info.herokuapp.com/scores/");
  }

  getUniqueId(){

    return this.http.get("https://char-info.herokuapp.com/login/")
  }
}
