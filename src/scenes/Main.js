import Phaser from 'phaser'
import bg1img from '../assets/bg-s/bg1-animated/1.png'
import bg2img from '../assets/bg-s/bg1-animated/2.png'
import bg3img from '../assets/bg-s/bg1-animated/3.png'
import bg4img from '../assets/bg-s/bg1-animated/4.png'
import Params from '../params'
import {player1animations, player1images} from '../actions/player1animations'
import Lvl1 from './Lvl1'

export default class MainMenu extends Phaser.Scene{
    constructor(){
        super({key : 'MainMenu'})
        this.counter = 0
    }
    preload(){
        player1images(this)
        this.load.image('bg1-animated-1', bg1img)
        this.load.image('bg1-animated-2', bg2img)
        this.load.image('bg1-animated-3', bg3img)
        this.load.image('bg1-animated-4', bg4img)
    }
    create(){
        player1animations(this)
        //background
        this.background = this.add.sprite(Params.width/2, Params.height/2, 'bg1-animated-1').play('bg1-anim')
        this.background.displayHeight = Params.height
        this.background.displayWidth = Params.width
        this.playText = "PLAY";
        this.joinText = "Join session";
        this.controlsText = "Controlls";
        this.playStyle = { 
            font: "65px Arial", 
            color: "#00ff44",
        };
        this.play = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 3, this.playText, this.playStyle).setOrigin(.5,.5);
        this.play.setInteractive({ useHandCursor: true  })
        this.play.on('pointerover',() => {
            this.play.setShadow( 5 , 5 , `#${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}`)
            this.play.hover = true
        })
        this.play.on('pointerout',() => this.play.hover = false)
        this.play.on('pointerdown',()=>{
            this.scene.start('Lvl1')
        })
        this.controls = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, this.controlsText, this.playStyle).setOrigin(.5,.5);
        this.controls.setInteractive({ useHandCursor: true  })
        this.controls.on('pointerover',() => {
            this.controls.setShadow( 5 , 5 , `#${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}`)
            this.controls.hover = true
        })
        this.controls.on('pointerout',() => this.controls.hover = false)
        this.controls.on('pointerdown',()=>{
            
        })
        this.join = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 1.5, this.joinText, this.playStyle).setOrigin(.5,.5);
        this.join.setInteractive({ useHandCursor: true  }   )
        this.join.on('pointerover',() => {
            this.join.setShadow( 5 , 5 , `#${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}`)
            this.join.hover = true
        })
        this.join.on('pointerout',() => this.join.hover = false)
        this.join.on('pointerdown',()=>{
            
        })
    }
    update(){
        this.counter++
        if (this.play.hover) {
            this.counter%10 === 0  && this.play.setShadow( 5 , 5 , `#${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}`)
        }
        !this.play.hover && this.play.setShadow( 0 , 0 , `#${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}`)
        if (this.controls.hover) {
            this.counter%10 === 0  && this.controls.setShadow( 5 , 5 , `#${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}`)
        }
        !this.controls.hover && this.controls.setShadow( 0 , 0 , `#${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}`)
        if (this.join.hover) {
            this.counter%10 === 0  && this.join.setShadow( 5 , 5 , `#${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}`)
        }
        !this.join.hover && this.join.setShadow( 0 , 0 , `#${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}`)
    }
}