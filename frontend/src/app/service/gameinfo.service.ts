import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameinfoService {

  selectedCharacter: any;
  playerOne: any;
  random: string = 'random';

 
  constructor(private http: HttpClient ) { }

  
  getCharInfo(): Observable<any> {
    return this.http.get<any>('https://char-info.herokuapp.com/characters/');
  }

  getUniqueScore(id: string, score: number){

    return this.http.post<any>('https://game-backend3412.herokuapp.com/scores/', {id:id, score: score})
   }

   getFullScoreInfo():Observable<any>{

    return this.http.get<any>('https://game-backend3412.herokuapp.com/scores/');
   }

   getDadJokes():Observable<any>{
    
    return this.http.get<any>('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes/');
   }

   closePhaserInstance() {
    
  }

//    HandleBackFunctionality()  
//  {  
//      if(window.event)  
//     {  
//           if(window.X < 40 && window.event.clientY < 0)  
//          {  
//              alert("Browser back button is clicked...");  
//          }  
//          else  
//          {  
//              alert("Browser refresh button is clicked...");  
//          }  
//      }  
//      else  
//      {  
//           if(event.currentTarget.performance.navigation.type == 1)  
//          {  
//               alert("Browser refresh button is clicked...");  
//          }  
//          if(event.currentTarget.performance.navigation.type == 2)  
//         {  
//               alert("Browser back button is clicked...");  
//         }  
//      }  
//  } 

}