// handsfree
import p1run1 from '../assets/models/player1/run/beg1.png'
import p1run2 from '../assets/models/player1/run/beg2.png'
import p1run3 from '../assets/models/player1/run/beg3.png'
import p1run4 from '../assets/models/player1/run/beg4.png'
import p1stay from '../assets/models/player1/stay.png'
import p1jump from '../assets/models/player1/prig.png'
// 
// default gun
import p1defgrun from '../assets/models/player1-defaultGun/run/run.png'
import p1defgstay1 from '../assets/models/player1-defaultGun/stand/s1.png'
import p1defgstay2 from '../assets/models/player1-defaultGun/stand/s2.png'
import p1defgjump from '../assets/models/player1-defaultGun/prig.png'
/*pick*/ import p1defgrunpick1 from '../assets/models/player1-defaultGun/pick/1.png'
/*pick*/ import p1defgrunpick2 from '../assets/models/player1-defaultGun/pick/2.png'
/*pick*/ import p1defgrunpick3 from '../assets/models/player1-defaultGun/pick/3.png'
/*pick*/ import p1defgrunpick4 from '../assets/models/player1-defaultGun/pick/4.png'
/*pick*/ import p1defgrunpick5 from '../assets/models/player1-defaultGun/pick/5.png'
/*pick*/ import p1defgrunpick6 from '../assets/models/player1-defaultGun/pick/6.png'
//

const player1images = (scene) => {
    scene.load.spritesheet('p1defgrun', p1defgrun,{frameWidth: 44, frameHeight: 73})
    scene.load.image('p1defgstay2', p1defgstay2)
    scene.load.image('p1defgstay1', p1defgstay1)
    scene.load.image('p1defgjump', p1defgjump)
    scene.load.image('p1jump', p1jump)
    scene.load.image('p1stay', p1stay)
    scene.load.image('p1run1', p1run1)
    scene.load.image('p1run2', p1run2)
    scene.load.image('p1run3', p1run3)
    scene.load.image('p1run4', p1run4)
    scene.load.image('p1defgrunpick1', p1defgrunpick1)
    scene.load.image('p1defgrunpick2', p1defgrunpick2)
    scene.load.image('p1defgrunpick3', p1defgrunpick3)
    scene.load.image('p1defgrunpick4', p1defgrunpick4)
    scene.load.image('p1defgrunpick5', p1defgrunpick5)
    scene.load.image('p1defgrunpick6', p1defgrunpick6)
}
const player1animations = (scene) => {
scene.anims.create({key:'p1stay', frames : [{key: 'p1stay'}]})
scene.anims.create({key:'p1jump', frames : [{key: 'p1jump'}]})
scene.anims.create({
        key: 'p1run',
        frames: [
            {key: 'p1run1'}, {key: 'p1run2'}, {key: 'p1run3'}, {key: 'p1run4'},
           ],
        frameRate:10,
        repeat: -1
    })
scene.anims.create({
        key: 'p1defgstay',
        frames: [
            {key: 'p1defgstay1'}, {key: 'p1defgstay2'}
           ],
        frameRate:10,
        repeat: -1
    })
scene.anims.create({
        key: 'p1defgpick',
        frames: [
            {key: 'p1defgrunpick1'}, {key: 'p1defgrunpick2'}, {key: 'p1defgrunpick3'}, {key: 'p1defgrunpick4'}, {key: 'p1defgrunpick5'}, {key: 'p1defgrunpick6'}
           ],
        frameRate:10,
        repeat: 0
    })
scene.anims.create({
        key: 'p1defgrun',
        frames: 
            scene.anims.generateFrameNumbers('p1defgrun', { start: 0, end: 2 })
           ,
        frameRate:10,
        repeat: -1
    })
scene.anims.create({key:'p1defgjump', frames : [{key: 'p1defgjump'}]})
}

export {player1animations, player1images}
