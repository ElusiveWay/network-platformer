const playerActions = (player, scene, {keyRight, keyLeft, keyUp, keyDown, keyJump},{actRun, actStay, actJump},speedX=200, speedY=500) => {
        player.setVelocityX(0)
        player.onPlatform = (player.body.blocked.down)
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
        if(keyJump.isDown && player.onPlatform){
            player.setVelocityY(-speedY)
            player.anims.play(actJump)
        }
        if(!player.onPlatform){
            player.anims.play(actJump)
        }
        player.setOffset((player.width - player.body.width)/2, 0)
        player.setOrigin(0.5, 0)
    }

export default playerActions