import Phaser from 'phaser'
import playerActions from '../actions/bindPlayerActions'
import {player1animations, player1images} from '../actions/player1animations'
import bg1img from '../assets/bg-s/bg1-animated/1.png'
import bg2img from '../assets/bg-s/bg1-animated/2.png'
import bg3img from '../assets/bg-s/bg1-animated/3.png'
import bg4img from '../assets/bg-s/bg1-animated/4.png'

import terrain from '../assets/world/atlas/world.png'
import world_nrm from '../assets/world/atlas/world_NRM.jpg'
import nonsolid from '../assets/world/atlas/nonsolid.png'
import nonsolid_nrm from '../assets/world/atlas/nonsolid_NRM.jpg'
import mappy from '../assets/world/atlas/world-tilemap.json'

import gunStore from '../assets/models/gunstore.png'
import img_map from '../assets/1.png'
import Params from '../params'

class Lvl1 extends Phaser.Scene {
    constructor(){
        super({key : 'Lvl1'})
    }
    preload() {
        player1images(this)
        this.load.image('bg1-animated-1', [bg1img,img_map])
        this.load.image('bg1-animated-2', [bg2img,img_map])
        this.load.image('bg1-animated-3', [bg3img,img_map])
        this.load.image('bg1-animated-4', [bg4img,img_map])
        this.load.image('gunStore', [gunStore, img_map])
        //map
        this.load.image('terrain', [terrain,img_map])
        this.load.image('nonsolid', [nonsolid,nonsolid_nrm])
        this.load.tilemapTiledJSON('mappy', mappy)
    }
    create(){
        //preset
        this.physics.world.TILE_BIAS = 32
        this.level = {
            w : 1600,
            h : 1600
        }
        this.physics.world.setBounds(0, 0, this.level.w, this.level.h)
        this.cameras.main.setBounds(0, 0, this.level.w, this.level.h)
        //ui
        this.pressE = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 10, 'Press E to use!').setOrigin(.5,.5).setScrollFactor(0,0).setDepth(10).setVisible(false);
        this.attantionLight = this.lights.addLight(0,0,200,0xffff77,0)
        this.attantionText = this.add.text(this.game.renderer.width / 2, this.game.renderer.height * 3.5 / 4, 'Думаю, это оружие нам понадобится!').setOrigin(.5,.5).setScrollFactor(0,0).setDepth(10).setVisible(false);
        //minimap
        this.moniq = this.cameras.add(this.game.renderer.width / 4, this.game.renderer.height / 8,this.game.renderer.width / 2, this.game.renderer.height / 1.5).setZoom(.5).setOrigin(.5,.5).setVisible(false)
        this.moniq.setBackgroundColor(0x000000).centerOn(24*16, 88*16)
        this.moniq.setBounds(0,0,this.level.w,this.level.h)
        this.moniq.ignore([this.pressE,this.attantionText])
        //lights
        this.lights.enable().setAmbientColor(0x383838)
        this.lamp = this.lights
            .addLight(0, 0, 450)
            .setIntensity(1.5)
        this.input.on('pointermove',(pointer)=>{
            
        })
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
        this.background.setDepth(-5)
        this.background.displayHeight = this.level.h
        this.background.displayWidth = this.level.h*1.3
        this.background.alpha = .15

        this.notTransparentBg = this.add.graphics({
            fillStyle:{
                color: 0x000000
            }
        }).setDepth(-10000)
        this.notTransparentBg.fillRect(0, 0, this.level.w, this.level.h)
        //platforms group
        this.platforms = this.physics.add.staticGroup()
        // player
        this.player = this.physics.add.sprite(50, 150, 'p1stay')
        this.cameras.main.startFollow(this.player, true);
        this.player.setCollideWorldBounds(true)
        this.a = this.input.keyboard.addKey('A')
        this.d = this.input.keyboard.addKey('D')
        this.g = this.input.keyboard.addKey('G')
        this.w = this.input.keyboard.addKey('W')
        this.s = this.input.keyboard.addKey('S')
        this.e = this.input.keyboard.addKey('E')
        //keys
        this.cursor = this.input.keyboard.createCursorKeys()
        //action group
        //still empty   
        this.actionGroup =  this.physics.add.group()
        this.actionGroup.defaults.setCollideWorldBounds = true
        this.actionGroup.defaults.setBounceY = .5
        //map
        this.mappy = this.add.tilemap('mappy')
        this.terrain = this.mappy.addTilesetImage('world', 'terrain')
        this.botLayer = this.mappy.createDynamicLayer('bot', [this.terrain], 0, 0)
        this.physics.add.collider(this.player, this.botLayer)
        this.botLayer.setCollisionBetween(1, 1600, true);
        this.botLayer.setPipeline('Light2D')
        //NONSOLID
        
        this.back = this.mappy.addTilesetImage('nonsolid', 'nonsolid')
        this.backLayer = this.mappy.createDynamicLayer('back', [this.back],0,0)
        this.backLayer.setPipeline('Light2D').setDepth(-1)
        const BackLayerStartIndex = this.backLayer.gidMap.length - this.backLayer.gidMap.filter(v=>v!==undefined).length
        const GunStoreIndexes = [2273,2274,2275,2175,2176,2177].map(v=>v+BackLayerStartIndex)
        const MonitorIndexes = [2402,2403,2404,2353,2354,2355,2255,2256,2257].map(v=>v+BackLayerStartIndex)
        this.backLayer.setTileIndexCallback(GunStoreIndexes, this.pickGun, this)
        this.backLayer.setTileIndexCallback(MonitorIndexes, this.watchMomitor, this)
        this.physics.add.overlap(this.player, this.backLayer)
    }   
    watchMomitor(a,b){
        this.moniq.setVisible(true)
        this.attantionText.setVisible(true) 
        clearTimeout(this.tempTimer)
        this.tempTimer = setTimeout(()=> {
            this.moniq.setVisible(false)
            this.attantionText.setVisible(false)
            this.tempUi!==undefined && this.tempUi.setVisible(false)
        }, 50)
        this.attantionLight.setPosition(24*16, 88*16).setIntensity(1)
        if (this.tempUi === undefined) 
        {
            this.tempUi = this.add.graphics({
                fillStyle:{
                    color: 0x051105,
                }
            })
            this.tempUi.fillRect(this.game.renderer.width / 6, this.game.renderer.height / 15, this.game.renderer.width * 4 / 6, this.game.renderer.height * 13 / 15).setScrollFactor(0,0).setAlpha(.8)
        } else {
            this.tempUi.setVisible(true)
        }
        this.moniq.ignore(this.tempUi)

    }
    pickGun(a,b){
        this.pressE.setVisible(true)
        clearTimeout(this.tempTimer)
        this.tempTimer = setTimeout(()=> this.pressE.setVisible(false), 50)
        if (b.layer !== undefined && b.layer.name === 'back' && a.body.blocked.down && this.e.isDown && (!a.bashed)) {
            a.bashed = true
            a.setVelocityX(0)
            a.anims.play('p1defgpick')
            a.on("animationcomplete", ()=>{
                a.off("animationcomplete")
                a.bashed = false
            })
            if (a.haveGuns && a.haveGuns.every(v=>v!='defaultGun')){
                a.haveGuns.push('defaultGun')
                a.chGun  = 'defaultGun'
            }
            else{
                if (!a.haveGuns) a.haveGuns = ['defaultGun']
                a.chGun  = 'defaultGun'
            }
            // a.play()
        }
        return false
    }
    actions(a,b){
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
        this.lamp.x = this.player.x
        this.lamp.y = this.player.y
        this.physics.world.collide(this.botLayer, this.actionGroup)
        //sinus light intensity 
        this.counter = this.counter!==undefined ? this.counter+1 : 0
        if(this.attantionLight.x !== 0 && this.attantionLight.y !== 0) this.attantionLight.setIntensity(0.5+ Math.abs(Math.sin(this.counter * 0.03))/2)
    }
}


export default Lvl1