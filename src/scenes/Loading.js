import Phaser from 'phaser'
import bg1img from '../assets/bg-s/bg1-animated/1.png'
import bg2img from '../assets/bg-s/bg1-animated/2.png'
import bg3img from '../assets/bg-s/bg1-animated/3.png'
import bg4img from '../assets/bg-s/bg1-animated/4.png'
import ground from '../assets/world/ground.png'
import wireX from '../assets/world/wireX.png'
import gunStore from '../assets/models/gunstore.png'
import {player1images} from '../actions/player1animations'
import MainMenu from './Main'

export default class Loading extends Phaser.Scene{
    constructor(){
        super({key : 'Loading'})
    }
    preload(){
        player1images(this)
        this.load.image('bg1-animated-1', bg1img)
        this.load.image('bg1-animated-2', bg2img)
        this.load.image('bg1-animated-3', bg3img)
        this.load.image('bg1-animated-4', bg4img)
        this.load.image('ground', ground)
        this.load.image('wireX', wireX)
        this.load.image('gunStore', gunStore)
        this.text = "Loading...";
        this.style = { font: "65px Arial", fill: "#ff0044"};
        this.t = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 3, this.text, this.style).setOrigin(.5,.5);
        const loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })
        loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width, 50)
        this.load.on('progress', (perc)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * perc, 50)
        })
        this.load.on('complete', ()=>{
            this.scene.start('MainMenu')
        })
    }
}