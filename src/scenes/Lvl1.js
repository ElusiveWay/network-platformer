import Phaser from 'phaser'
import playerActions from '../actions/bindPlayerActions'
import {player1animations, player1images} from '../actions/player1animations'
import bg1img from '../assets/bg-s/bg1-animated/1.png'
import bg2img from '../assets/bg-s/bg1-animated/2.png'
import bg3img from '../assets/bg-s/bg1-animated/3.png'
import bg4img from '../assets/bg-s/bg1-animated/4.png'

import terrain from '../assets/world/atlas/map.png'
import mappy from '../assets/world/atlas/world-tilemap.json'

import ground from '../assets/world/ground.png'
import wireX from '../assets/world/wireX.png'
import gunStore from '../assets/models/gunstore.png'
import Params from '../params'

class Lvl1 extends Phaser.Scene {
    constructor(){
        super({key : 'Lvl1'})
    }
    preload() {
        player1images(this)
        this.load.image('bg1-animated-1', bg1img)
        this.load.image('bg1-animated-2', bg2img)
        this.load.image('bg1-animated-3', bg3img)
        this.load.image('bg1-animated-4', bg4img)
        this.load.image('ground', ground)
        this.load.image('wireX', wireX)
        this.load.image('gunStore', gunStore)
        //map
        this.load.image('terrain', terrain)
        this.load.tilemapTiledJSON('mappy', mappy)
    }
    create(){
        this.level = {
            w : 1600,
            h : 1600
        }
        this.physics.world.setBounds(0, 0, this.level.w, this.level.h);
        this.cameras.main.setBounds(0, 0, this.level.w, this.level.h);
        //animations
        player1animations(this)
        this.anims.create({
            key: 'bg1-anim',
            frames: [
                {key: 'bg1-animated-1'}, {key: 'bg1-animated-2'}, {key: 'bg1-animated-3'}, {key: 'bg1-animated-4'},
            ],
            frameRate:8,
            repeat: -1
        })
        //background
        this.background = this.add.sprite(this.level.w/2, this.level.h/2, 'bg1-animated-1').play('bg1-anim')
        this.background.displayHeight = this.level.h
        this.background.displayWidth = this.level.h*1.3
        this.background.alpha = .2
        //platforms group
        this.platforms = this.physics.add.staticGroup()
        // player
        this.player = this.physics.add.sprite(50, this.level.h - 150, 'p1stay')
        this.cameras.main.startFollow(this.player, true);
        this.player.setCollideWorldBounds(true)
        this.a = this.input.keyboard.addKey('A')
        this.d = this.input.keyboard.addKey('D')
        this.g = this.input.keyboard.addKey('G')
        this.w = this.input.keyboard.addKey('W')
        this.s = this.input.keyboard.addKey('S')
        //keys
        this.cursor = this.input.keyboard.createCursorKeys()
        //gun store
        this.actionGroup =  this.physics.add.group()
        this.actionGroup.defaults.setCollideWorldBounds = true
        this.actionGroup.defaults.setBounceY = .5
        this.actionGroup.add(this.add.image(400,this.level.h - 300,'gunStore'))
        //map
        this.mappy = this.add.tilemap('mappy')
        this.terrain = this.mappy.addTilesetImage('map', 'terrain')
        this.botLayer = this.mappy.createStaticLayer('bot', [this.terrain], 0, 0)
        this.physics.add.collider(this.player, this.botLayer)
        this.botLayer.setCollisionBetween(1, 1600, true);
    }   
    actions(a,b){
        const type = b.texture.key
        if (type === 'gunStore') {
            if (a.haveGuns && a.haveGuns.every(v=>v!='defaultGun')){
                a.haveGuns.push('defaultGun')
                a.chGun  = 'defaultGun'
            }
            else{
                if (!a.haveGuns) a.haveGuns = ['defaultGun']
                a.chGun  = 'defaultGun'
            }
            console.log(a.haveGuns)
        }
    }
    update(){
        (!this.player.chGun) && (!this.player.bashed) && playerActions(this.player, this, {
            keyUp : this.w,
            keyLeft : this.a,
            keyRight : this.d,
            keyDown : this.s,
            keyJump : this.g,
        }, {
            actRun : 'p1run',
            actJump : 'p1jump',
            actStay : 'p1stay',
        })
        this.player.chGun === 'defaultGun' && (!this.player.bashed) && playerActions(this.player, this, {
            keyUp : this.w,
            keyLeft : this.a,
            keyRight : this.d,
            keyDown : this.s,
            keyJump : this.g,
        }, {
            actRun : 'p1defgrun',
            actRunTop : 'p1defgruntop',
            actRunBot : 'p1defgrunbot',
            actStay : 'p1defgstay',
            acttStayTop : 'p1defgstaytop',
            acttStayBot : 'p1defgstaybot',
            actJump : 'p1defgjump',
        })
        this.physics.world.collide(this.botLayer, this.actionGroup)
        this.physics.world.overlap(this.player, this.actionGroup, this.actions)
    }
}


export default Lvl1