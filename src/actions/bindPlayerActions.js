const playerActions = (player, collisionObj, scene, {keyRight, keyLeft, keyUp},{actRun, actStay, actJump},speedX=200, speedY=500) => {
        player.setVelocityX(0)
        player.onPlatform = (scene.physics.world.collide(player, collisionObj) && player.body.blocked.down)
        console.log(player.body)
        if ( keyRight.isDown ){
            player.flipX = 0
            player.setVelocityX(speedX)
            if (player.onPlatform && (player.anims.currentAnim == null || player.anims.currentAnim.key !== actRun ))player.anims.play(actRun)
        }else if( keyLeft.isDown ){
            player.flipX = 1
            player.setVelocityX(-speedX)
            if (player.onPlatform && (player.anims.currentAnim == null || player.anims.currentAnim.key !== actRun )) player.anims.play(actRun)
        } else {
            if (player.onPlatform) player.anims.play(actStay)
        }
        if(keyUp.isDown && player.onPlatform){
            player.setVelocityY(-speedY)
            player.anims.play(actJump)
        }
        if(!player.onPlatform){
            player.anims.play(actJump)
        }
        player.setOffset(Math.abs((player.frame.realWidth - player.body.width)/2),-Math.abs((player.frame.realHeight - player.body.height)/2))
}

export default playerActions