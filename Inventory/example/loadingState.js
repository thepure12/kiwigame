var loadingState = new Kiwi.State('loadingState');
var preloader = new Kiwi.State('preloader');

//////////////////////////////////////////////////////
//LOADING ASSETS
preloader.preload = function(){
    Kiwi.State.prototype.preload.call(this);
    this.addImage('loadingImage', 'loadingImage.png', true);

}
preloader.create = function(){
    Kiwi.State.prototype.create.call(this);
    this.game.states.switchState('loadingState');

}

loadingState.preload = function(){
    Kiwi.State.prototype.preload.call(this);
    console.log(this.textures);
    this.game.stage.color = '#E0EDF1';
    this.logo = new Kiwi.GameObjects.StaticImage(this, this.textures['loadingImage'], 150, 50);
    
    this.addChild(this.logo);

    this.logo.alpha = 0;
    this.tweenIn = new Kiwi.Animations.Tween;
    this.tweenIn = this.game.tweens.create(this.logo);
    this.tweenIn.to({ alpha: 1 }, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false);
    this.tweenIn.start();

    ////////////////
    //ASSETS TO LOAD
	this.addImage('background', 'assets/western.png'); 
    this.addSpriteSheet('coin', 'assets/coin.png', 48, 48);
    this.addSpriteSheet('coinsack', 'assets/coinsack.png', 48, 48);
    this.addSpriteSheet('sparkle', 'assets/sparkle.png', 34, 40);
    this.addSpriteSheet('cowboy', 'assets/cowboy.png', 150,99);
    this.addImage('quest', 'assets/quest.png');
    
}
loadingState.update = function(){
    Kiwi.State.prototype.update.call(this);
}

loadingState.create = function(){
    Kiwi.State.prototype.create.call(this);
    console.log("inside create of loadingState");
    this.tweenOut = this.game.tweens.create(this.logo);
    this.tweenOut.to({alpha: 0}, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false);
    this.tweenOut.onComplete(this.switchToMain, this);
    this.tweenOut.start();
}
loadingState.switchToMain = function(){
    this.game.states.switchState('myState');
}
