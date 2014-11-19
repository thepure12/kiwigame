    
var inventory = Kiwi.Plugins.InventoryManager;

function createCharacter(state)
{
	state.character = new Kiwi.GameObjects.Sprite(state, state.textures['characterSprite'], x, 196, true);
	Kiwi.State.prototype.create.call(state);
    state.character.inventory = inventory;
    state.leftKey = state.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
    state.rightKey = state.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);
    state.downKey = state.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S);
    state.game.input.keyboard.onKeyDown.add(state.onPress, state);
    state.character.animation.add('idleright', [0], 0.1, false);
    state.character.animation.add('crouchright', [0], 0.1, false);
    state.character.animation.add('moveright', [1, 2, 3, 4, 5, 6, 7, 8], 0.1, true);
    state.character.animation.add('idleleft', [9], 0.1, false);
    state.character.animation.add('crouchleft', [9], 0.1, false);
    state.character.animation.add('moveleft', [10, 11, 12, 13, 14, 15], 0.1, true);
    if (x == 3)
    {
        state.facing = 'right';
        state.character.animation.play('idleright');
    }
    else
    {
        state.facing = 'left';
        state.character.animation.play('idleleft');
    }
}