var player, cube, line, pixel, spaceKey, firstInput, newTime;


BasicGame.Game = function (game) {

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

BasicGame.Game.prototype = {

	create: function () {

		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

		// the ground 
		// start from left 0, 
		// half the height of the world
		line = this.add.tileSprite(0,this.world.height / 2,this.world.width * 4, 0,  'line');	

		// the player
		player = this.add.sprite(this.world.width / 2, this.world.height / 2 - 40, 'player');	

		// the obstacle
		cube = this.add.sprite(this.world.width/ 2 + 150,this.world.height / 2 - player.height * 2, 'cube');	
		
		
		// set new bounds of world x, y, x ,y bounds
		this.world.setBounds(0,0,this.world.width * 4,this.world.height);

		this.physics.arcade.TILE_BIAS = 40;

		this.physics.enable([player,line,cube], Phaser.Physics.ARCADE);


	  	line.collideWorldBounds = true;	
		line.body.immovable = true;
		line.allowGravity = false;
		
		player.collideWorldBounds = true;
		player.body.gravity.y = 500;
		// pixelize
		player.smoothed = false;

	
					
		// follow player with camera
		this.camera.follow(player);




		// print start text


		/// if first input then start game

		this.input.onDown.addOnce(this.startGame, this);



		spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		spaceKey.onDown.add(this.jump, this);

		console.log ("new time is most like undef ? :", newTime);
		if (undefined == newTime) {
			console.log("newTime undefined");
			newTime = this.time.now + (this.rnd.realInRange(10,100) * 50 );
		}


		console.log("calling buttonJump function");
		this.buttonJump();


	},

	update: function () {

		// check collision


		this.physics.arcade.collide(player, line);


		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
			
			
			console.log("time left to newTime", this.time.now - newTime);
				if (this.time.now > newTime) {
			   		console.log("newtime is now");
					this.updateNewTime();

				}
		

			if (player.x > this.world.width + 1) 
				console.log("next level");

	},

	updateNewTime: function () {

		console.log("updating NewTime", newTime);
	   player.tint = Math.random() * 0xffffff;
	   newTime = this.time.now + (this.rnd.realInRange(10, 100) * 100);
		console.log("new newTime : ", newTime);

	},
	jump: function() {
		if (!player.body.onFloor() && player.body.velocity.y == 0)
		player.body.velocity.y = -250;
	



	},

	startGame: function () {
		console.log("startGame function");
		player.body.velocity.x += 150;
	


	},

	restartGame: function () {
	 this.state.start('Game');



	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
