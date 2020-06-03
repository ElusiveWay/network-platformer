import './style.css'
import MainMenu from './scenes/Main'
import Loading from './scenes/Loading'
import Lvl1 from './scenes/Lvl1'
import Params from './params'

const doc = global.document

//Phaser container
const phas = doc.createElement('div')
phas.id = 'phaser-wrapper'
phas.style.width = "100vw"
phas.style.height = "100vh"
phas.style.display = "flex"
phas.style.justifyContent = "center"
phas.style.alignItems = "center"
phas.style.backgroundColor = "black"
doc.body.appendChild(phas)

//Phaser init

const config = {
    type: Phaser.WEBGL,
    width: Params.width,
    height: Params.height,
    parent:'phaser-wrapper',
    maxLights: 30,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [ Loading, MainMenu, Lvl1 ],
    scale: {
        mode: Phaser.Scale.FIT,
    },
    render: {
        pixelArt : true
    },
    dom: {
        createContainer: true
    },
}

const game = new Phaser.Game(config)