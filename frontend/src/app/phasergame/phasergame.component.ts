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
  charPhysics: any;

   getHighScore(){
      
      return document.getElementById('high-score').innerHTML;
    }

    getUniqueId(){

      return document.getElementById('unique-id').innerHTML;
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
  
  closePhaserInstance(){
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
  groundTiles: any;
  text: any;
  coinTiles: any;
  score = 0;
  music:any;
  sprite: any;
  timerText: any;
  timedEvent: any;
  winText: any;
  phaserGame: Phaser.Game;


  constructor(private gameInfoService: GameinfoService, private route : Router) {
    super({ key: 'main' });
   

  }

 
  getSelectedPlayer() {
    return this.gameInfoService.selectedCharacter;
  }

  preload() {
    
    if (document.getElementById('characterName').innerText == 'Aaron') {
     
      // map made with Tiled in JSON format
      this.load.tilemapTiledJSON('map', './assets/map.json');
      // tiles in spritesheet
      this.load.spritesheet('tiles', './assets/tiles.png', {
        frameWidth: 70,
        frameHeight: 70,
      });
      // simple coin image
      this.load.atlas(
        'coin',
        './assets/jacob_coin.png',
        'assets/jacob_coin.json'
      );
      // player animations
      this.load.atlas('player', './assets/Aaron.png', 'assets/Aaron.json');

      // this.load.image('sky', './assets/sky.png');
    } else if (document.getElementById('characterName').innerText == 'Amber') {
    
      // map made with Tiled in JSON format
      this.load.tilemapTiledJSON('map', './assets/map.json');
      // tiles in spritesheet
      this.load.spritesheet('tiles', './assets/tiles.png', {
        frameWidth: 70,
        frameHeight: 70,
      });
      // simple coin image
      this.load.atlas(
        'coin',
        './assets/jacob_coin.png',
        'assets/jacob_coin.json'
      );
      // player animations
      this.load.atlas('player', './assets/Amber.png', 'assets/Amber.json');
    } else if (
      document.getElementById('characterName').innerText == 'Garrett'
    ) {
      
      // map made with Tiled in JSON format
      this.load.tilemapTiledJSON('map', './assets/map.json');
      // tiles in spritesheet
      this.load.spritesheet('tiles', './assets/tiles.png', {
        frameWidth: 70,
        frameHeight: 70,
      });
      // simple coin image
      this.load.atlas(
        'coin',
        './assets/jacob_coin.png',
        'assets/jacob_coin.json'
      );
      // player animations
      this.load.atlas('player', './assets/Garrett.png', 'assets/Garrett.json');
    }

    //loading music
    this.load.audio('level1', [
      'assets/level_2.ogg',
      'assets/level_2.mp3'
  ])
  }

  create() {
    //timer
    this.timerText = this.add.text(20, 100, '');
    this.timedEvent = this.time.delayedCall(10000, this.onEvent, []);
    this.timerText.setScrollFactor(0);

    this.add.image(400, 300, 'sky');
    // load the map
    this.map = this.make.tilemap({ key: 'map' });

    // tiles for the ground layer
    this.groundTiles = this.map.addTilesetImage('tiles');
    // create the ground layer
    this.groundLayer = this.map.createDynamicLayer(
      'World',
      this.groundTiles,
      0,
      0
    );
    // the player will collide with this layer
    this.groundLayer.setCollisionByExclusion([-1]);

    // coin image used as tileset
    this.coinTiles = this.map.addTilesetImage('coin');
   
    // this.tile = this.coinTiles;
    // add coins as tiles
    this.coinLayer = this.map.createDynamicLayer('Coins', this.coinTiles, 0, 0);

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // create the player sprite
    if (document.getElementById('characterName').innerText == 'Aaron') {
      this.player = this.physics.add.sprite(10, 0, 'player');
    } else if (document.getElementById('characterName').innerText == 'Amber') {
      this.player = this.physics.add.sprite(10, 30, 'player');
    } else if (
      document.getElementById('characterName').innerText == 'Garrett'
    ) {
      this.player = this.physics.add.sprite(10, 0, 'player');
    }

    this.player.setBounce(0.2); // our player will bounce from items
    this.player.setCollideWorldBounds(true); // don't go out of the map
    this.sprite = this.player;
    // small fix to our player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width, this.player.height - 8);

    //player will collide with the level tiles
    this.physics.add.collider(this.groundLayer, this.player);

    this.coinLayer.setTileIndexCallback(17, this.collectCoin, this);
    // when the player overlaps with a tile with index 17, collectCoin
    // will be called
    this.physics.add.overlap(this.player, this.coinLayer);

    //coin animation

    this.anims.create({
      key: 'coinTurn',
      frames: this.anims.generateFrameNames('coin', {
        prefix: 'coin_turn',
        start: 1,
        end: 2,
        zeroPad: 2,
      }),
      frameRate: 4,
      repeat: -1,
    });

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
        // frames: [{key: 'player', frame: 'p1_stand02'}],
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
          // frames: [{key: 'player', frame: 'p1_stand02'}],
          frameRate: 2,
          repeat: -1,
        });
  
        this.anims.create({
          key: 'jump',
          frames: [{ key: 'player', frame: 'p3_jump' }],
          frameRate: 10,
        });
      } 

    this.cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // set background color, so the sky is not black
    this.cameras.main.setBackgroundColor('#ccccff');

    this.text = this.add.text(20, 570, '0', {
      fontSize: '20px',
      fill: '#ffffff',
    });
    this.text.setScrollFactor(0);

    //playing music
    this.music = this.sound.add('level1', {volume: 0.3});
    // this.music.play();
  }

  update(time, delta) {
    // this.getSelectedPlayer().speed

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

    //TIMER
    this.timerText.setText(
      'Time: ' + this.timedEvent.getProgress().toString().substr(0, 4)
    );
  }

  onEvent() {
    // this.player.pause()
    // this.winText = this.add.text(100,100, 'YOU WIN!!');
    // this.phaserGame.destroy(true);
  }

  collectCoin(sprite, tile) {
    this.coinLayer.removeTileAt(tile.x, tile.y);
    this.score++;
    document.getElementById('high-score').innerHTML = this.score.toString();
    this.text.setText(this.score);
  
    return false;
  }

}
