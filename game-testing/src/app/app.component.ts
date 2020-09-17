
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Phaser from 'phaser';
import { GameinfoService } from '../app/service/gameinfo.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  title = 'game-testing';
  value = '';

  closeGameEnd(){

   document.getElementById('form').style.display = "none"
   this.phaserGame.destroy(true);
   location.reload();
  }

  getUniqueIdValue(value : string){ 
    let score = document.getElementById('score').innerHTML;
    this.value = value;
    console.log(this.value);
    console.log(score);
    this.gameInfoService.getUniqueScore(value, parseInt(score)).subscribe(response => {

      console.log(response);
    })
  };

 


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
    // document.getElementById('characterName').innerText = 'Choose Your Character';
    
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
   
  }

}


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
  scoreText: any;
  assessText: any;
  music:any;
  failSound:any;
  loadScreen: any;
  sprite: any;
  timeText:any;
  timedEvent: any;
  timer:any;
  bombs:any;
  bomb:any;
  x:any;
  background: any;

  platforms:any;
  movingPlatform: any;
 
  enemyHitSound: any;
  uniqueId: string;
  winText: any;
  gameOver = false;
  


  constructor(private gameInfoService: GameinfoService, private route : Router) {
    super({ key: 'main' });
  
  
  }



  preload() {
  //loading background
      this.load.image('sky', 'assets/sky.png');

  //loading coins
    this.load.atlas(
      'coin', '../assets/jacob_coin.png', '../assets/jacob_coin.json'
    );
  

    // player animations
    this.load.atlas('player', '../assets/Aaron.png', '../assets/Aaron.json');
 
    //loading platforms
    
    this.load.image('ground', 'assets/platform.png');
    //loads enemies
    
    this.load.image('bomb', 'assets/html.png');
    this.load.image('bomb-1', 'assets/css.png');
    this.load.image('bomb2', 'assets/javascript.png');
    this.load.image('bomb3', 'assets/dom.png');
    this.load.image('bomb4', 'assets/typescript.png');
    this.load.image('nicole', 'assets/nicon.png');
    //loading music
    this.load.audio('level1', [
      'assets/level_2.ogg',
      'assets/level_2.mp3'
    ])
    this.load.audio('tryagain','../assets/arp.wav');
    this.load.audio('loadScreen', '../assets/level_1.mp3')

  }

  create() {

    this.background = this.add.image(400,300, 'sky');
    
     //playing music
     this.music = this.sound.add('level1', {volume: 0.3});
     this.failSound = this.sound.add('tryagain');
     this.loadScreen = this.sound.add('loadScreen');
    //  this.music.play();
 
    this.timeText = this.add.text(720,20, 'Time', { fontSize: '20px', fill: '#222222' });

    this.text = this.add.text(32,32,'');
    this.timedEvent = this.time.delayedCall(3000, this.onEvent, [], this);

  
 
    // this.timerText = this.add.text(20, 0, '', { font: '48px Arial', fill: '#000000' });
    // this.timerText.setScrollFactor(0);

    // this.timer = this.time.addEvent({ delay: 10000, callback: this.onEvent, callbackScope: this });
    this.platforms = this.physics.add.staticGroup();
    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    

     //  Now let's create some ledges
    //  this.platforms.create(600, 400, 'ground');
     this.platforms.create(50, 300, 'ground');
     this.platforms.create(750, 220, 'ground');

    
   

     this.player = this.physics.add.sprite(100, 450, 'player');


    this.player.setBounce(0.2); // our player will bounce from items
    this.player.setCollideWorldBounds(true); // don't go out of the map
  
    // player 1 animation

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
        // frames: [{key: 'player', frame: 'p1_stand02'}],
        frameRate: 2.5,
        repeat: -1,
      });

      this.anims.create({
        key: 'jump',
        frames: [{ key: 'player', frame: 'jump' }],
        frameRate: 10,
      });
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

  this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#000' });
  this.assessText = this.add.text(16,40, 'Assesements Passed: 0', { fontSize: '20px', fill: '#000' })
//  Collide the player and the stars with the platforms
  this.physics.add.collider(this.player, this.platforms);
  this.physics.add.collider(this.coins, this.platforms);
  this.physics.add.collider(this.enemies, this.platforms);
  // this.physics.add.collider(this.player, this.movingPlatform);
  // this.physics.add.collider(this.coins, this.movingPlatform);
 

   //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
   this.physics.add.overlap(this.player, this.coins, this.collectStar, null, this);
   this.physics.add.collider(this.player, this.enemies, this.hitBomb, null, this);
  
  

   
   //CAMERA

  }

  update(time, delta) {
    //MOVING PLATFORM BOUNDARIES
    // if (this.movingPlatform.x >= 500)
    // {
    //     this.movingPlatform.setVelocityX(-75);
    // }
    // else if (this.movingPlatform.x <= 300)
    // {
    //     this.movingPlatform.setVelocityX(75);
    // }


    if (this.gameOver)
    {
        return;
    }

    
    //player 1 controls
   
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

  //OUR METHODS

  setScore(){
    document.getElementById('score').innerHTML = this.score.toString();
  }

  collectNicole(){
    console.log("you hit nicole");
    this.score += 20;
    this.setScore();
    this.scoreText.setText('Score: ' + this.score);
    this.movingPlatform.destroy();

  }

 collectStar (player:any, coin:any)
{
    coin.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    this.setScore();
    this.scoreText.setText('Score: ' + this.score);

    if (this.coins.countActive(true) === 2)
    {
        //  A new batch of stars to collect
        this.coins.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);


    }
   if (this.score == 80) {
     this.assessment++
     this.assessText.setText('Assessments Passed: ' + this.assessment)

     this.movingPlatform = this.physics.add.image(16, 300, 'nicole');
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

   else if (this.score == 160) {
     this.assessment++
     this.assessText.setText('Assessments Passed: ' + this.assessment)


     let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
     let bomb2 = this.enemies.create(x, 16, 'bomb2');
     bomb2.setBounce(1);
     bomb2.setCollideWorldBounds(true);
     bomb2.setVelocity(Phaser.Math.Between(-200, 200), 20);
     bomb2.allowGravity = false;


   }

   else if (this.score == 240) {
     this.assessment++
     this.assessText.setText('Assessments Passed: ' + this.assessment)

     this.movingPlatform = this.physics.add.image(16, 300, 'nicole');
     this.movingPlatform.setImmovable(true);
     this.movingPlatform.body.allowGravity = false;
     this.movingPlatform.setVelocityX(50);
     

     var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
     var bomb2 = this.enemies.create(x, 16, 'bomb3');
     bomb2.setBounce(1);
     bomb2.setCollideWorldBounds(true);
     bomb2.setVelocity(Phaser.Math.Between(-200, 200), 20);
     bomb2.allowGravity = false;
   }

   else if (this.score == 320) {
     this.assessment++
     this.assessText.setText('Assessments Passed: ' + this.assessment)
     var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
     var bomb2 = this.enemies.create(x, 16, 'bomb4');
     bomb2.setBounce(1);
     bomb2.setCollideWorldBounds(true);
     bomb2.setVelocity(Phaser.Math.Between(-200, 200), 20);
     bomb2.allowGravity = false;
   }




}


  onEvent() {
   
    
    // this.player.setTint(0xff0000)
    // this.add.text(20,120, 'YOU LOSE!').setScrollFactor(0);
    // this.phaserGame.destroy(true);
   
  }

  hitBomb ()
  {
    // this.player.setCollideWorldBounds(false);
    document.getElementById('form').style.display = "flex";
    this.music.stop();
    this.failSound.play();
    
    this.physics.pause();
    
    this.player.setTint(0xff0000);
    this.loadScreen.play();

    // this.player.anims.play('idle');

    // this.gameOver = true;
    
  }

  getScore(){

    document.getElementById('score').innerText = this.score.toString();
  }
}
