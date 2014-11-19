var outside1State = new Kiwi.State('outside1State');

outside1State.create = function()
{
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['outside1'], 0, 0, true);
    createCharacter(this);
    this.addChild(this.background);
    this.addChild(this.character);
}

outside1State.update = function()
{
	Kiwi.State.prototype.update.call(this);
	if (this.downKey.isDown)
    {
        if (this.character.animation.currentAnimation.name != ('crouch' + this.facing))
            this.character.animation.play('crouch' + this.facing);
        }
        else if (this.leftKey.isDown) 
        {
            this.facing = 'left';
            if (this.character.transform.x > 3)
                this.character.transform.x-=3;
            if (this.character.animation.currentAnimation.name != 'moveleft')
                this.character.animation.play('moveleft');
            if (this.character.transform.x == 3)
            {
                x = 573;
                this.game.states.switchState("outside0State");
            }
        }
        else if (this.rightKey.isDown) 
        {
            this.facing = 'right';
            if (this.character.transform.x < 573)
                this.character.transform.x+=3;
            if (this.character.animation.currentAnimation.name != 'moveright')
                this.character.animation.play('moveright');
            if (this.character.transform.x == 573)
            {
                x = 3;
                this.game.states.switchState("outside2State");
            }
        }
        else 
        {
            if (this.character.animation.currentAnimation.name != 'idle' + this.facing)
                this.character.animation.play('idle' + this.facing);
        }
    }

outside1State.onPress = function(key)
{
    var x = this.character.transform.x;
    if(key == Kiwi.Input.Keycodes.SPACEBAR) 
    {
        console.log(x);
        var interact = (x > 354 && x < 384 && this.facing == 'right') || 
                       (x > 384 && x < 414 && this.facing == 'left');
        if (interact)
        {
            alert("Interacting");
        }
    }
}