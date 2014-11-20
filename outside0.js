var outside0State = new Kiwi.State('outside0State');

outside0State.create = function()
{
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['outside0'], 0, 0, true);
    createCharacter(this);
    this.addChild(this.background);
    this.addChild(this.character);
    //Adding text
    this.text1 = new Kiwi.Plugins.GameObjects.BitmapText(this, this.textures['textAtlas'], 
        "Hey look!    This is a    text box.", 66, 198);
    this.addChild(this.text1);
    this.text1.maxWidth = 210;
    this.text1.alphabeticalCells['.'] = 63;
    this.text1.alphabeticalCells['!'] = 62;
    this.text1.alphabeticalCells['$'] = 64;
    this.text1.alphabeticalCells['#'] = 65;
    this.text1.alphabeticalCells[' '] = 66;
    this.text1.scaleX = 0.8;
    this.text1.scaleY = 0.8;
    this.text1.alpha = 0;
}

outside0State.update = function()
{
	Kiwi.State.prototype.update.call(this);
    //if (this.space.isDown)
    //{
    //    document.write("Interacting");
    //}
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
            this.game.states.switchState("outside1State");
        }
    }
    else 
    {
        if (this.character.animation.currentAnimation.name != 'idle' + this.facing)
            this.character.animation.play('idle' + this.facing);
    }
}

outside0State.onPress = function(key)
{
    var x = this.character.transform.x;
    if(key == Kiwi.Input.Keycodes.SPACEBAR) 
    {
        console.log(x);
        var interact = (x > 354 && x < 384 && this.facing == 'right') || 
                       (x > 384 && x < 414 && this.facing == 'left');
        if (interact)
        {
            this.text1.alpha = 1;
            alert("Interacting");
        }
    }
}