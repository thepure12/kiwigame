var gameOptions = 
{
    renderer: Kiwi.RENDERER_WEBGL, 
    width: 640,
    height: 320,
    plugins:['InventoryManager']
}
var myGame = new Kiwi.Game('content', 'myGame', null, gameOptions);
var x = 3;

myGame.states.addState(outside0State);
myGame.states.addState(outside1State);
myGame.states.addState(outside2State);
myGame.states.addState(loadingState);
myGame.states.switchState('loadingState');