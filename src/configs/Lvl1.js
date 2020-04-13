import Phaser from 'phaser'
import playerActions from '../actions/bindPlayerActions'
import bg1img from '../assets/bg-s/bg1-animated/1.png'
import bg2img from '../assets/bg-s/bg1-animated/2.png'
import bg3img from '../assets/bg-s/bg1-animated/3.png'
import bg4img from '../assets/bg-s/bg1-animated/4.png'
import p1run1 from '../assets/models/player1/run/beg1.png'
import p1run2 from '../assets/models/player1/run/beg2.png'
import p1run3 from '../assets/models/player1/run/beg3.png'
import p1run4 from '../assets/models/player1/run/beg4.png'
import p1stay from '../assets/models/player1/stay.png'
import p1jump from '../assets/models/player1/prig.png'
import ground from '../assets/world/ground.png'
import wireX from '../assets/world/wireX.png'
import Params from '../params'

class Lvl1 extends Phaser.Scene {
    constructor(){
        super({key : 'Lvl1'})
    }
    preload() {
        this.load.image('p1jump', p1jump)
        this.load.image('p1stay', p1stay)
        this.load.image('p1run1', p1run1)
        this.load.image('p1run2', p1run2)
        this.load.image('p1run3', p1run3)
        this.load.image('p1run4', p1run4)
        this.load.image('bg1-animated-1', bg1img)
        this.load.image('bg1-animated-2', bg2img)
        this.load.image('bg1-animated-3', bg3img)
        this.load.image('bg1-animated-4', bg4img)
        this.load.image('ground', ground)
        this.load.image('wireX', wireX)
    }
    create(){
        //animations
        this.anims.create({key:'p1stay', frames : [{key: 'p1stay'}]})
        this.anims.create({key:'p1jump', frames : [{key: 'p1jump'}]})
        this.anims.create({
            key: 'bg1-anim',
            frames: [
                {key: 'bg1-animated-1'}, {key: 'bg1-animated-2'}, {key: 'bg1-animated-3'}, {key: 'bg1-animated-4'},
            ],
            frameRate:8,
            repeat: -1
        })
        this.anims.create({
            key: 'p1run',
            frames: [
                {key: 'p1run1'}, {key: 'p1run2'}, {key: 'p1run3'}, {key: 'p1run4'},
            ],
            frameRate:10,
            repeat: -1
        })
        //background
        this.background = this.add.sprite(Params.width/2, Params.height/2, 'bg1-animated-1').play('bg1-anim')
        this.background.displayHeight = Params.height
        this.background.displayWidth = Params.width
        //platforms group
        this.platforms = this.physics.add.staticGroup()
        //platforms
        this.ground = this.add.rectangle(0, Params.height - 23, 10000, 46, 0x008c00)
        this.platforms.add(this.ground)
        this.platforms.createFromConfig({key : 'wireX', setXY : { x: 300, y: Params.height - 300 }})
        this.platforms.createFromConfig({key : 'wireX', setXY : { x: 600, y: Params.height - 150 }})
        // player
        this.player = this.physics.add.sprite(50, Params.height - 100, 'p1stay')
        this.player.setCollideWorldBounds(true)
        this.a = this.input.keyboard.addKey('A')
        this.d = this.input.keyboard.addKey('D')
        this.w = this.input.keyboard.addKey('W')
        //keys
        this.cursor = this.input.keyboard.createCursorKeys()
    }
    update(){
        playerActions(this.player, this.platforms, this, {
            keyUp : this.w,
            keyLeft : this.a,
            keyRight : this.d,
        }, {
            actRun : 'p1run',
            actJump : 'p1jump',
            actStay : 'p1stay',
        })
    }
}


export default Lvl1