import { Component, OnDestroy, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { GameinfoService } from '../service/gameinfo.service';



@Component({
  selector: 'app-phasergame',
  templateUrl: './phasergame.component.html',
  styleUrls: ['./phasergame.component.css']
})
export class PhasergameComponent implements OnInit, OnDestroy {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  charPhysics: any;


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
          debug: false
        }
      },
      audio: {
        disableWebAudio: true
      }
    };
  }

  ngOnDestroy() {
    document.getElementById('characterName').innerText = 'other';
    console.log(document.getElementById('game-area'));
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
    // this.getPhysics();

  }
  // tslint:disable-next-line:typedef
  // getPhysics() {
  //   this.gameInfoService.getCharInfo().subscribe(response => {
  //     this.charPhysics = response;
  //     console.log(response);
  //   });
  // }
}


class MainScene extends Phaser.Scene {

  map: any;
  player: any;
  cursors: any;
  groundLayer: any;
  coinLayer: any;
  groundTiles: any;
  text: any;
  coinTiles: any;
  score = 0;
  sprite: any;


  constructor(private gameInfoService: GameinfoService) {

    super({ key: 'main' });


  }

  getSelectedPlayer() {
    return this.gameInfoService.selectedCharacter;
  }

  preload() {
    console.log(document.getElementById('characterName').innerText)
    if (document.getElementById('characterName').innerText == 'Aaron') {
      console.log('you hit 1')
      // map made with Tiled in JSON format
      this.load.tilemapTiledJSON('map', './assets/map.json');
      // tiles in spritesheet 
      this.load.spritesheet('tiles', './assets/tiles.png', { frameWidth: 70, frameHeight: 70 });
      // simple coin image
      this.load.image('coin', './assets/coinGold.png');
      // player animations
      this.load.atlas('player', './assets/Aaron.png', 'assets/Aaron copy.json');
    }

    else if (document.getElementById('characterName').innerText == 'Amber') {
      console.log('you hit 2')
      // map made with Tiled in JSON format
      this.load.tilemapTiledJSON('map', './assets/map.json');
      // tiles in spritesheet 
      this.load.spritesheet('tiles', './assets/tiles.png', { frameWidth: 70, frameHeight: 70 });
      // simple coin image
      this.load.image('coin', './assets/coinGold.png');
      // player animations
      this.load.atlas('player', './assets/Amber.png', 'assets/Amber.json')
    }
  }



  create() {
    // load the map 
    this.map = this.make.tilemap({ key: 'map' });

    // tiles for the ground layer
    this.groundTiles = this.map.addTilesetImage('tiles');
    // create the ground layer
    this.groundLayer = this.map.createDynamicLayer('World', this.groundTiles, 0, 0);
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
    this.player = this.physics.add.sprite(200, 200, 'player');
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

    // player walk animation 
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNames('player', { prefix: 'p1_walk', start: 1, end: 4, zeroPad: 2 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNames('player', { prefix: 'p1_walk', start: 7, end: 10, zeroPad: 2 }),
      frameRate: 10,
      repeat: -1
    });

    // idle with only one frame, so repeat is not neaded
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'player', frame: 'p1_stand' }],
      frameRate: 10,
    });

    this.anims.create({
      key: 'jump',
      frames: [{ key: 'player', frame: 'jump1' }],
      frameRate: 10,

    });

    this.cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#ccccff');

    this.text = this.add.text(20, 570, '0', {
      fontSize: '20px',
      fill: '#ffffff'
    });
    this.text.setScrollFactor(0);
  }

  update(time, delta) {
    // this.getSelectedPlayer().speed
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.anims.play('left', true);
      this.player.flipX = false;
    }
    else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
      this.player.anims.play('right', true);
      this.player.flipX = false;
    }
    else if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.body.setVelocityY(-500); //jump up
      this.player.anims.play('jump', true);
      this.player.flipX = false;
    }
    else {
      this.player.body.setVelocityX(0);
      this.player.anims.play('idle', true);
    }

  }

  collectCoin(sprite, tile) {

    this.coinLayer.removeTileAt(tile.x, tile.y);
    this.score++;
    this.text.setText(this.score);
    console.log(tile);

    return false;

  }
}


