import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { GameinfoService } from '../service/gameinfo.service';



@Component({
  selector: 'app-phasergame',
  templateUrl: './phasergame.component.html',
  styleUrls: ['./phasergame.component.css']
})
export class PhasergameComponent implements OnInit {

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

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
    this.getPhysics();

  }
  // tslint:disable-next-line:typedef
  getPhysics() {
    this.gameInfoService.getCharInfo().subscribe(response => {
      this.charPhysics = response;
      console.log(response);
    });
  }

}


class MainScene extends Phaser.Scene {

  map: any;
  player: any;
  cursors: any;
  // tslint:disable-next-line:semicolon
  groundLayer: any;
  coinLayer: any;
  groundTiles: any;
  text: any;
  coinTiles: any;
  score: any;
   

  constructor(private gameInfoService: GameinfoService) {

    super({ key: 'main' });


  }

  getSelectedPlayer() {
    return this.gameInfoService.selectedCharacter;
  }

  preload() {
    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', './assets/map.json');
    // tiles in spritesheet 
    this.load.spritesheet('tiles', './assets/tiles.png', { frameWidth: 70, frameHeight: 70 });
    // simple coin image
    this.load.image('coin', './assets/coinGold.png');
    // player animations
    this.load.atlas('player', './assets/player.png', 'assets/player.json');
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
    // add coins as tiles
    this.coinLayer = this.map.createDynamicLayer('Coins', this.coinTiles, 0, 0);

    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, 'player');
    this.player.setBounce(0.2); // our player will bounce from items
    this.player.setCollideWorldBounds(true); // don't go out of the map    

    // small fix to our player images, we resize the physics body object slightly
    this.player.body.setSize(this.player.width, this.player.height - 8);

    //player will collide with the level tiles 
    this.physics.add.collider(this.groundLayer, this.player);

    this.coinLayer.setTileIndexCallback(17, this.collectCoin(), this);
    // when the player overlaps with a tile with index 17, collectCoin 
    // will be called    
    this.physics.add.overlap(this.player, this.coinLayer);

    // player walk animation
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('player', { prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2 }),
      frameRate: 10,
      repeat: -1
    });

    // idle with only one frame, so repeat is not neaded
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'player', frame: 'p1_stand' }],
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

  // tslint:disable-next-line:typedef
  update(time, delta) {
    if (this.cursors.left.isDown)
    {
        this.player.body.setVelocityX(-this.getSelectedPlayer().speed); // move left
        this.player.anims.play('walk', true); // play walk animation
        this.player.flipX= true; // flip the sprite to the left
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(this.getSelectedPlayer().speed); // move right
        this.player.anims.play('walk', true); // play walk animatio
        this.player.flipX = false; // use the original sprite looking to the right
    } else {
        this.player.body.setVelocityX(this.getSelectedPlayer().speed);
        this.player.anims.play('idle', true);
    }
  }

  // tslint:disable-next-line:typedef
  collectCoin() {
    //this.coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    console.log('ran into coin');
    /*this.score++; // increment the score
    this.text.setText(this.score); // set the text to show the current score*/
    return false;
  }
}


