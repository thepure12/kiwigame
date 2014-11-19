var myGame = new Kiwi.Game();

var myState = new Kiwi.State('myState');

myState.create = function(){
	Kiwi.State.prototype.create.call(this);

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['background'], 0, 0);

    this.addChild(this.background);

    this.cowboy = new Kiwi.GameObjects.Sprite(this, this.textures['cowboy'], 200, 274);
    this.cowboy.animation.add('idle', [0], 0.1, false);
    this.cowboy.animation.add('move', [1,2,3,4,5,6], 0.1,true);
    this.cowboy.animation.play('idle');
    this.addChild(this.cowboy);
    this.cowboy.box.hitbox = new Kiwi.Geom.Rectangle(48,37,27,75);

    this.cowboy.inventory = Kiwi.Plugins.InventoryManager;
    this.cowboy.inventory.createItem('coin');
    this.cowboy.inventory.createItem('bag');
    this.cowboy.inventory.addVariable('money', 0);
    this.cowboy.inventory.setItemVariable('coin', 'money', 1);
    this.cowboy.inventory.setItemVariable('bag', 'money', 5);

    this.quest = Kiwi.Plugins.QuestManager;
    this.quest.createQuest('collect20Coins', 'number', 0, 20, 'Collect $20');
    this.quest.startQuest('collect20Coins');
    this.quest.createQuest('50coins', 'number', 0, 50, 'Collect $50');

    this.quest1 = false;
    this.quest2 = false;

    this.coinGroup = new Kiwi.Group(this);
    this.addChild(this.coinGroup);

    this.bagGroup = new Kiwi.Group(this);
    this.addChild(this.bagGroup);

    this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
    this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);

    this.coinText = new Kiwi.GameObjects.Textfield(this, 'Money Collected: 0', 10, 10, '#000');
    this.coinText.fontSize = 20;
    this.addChild(this.coinText);

    this.questText = new Kiwi.GameObjects.Textfield(this, this.quest.returnDescription('collect20Coins'), 570, 10, '#000');
    this.questText.fontSize = 20;
    this.addChild(this.questText);
}

myState.createCoin = function(){

    this.coinGroup.addChild(new Item(this, Math.random()*650+50, -100, this.textures['coin'], true));

}

myState.createBag = function(){

    this.bagGroup.addChild(new Item(this, Math.random()*650+50, -100, this.textures['coinsack'], true));

}

myState.createItem = function(){

    var n = Math.random();
    if( n < 0.2 )
        this.createBag();
    else
        this.createCoin();
}

myState.checkCollisions = function(){

    for(var i = 0; i < this.coinGroup.members.length; i++){
        var c = this.coinGroup.members[i];
        if(c.alpha == 1){
            if(this.cowboy.box.hitbox.intersects(c.box.hitbox)){
                this.cowboy.inventory.changeItemCount('coin', 1);
                this.quest.updateQuest('collect20Coins', 1);
                this.quest.updateQuest('50coins', 1);
                this.createSparkle(c.x, c.y);
                c.tween(100);
            }
        }
    }
    for(var i = 0; i < this.bagGroup.members.length; i++){
        var c = this.bagGroup.members[i];
        if(c.alpha == 1){
            if(this.cowboy.box.hitbox.intersects(c.box.hitbox)){
                this.cowboy.inventory.changeItemCount('bag', 1);
                this.quest.updateQuest('collect20Coins', 5);
                this.quest.updateQuest('50coins', 5);
                this.createSparkle(c.x, c.y);
                c.tween(100);
            }
        }
    }
}

myState.createSparkle = function(x, y){

    var t = new Item(this, x+5, y+10, this.textures['sparkle'], true);
    t.tween(800);
    t.physics.velocity = new Kiwi.Geom.Point(0,-20);
    this.addChild(t);
}


myState.update = function(){
	Kiwi.State.prototype.update.call(this);

    if(this.quest.checkCompleted('collect20Coins') && !this.quest1){
        this.questText.text = this.quest.returnDescription('50coins');
        var i = new Item(this, 250, 30, this.textures['quest']);
        i.tween(1000);
        i.physics.velocity = new Kiwi.Geom.Point(0,-5);
        this.addChild(i);
        this.quest1 = true;
    }
    if(this.quest.checkCompleted('50coins') && !this.quest2){
        this.questText.text = 'All quests completed!';
        var i = new Item(this, 250, 30, this.textures['quest']);
        i.tween(1000);
        i.physics.velocity = new Kiwi.Geom.Point(0,-5);
        this.addChild(i);
        this.quest2 = true;
    }


    var n = Math.random();
    if(n < 0.01)
        this.createItem();

    if(this.leftKey.isDown){
        this.cowboy.scaleX = -1;
        this.cowboy.x-=3.5;
        if(this.cowboy.animation.currentAnimation.name!='move')
            this.cowboy.animation.switchTo('move', true);
    }
    else if(this.rightKey.isDown){
        this.cowboy.scaleX = 1;
        this.cowboy.x+=3.5;
        if(this.cowboy.animation.currentAnimation.name!='move')
            this.cowboy.animation.switchTo('move', true);
    }
    else
        this.cowboy.animation.switchTo('idle');

    this.checkCollisions();

    var totalMoney = this.cowboy.inventory.returnItemCount('coin') * this.cowboy.inventory.returnItemVariable('coin', 'money') +
                        this.cowboy.inventory.returnItemCount('bag') * this.cowboy.inventory.returnItemVariable('bag', 'money');
    this.coinText.text = 'Money Collected: $' + totalMoney;
}

myGame.states.addState(myState);
myGame.states.addState(loadingState);
myGame.states.addState(preloader, true);
