var loadingState = new Kiwi.State('loadingState');

loadingState.preload = function()
{
    Kiwi.State.prototype.preload.call(this);
    this.addImage('outside0', 'outside0.png');
    this.addImage('outside1', 'outside1.png');
    this.addImage('outside2', 'outside2.png');
    this.addSpriteSheet('characterSprite', 'boywalking.png', 64, 64);
    this.addSpriteSheet('textAtlas', 'textAtlas.png', 16, 30, true);
}

loadingState.update = function()
{
    Kiwi.State.prototype.update.call(this);
    this.game.states.switchState("outside0State");
}

loadingState.create = function()
{
    Kiwi.State.prototype.create.call(this);
    this.character = new Kiwi.GameObjects.Sprite(this, this.textures['characterSprite'], 0, 196, true);
    this.game.states.switchState("outside0State");
}