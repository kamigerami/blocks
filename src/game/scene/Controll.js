
BasicGame.Controll = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Controll.prototype = {

	create: function () {



// game, x, y, key, callback, callbackContext, overFrame, OutFrame, downFrame, Upframe
		buttonJump = this.add.button(200,200, 'buttonjump', null, this, 0, 1, 0, 1); 	

		buttonJump.anchor.setTo(0.5, 0.5);
		// don't move our buttons when the camera moves
		buttonJump.fixedToCamera = true;

		buttonJump.events.onInputOver.add(jump, this);
		buttonJump.events.onInputDown.add(jump, this);		

		spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		spaceKey.onDown.add(this.jump, this);


	},

	update: function () {

		// check collision


	},

	jump: function() {
		if (!player.body.onFloor() && player.body.velocity.y == 0)
		player.body.velocity.y = -250;
	

	}


};
