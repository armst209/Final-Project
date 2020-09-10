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

  /*var map;
  var player;
  var cursors;
  var groundLayer, coinLayer;
  var text;*/

  constructor(private gameInfoService: GameinfoService) {

    super({ key: 'main' });

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
    map = this.make.tilemap({ key: 'map' });

    // tiles for the ground layer
    var groundTiles = map.addTilesetImage('tiles');
    // create the ground layer
    groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
    // the player will collide with this layer
    groundLayer.setCollisionByExclusion([-1]);

    // coin image used as tileset
    var coinTiles = map.addTilesetImage('coin');
    // add coins as tiles
    coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);

    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    // create the player sprite    
    player = this.physics.add.sprite(200, 200, 'player');
    player.setBounce(0.2); // our player will bounce from items
    player.setCollideWorldBounds(true); // don't go out of the map    

    // small fix to our player images, we resize the physics body object slightly
    player.body.setSize(player.width, player.height - 8);

    // player will collide with the level tiles 
    this.physics.add.collider(groundLayer, player);

    coinLayer.setTileIndexCallback(17, collectCoin, this);
    // when the player overlaps with a tile with index 17, collectCoin 
    // will be called    
    this.physics.add.overlap(player, coinLayer);

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


    cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(player);

    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#ccccff');
    text = this.add.text(20, 570, '0', {
      fontSize: '20px',
      fill: '#ffffff'
    });
    text.setScrollFactor(0);
  }

  // tslint:disable-next-line:typedef
  update(time, delta) {
    if (cursors.left.isDown) {
      player.body.setVelocityX(-200); // move left
      player.anims.play('walk', true); // play walk animation
      player.flipX = true; // flip the sprite to the left
    }
    else if (cursors.right.isDown) {
      player.body.setVelocityX(200); // move right
      player.anims.play('walk', true); // play walk animatio
      player.flipX = false; // use the original sprite looking to the right
    } else {
      player.body.setVelocityX(0);
      player.anims.play('idle', true);
    }
  }

  collectCoin(sprite, tile) {
    coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    score++; // increment the score
    text.setText(score); // set the text to show the current score
    return false;
  }
}


