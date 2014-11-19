var Item = function(state, x, y, texture, t){
	Kiwi.GameObjects.Sprite.call(this, state, texture, x, y);
	
	if(t){
		this.animation.add('play', [0,1,2,3,4,5], 0.1, true);
		this.animation.play('play');
	}

	this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

	this.physics.velocity = new Kiwi.Geom.Point(0,22);
	this.alpha = 1;

	Item.prototype.tween = function(n){
		this.physics.velocity = new Kiwi.Geom.Point(0,0);
		var t = this.game.tweens.create(this);
        t.to({alpha:0}, n, Kiwi.Animations.Tweens.Easing.Linear.None, true);
	}

	Item.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		this.physics.update();

		if(this.y > 600 || this.alpha == 0)
			this.destroy();
	}
}
Kiwi.extend(Item, Kiwi.GameObjects.Sprite);