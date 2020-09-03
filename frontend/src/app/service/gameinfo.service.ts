import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameinfoService {

  constructor(private http: HttpClient ) { }

  getCharInfo(): Observable<any> {
    return this.http.get<any>('https://char-info.herokuapp.com/characters/');
  }

}
