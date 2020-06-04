import Phaser from 'phaser'

export default class ControlsView extends Phaser.Scene{
    constructor(){
        super({key : 'ControlsView'})
    }
    preload(){

    }
    create(){
        this.container =  this.add.graphics({
            fillStyle:{
                color: 0x051505
            }
        })
        const options = [0,0,this.game.renderer.width,this.game.renderer.height]
        this.container.fillRect(...options).setInteractive(new Phaser.Geom.Rectangle(...options),Phaser.Geom.Rectangle.Contains)
        const text = `
        Controls: \n
        W,A,S,D - Movement control \n
        G - Jump \n
        E - Use  \n
        H - Fire
        `
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2,text).setOrigin(.5,.5)
        this.container.on('pointerdown', ()=>{
            this.scene.stop('ControlsView')
            this.game.scene.getScene('MainMenu').btns.setVisible(true)
        })
    }
}