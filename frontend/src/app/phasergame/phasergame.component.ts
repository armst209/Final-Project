import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Phaser from 'phaser';
import { GameinfoService } from '../service/gameinfo.service';

@Component({
  selector: 'app-phasergame',
  templateUrl: './phasergame.component.html',
  styleUrls: ['./phasergame.component.css'],
})
export class PhasergameComponent implements OnInit, OnDestroy {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  // input = document.getElementById('input').valueOf();
  value = '';
  

  closeGameEnd() {

    document.getElementById('form').style.display = "none"
    this.phaserGame.destroy(true);
    // location.reload();
  }

  getUniqueIdValue(value: string) {
    let score = document.getElementById('score').innerHTML;

    if (value.length == 0)
    { 
       console.log("was hit");
       alert("please enter a Unique ID");  	
       return false; 
    } else{

      document.getElementById('submit').style.display = "none";
      document.getElementById('submit-button').style.display = "none";
    }
    
    // this.phaserGame.destroy(true);
    this.value = value;
    console.log(this.value);
    console.log(score);
    this.gameInfoService.getUniqueScore(value, parseInt(score)).subscribe(response => {

      console.log(response);
    })
  };

  onSubmit(){
     
   
     }

  constructor(private gameInfoService: GameinfoService) {
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      scene: [MainScene],
      parent: 'game-area',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 500 },
          debug: false,
        },
      },
      audio: {
        disableWebAudio: true,
      },
      
    };

    
  }

  ngOnDestroy() {
    document.getElementById('characterName').innerText = 'Choose Your Character';

  }
  
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
   

  }

  closePhaserInstance() {
    this.phaserGame.destroy(true);

  }
 
}

@Component({
  selector: 'app-game',
  template: '',
  styles: []
})
export class MainScene extends Phaser.Scene {
  map: any;
  player: any;
  cursors: any;
  groundLayer: any;
  coinLayer: any;
  enemies: any;
  groundTiles: any;
  text: any;
  coinTiles: any;
  coins: any;
  score = 0;
  assessment = 0;
  assessScore = 1;
  scoreText: any;
  assessText: any;
  music: any;
  failSound: any;
  coinSound: any;
  nicoleSound: any;
  assessComplete: any;
  loadScreen: any;
  sprite: any;
  timeText: any;
  timedEvent: any;
  timer: any;
  bombs: any;
  bomb: any;
  x: any;
  background: any;
  platforms: any;
  movingPlatform: any;
  enemyHitSound: any;
  uniqueId: string;
  winText: any;
  gameOver = false;
 


  constructor(private gameInfoService: GameinfoService, private route: Router) {
    super({ key: 'main' });


  }


  getSelectedPlayer() {
    return this.gameInfoService.selectedCharacter;
  }

  preload() {

    if (document.getElementById('characterName').innerText == 'Aaron') {

      //loading background
      this.load.image('sky', 'assets/city.png');

      //loading coins
      this.load.image(
        'coin', '../assets/coin_5.gif');

      // player animations
      this.load.atlas('player', '../assets/Aaron.png', '../assets/Aaron.json');

      //loading platforms
      this.load.image('zoombar', 'assets/zoombar.png');
      this.load.image('youtube', 'assets/ytplatform.png');
      this.load.image('stackover','assets/soplatform.png')
      this.load.image('ground', 'assets/platform.png');
      //loads enemies
      this.load.image('nicole', 'assets/nicole.png');
      this.load.image('bomb', 'assets/html.png');
      this.load.image('bomb-1', 'assets/css.png');
      this.load.image('bomb2', 'assets/javascript.png');
      this.load.image('bomb3', 'assets/dom.png');
      this.load.image('bomb4', 'assets/typescript.png');
      this.load.image('bomb5', 'assets/angular.png');
      this.load.image('bomb6', 'assets/node-express.png');
      this.load.image('bomb7', 'assets/sql.png');
      
    } else if (document.getElementById('characterName').innerText == 'Amber') {

 

    } else if (document.getElementById('characterName').innerText == 'Garrett') {

            //loading background
            this.load.image('sky', 'assets/city.png');

            //loading coins
            this.load.image(
              'coin', '../assets/coin_5.gif');
      
            // player animations
            this.load.atlas('player', '../assets/Garrett.png', '../assets/Garrett.json');
      
            //loading platforms
            this.load.image('zoombar', 'assets/zoombar.png');
            this.load.image('youtube', 'assets/ytplatform.png');
            this.load.image('stackover','assets/soplatform.png')
            this.load.image('ground', 'assets/platform.png');
            //loads enemies
            this.load.image('nicole', 'assets/nicole.png');
            this.load.image('bomb', 'assets/html.png');
            this.load.image('bomb-1', 'assets/css.png');
            this.load.image('bomb2', 'assets/javascript.png');
            this.load.image('bomb3', 'assets/dom.png');
            this.load.image('bomb4', 'assets/typescript.png');
            this.load.image('bomb5', 'assets/angular.png');
            this.load.image('bomb6', 'assets/node-express.png');
            this.load.image('bomb7', 'assets/sql.png');
            

    }

    //loading music
    this.load.audio('level1', [
      'assets/level_2.ogg',
      'assets/level_2.mp3'
    ])
    
   
    this.load.audio('coinSound', '../assets/coin_sound.mp3')
    this.load.audio('assess_complete', '../assets/assess_complete.mp3')
    this.load.audio('tryagain', '../assets/arp.wav');
    this.load.audio('nicoleSound', '../assets/nicolesound.mp3')
    this.load.audio('loadScreen', '../assets/level_1.mp3')
   
    
    
  }

  create() {
    this.background = this.add.image(400, 300, 'sky');
    this.assessText = this.add.text(16, 29, 'Pre-Test: Deliverables', { fontFamily: 'ArcadeClassic',fontSize: '30px', fill: 'white'});


    //playing music & sound effects
    this.music = this.sound.add('level1', { volume: 0.3 });
    this.music.play();
    
    this.coinSound = this.sound.add('coinSound', { volume: 0.4 });
    this.nicoleSound = this.sound.add('nicoleSound');
    this.assessComplete = this.sound.add('assess_complete');
    
    this.failSound = this.sound.add('tryagain');
    this.loadScreen = this.sound.add('loadScreen'), { volume: 0.3 };
     
    //TIMERS


    this.platforms = this.physics.add.staticGroup();
    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  
    this.platforms.create(400, 578, 'zoombar').setScale(1).refreshBody();
    
    

    //  Now let's create some ledges
    //  this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 400, 'youtube');
    this.platforms.create(750, 220, 'stackover');


    // create the player sprite
    if (document.getElementById('characterName').innerText == 'Aaron') {
      this.player = this.physics.add.sprite(100, 450, 'player');
    } else if (document.getElementById('characterName').innerText == 'Amber') {
      // this.player = this.physics.add.sprite(10, 30, 'player');
    } else if (
      document.getElementById('characterName').innerText == 'Garrett'
    ) {
      this.player = this.physics.add.sprite(100, 450, 'player');
    }

    this.player.setBounce(0.2); // our player will bounce from items
    this.player.setCollideWorldBounds(true); // don't go out of the map


    // player 1 animation

    if (document.getElementById('characterName').innerText == 'Aaron') {
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNames('player', {
          prefix: 'p1_walk',
          start: 1,
          end: 4,
          zeroPad: 2,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNames('player', {
          prefix: 'p1_walk',
          start: 5,
          end: 8,
          zeroPad: 2,
        }),
        frameRate: 10,
        repeat: -1,
      });

      // idle with only one frame, so repeat is not neaded
      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('player', {
          prefix: 'p1_stand',
          start: 1,
          end: 2,
          zeroPad: 2,
        }),
        frameRate: 2.5,
        repeat: -1,
      });

      this.anims.create({
        key: 'jump',
        frames: [{ key: 'player', frame: 'jump' }],
        frameRate: 10,
      });
    }

    // player 2 animation

    else if (document.getElementById('characterName').innerText == 'Amber') {
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNames('player', {
          prefix: 'p2_walk',
          start: 1,
          end: 4,
          zeroPad: 2,
        }),
        frameRate: 3,
        repeat: -1,
      });

      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNames('player', {
          prefix: 'p2_walk',
          start: 5,
          end: 8,
          zeroPad: 2,
        }),
        frameRate: 3,
        repeat: -1,
      });

      // idle with only one frame, so repeat is not neaded
      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('player', {
          prefix: 'p2_walk',
          start: 1,
          end: 2,
          zeroPad: 2,
        }),
        // frames: [{key: 'player', frame: 'p1_stand02'}],
        frameRate: 2,
        repeat: -1,
      });

      this.anims.create({
        key: 'jump',
        frames: [{ key: 'player', frame: 'p2_jump02' }],
        frameRate: 10,
      });
    }

    // player 3 animation

    else if (document.getElementById('characterName').innerText == 'Garrett') {
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNames('player', {
          prefix: 'p3_walk',
          start: 1,
          end: 4,
          zeroPad: 2,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNames('player', {
          prefix: 'p3_walk',
          start: 5,
          end: 8,
          zeroPad: 2,
        }),
        frameRate: 10,
        repeat: -1,
      });

      // idle with only one frame, so repeat is not neaded
      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('player', {
          prefix: 'p3_stand',
          start: 1,
          end: 2,
          zeroPad: 2,
        }),
        
        frameRate: 2,
        repeat: -1,
      });

      this.anims.create({
        key: 'jump',
        frames: [{ key: 'player', frame: 'jump' }],
        frameRate: 10,
      });
    }

    //INPUT
    this.cursors = this.input.keyboard.createCursorKeys();



    //COLLECTING COINS
    this.coins = this.physics.add.group({
      key: 'coin',
      repeat: 9,
      setXY: { x: 12, y: 0, stepX: 70 },
      // immovable: true

    });

    this.coins.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.enemies = this.physics.add.group();

    
    
    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.coins, this.platforms);
    this.physics.add.collider(this.enemies, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectCoin function
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    this.physics.add.collider(this.player, this.enemies, this.hitBomb, null, this);
   

    //CAMERA

    // make the camera follow the player
    // this.cameras.main.startFollow(this.player);

  }

  update(time, delta) {

    //player 1 controls
    if (document.getElementById('characterName').innerText == 'Aaron') {
      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-200);
        this.player.anims.play('left', true);
        this.player.flipX = false;
      } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(200);
        this.player.anims.play('right', true);
        this.player.flipX = false;
      }
      // && this.player.body.onFloor()
      else if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-500); //jump up
        this.player.anims.play('jump', true);
        this.player.flipX = false;
      } else {
        this.player.body.setVelocityX(0);
        this.player.anims.play('idle', true);
      }
    }
    
    //player 2 controls
    else if (document.getElementById('characterName').innerText == 'Amber') {
      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-200);
        this.player.anims.play('left', true);
        this.player.flipX = false;
      } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(200);
        this.player.anims.play('right', true);
        this.player.flipX = false;
      }
      // && this.player.body.onFloor()
      else if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-500); //jump up
        this.player.anims.play('jump', true);
        this.player.flipX = false;
      } else {
        this.player.body.setVelocityX(0);
        this.player.anims.play('idle', true);
      }
    }
    //player 3 controls
    else if (
      document.getElementById('characterName').innerText == 'Garrett'
    ) {
      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-200);
        this.player.anims.play('left', true);
        this.player.flipX = false;
      } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(200);
        this.player.anims.play('right', true);
        this.player.flipX = false;
      }
      // && this.player.body.onFloor()
      else if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-500); //jump up
        this.player.anims.play('jump', true);
        this.player.flipX = false;
      } else {
        this.player.body.setVelocityX(0);
        this.player.anims.play('idle', true);
      }
    }

  }

  //OUR METHODS

  setScore() {
    document.getElementById('score').innerHTML = this.score.toString();
  }

  setAssessComp() {

    document.getElementById('assess-comp').innerText = (this.assessment += 16).toString();
  }

  setAssessCompTwo(){

    document.getElementById('assess-comp').innerText = (this.assessment += 14).toString();
  }

  collectNicole() {
    this.nicoleSound.play();
    this.score += 10;
    this.setScore();
    // this.scoreText.setText('Score: ' + this.score);
    this.movingPlatform.destroy();

  }

  collectCoin(player: any, coin: any) {
    this.coinSound.play();
    coin.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    this.setScore();
    // this.scoreText.setText('Score: ' + this.score);

    if (this.coins.countActive(true) === 2) {
      //  A new batch of stars to collect
      this.coins.children.iterate(function (child) {

        child.enableBody(true, child.x, 0, true, true);

      });

      let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);


    }
    //LEVEL 1 - HTML & CSS
    if (this.score == 80) {
     
      this.setAssessComp();
      this.assessComplete.play();
      this.assessText.setText('Current Assessment: ' + this.assessScore)
      
      

      this.movingPlatform = this.physics.add.image(16, 500, 'nicole');
      this.movingPlatform.setImmovable(true);
      this.movingPlatform.body.allowGravity = false;
      this.movingPlatform.setVelocityX(50);
      this.physics.add.overlap(this.player, this.movingPlatform, this.collectNicole, null, this);

      let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      let bomb2 = this.enemies.create(x, 16, 'bomb');
      bomb2.setBounce(1);
      bomb2.setCollideWorldBounds(true);
      bomb2.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb2.allowGravity = false;

      let bomb2One = this.enemies.create(x, 16, 'bomb-1');
      bomb2One.setBounce(1);
      bomb2One.setCollideWorldBounds(true);
      bomb2One.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb2One.allowGravity = false;
    }
    //LEVEL 2 - JAVASCRIPT
    else if (this.score == 160) {
      this.assessComplete.play();
      
      this.setAssessCompTwo();
      this.assessScore++
      this.assessText.setText('Current Assessment: ' + this.assessScore)
      

      let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      let bomb2 = this.enemies.create(x, 16, 'bomb2');

      bomb2.setBounce(1);
      bomb2.setCollideWorldBounds(true);
      bomb2.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb2.allowGravity = false;


    }

    //LEVEL 3 - DOM

   else if (this.score == 240) {
      this.assessComplete.play();
      
      this.setAssessCompTwo();
      this.assessScore++
      this.assessText.setText('Current Assessment: ' + this.assessScore)
     

      let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      let bomb2 = this.enemies.create(x, 16, 'bomb3');
      
      bomb2.setBounce(1);
      bomb2.setCollideWorldBounds(true);
      bomb2.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb2.allowGravity = false;
    }
    //LEVEL 4 - TYPESCRIPT
    else if (this.score == 320) {
      this.assessComplete.play();
      this.setAssessCompTwo();

      this.assessScore++
      this.assessText.setText('Current Assessment: ' + this.assessScore)
    
      let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      let bomb2 = this.enemies.create(x, 16, 'bomb4');
      bomb2.setBounce(1);
      bomb2.setCollideWorldBounds(true);
      bomb2.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb2.allowGravity = false;
    }

    //LEVEL 5 -ANGULAR

    else if (this.score == 400) {
      this.assessComplete.play();
      
      this.setAssessCompTwo();
      this.assessScore++
      this.assessText.setText('Current Assessment: ' + this.assessScore)
      

      let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      let bomb2 = this.enemies.create(x, 16, 'bomb5');

      this.movingPlatform = this.physics.add.image(16, 300, 'nicole');
      this.movingPlatform.setImmovable(true);
      this.movingPlatform.body.allowGravity = false;
      this.movingPlatform.setVelocityX(50);
      this.physics.add.overlap(this.player, this.movingPlatform, this.collectNicole, null, this);

      
      bomb2.setBounce(1);
      bomb2.setCollideWorldBounds(true);
      bomb2.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb2.allowGravity = false;
    }

    //LEVEL 6 - NODE & EXPRESS

    else if (this.score == 480) {
      this.assessComplete.play();
      
      this.setAssessCompTwo();
      this.assessScore++
      this.assessText.setText('Current Assessment: ' + this.assessScore)
      

      let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      let bomb2 = this.enemies.create(x, 16, 'bomb6');
      bomb2.setBounce(1);
      bomb2.setCollideWorldBounds(true);
      bomb2.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb2.allowGravity = false;
    }

    //LEVEL 7 - SQL

    else if (this.score == 560) {
      this.assessComplete.play();
     
      this.setAssessCompTwo();
      this.assessScore++
      this.assessText.setText('Current Assessment: ' + this.assessScore)
      

      let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      let bomb2 = this.enemies.create(x, 16, 'bomb7');
      bomb2.setBounce(1);
      bomb2.setCollideWorldBounds(true);
      bomb2.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb2.allowGravity = false;
    }

  else if(this.score == 640){

    
    this.assessComplete.play();
    
    this.assessText.setText('Demo Day ')
    // this.platforms.destroy();
    // this.coins.destroy();
    // this.movingPlatform.destroy();
    // this.enemies.destroy();
  }

  }


  onEvent() {
    

  }

  hitBomb(player, bomb) {
    
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play('jump');
    this.music.stop();
    
    this.failSound.play();

    setTimeout(() => {
    document.getElementById('show-grace').style.display = "flex"; 
    document.getElementById('form').style.display = "flex";
    this.loadScreen.play();
    }, 1000);

    

  }


  getScore() {

    document.getElementById('score').innerText = this.score.toString();
  }

  

}
