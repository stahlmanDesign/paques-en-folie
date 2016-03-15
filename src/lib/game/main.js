ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.oeuf',
	'game.levels.level1',

	'impact.debug.debug'			// Include debugger
)
.defines(function(){

MyGame = ig.Game.extend({

	// Load a font
	font: new ig.Font( 'media/stag-white.png' ),

	oeufs: [], // will contain eggs in game

	// HUD icons, will define coordinates in atlas later
	kidsIcon: new ig.Image('media/kids.png'),
	kids: [{
		numOeufs: 0
	}, {
		numOeufs: 0
	}, {
		numOeufs: 0
	}, {
		numOeufs: 0
	}, {
		numOeufs: 0
	}, {
		numOeufs: 0
	}, {
		numOeufs: 0
	}, {
		numOeufs: 0
	}],
	round: 1,
	numKidsInRound: 2,
	roundTime: 15, // to start first round
	roundPauseMessage: "",
	init: function() {
		// Initialize your game here; bind keys etc.

		// Bind keys, gamepad and tactile input
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind(ig.KEY.SPACE, 'space');
		ig.input.bind(ig.KEY.P, 'pause');

		ig.game.oeufTimer = new ig.Timer(1);

		ig.game.loadLevel(ig.global['Level' + 'Level1']);

		ig.Timer.timeScale = 0;

		ig.game.roundTimer = new ig.Timer(ig.game.roundTime);
	},
	paused: true,
	pause: function() {
		ig.Timer.timeScale = 0;
		ig.game.paused = true;
	},
	unpause: function() {
		if (ig.game.gameOver) return;
		ig.Timer.timeScale = 1;
		ig.game.paused = false;
	},

	update: function() {

		ig.game.currentTimeLeft = Math.floor(Math.abs(ig.game.roundTimer.delta()));
		ig.game.numKidsInRound = ig.game.round+1; // Round 1 = 2, Round 2 = 3 kids etc.
		var numToAverage = 0;

		for (var i=0;i<ig.game.numKidsInRound;i++){
			//console.log(i)
			numToAverage += ig.game.kids[i].numOeufs; // i = 0, 1, 2...
		}

		ig.game.averageNumOeufs = Math.round((numToAverage) / ig.game.numKidsInRound)


		// new round?
		if (ig.game.roundTimer.delta() > 0){
			if (ig.game.round < 7) ig.game.round += 1;
			else ig.game.gameOver = true;
			ig.game.pause(); // game over

			ig.game.roundTimer.set(ig.game.roundTime + ig.game.round * 2);
			var kidToSpawn = "EntityKid0" + ig.game.round;
			ig.game.spawnEntity(kidToSpawn, ig.game.player.pos.x,ig.game.player.pos.y)
		}
		// when key pressed, game unpauses
		//ig.show('oeufs',ig.game.oeufs.length);
		//ig.show('avg',ig.game.averageNumOeufs);
		// camera follow player
		if( ig.game.player ) {
			this.screen.x = ig.game.player.pos.x - ig.system.width/2;
			this.screen.y = ig.game.player.pos.y - ig.system.height/2;
		}


		// Update all entities and backgroundMaps
		this.parent();

		// Add your own, additional update code here
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		// Add your own drawing code here
		var x = ig.system.width / 2,
			y = ig.system.height / 2;
		if (ig.game.paused){
			if (ig.game.round == 1) ig.game.roundPauseMessage = "Distribuez les oeufs aux enfants\nle plus également que possible\n en " + ig.game.currentTimeLeft + " secondes!";
			else if (ig.game.gameOver) ig.game.roundPauseMessage = "Game Over!"
			else ig.game.roundPauseMessage = "Round " + ig.game.round + " prêt ?";

			this.font.draw(ig.game.roundPauseMessage , x, y/2, ig.Font.ALIGN.CENTER);
		}
		if (!ig.global.wm && ig.game.player) {
			var x = 10,
				y = 10;
			// draw HUD inventory items
			//if (ig.game.gameIsOver){
			ig.game.font.draw('Oeufs en moyenne:' + ig.game.averageNumOeufs, x / 5, y / 5, ig.Font.ALIGN.LEFT);
			//}else{
			y += 22;
			ig.game.font.draw('Round:'+ig.game.round+'   Temps:' + ig.game.currentTimeLeft, x + 300,y/5, ig.Font.ALIGN.LEFT);
		}
		//ig.game.font.draw("0", x, y, ig.Font.ALIGN.LEFT);


		// look X num times depending on giant lives left to draw how many lives left upper-right HUD
		var spritePosition = 0;
		var spriteSize = 24;
		var icon = ig.game.kidsIcon;
		for (var i = 0; i < (7*8); i++) {
			//.drawTile( targetX, targetY, tile, tileWidth, [tileHeight], [flipX], [flipY] )
			icon.drawTile(x, y, spritePosition, spriteSize,48);


			x += 4;
			spritePosition+=1;
		}
		y+=42;
		x=12;
		for (var i in ig.game.kids){
			ig.game.font.draw(ig.game.kids[i].numOeufs, x, y, ig.Font.ALIGN.LEFT);

		x+=28;
		}
	}

});


	// If our screen is smaller than 640px in width (that's CSS pixels), we scale the
	// internal resolution of the canvas by 2. This gives us a larger viewport and
	// also essentially enables retina resolution on the iPhone and other devices
	// with small screens.
	//var scale = (window.innerWidth < 640) ? 2 : 1;
	var scale = (window.innerWidth < 640) ? 1 : 0.5; // Modif to make pixelated
	// We want to run the game in "fullscreen", so let's use the window's size
	// directly as the canvas' style size.
	var canvas = document.getElementById('canvas');
	canvas.style.width = window.innerWidth + 'px';
	canvas.style.height = window.innerHeight + 'px';
	// Listen to the window's 'resize' event and set the canvas' size each time
	// it changes.
	window.addEventListener('resize', function() {
		// If the game hasn't started yet, there's nothing to do here
		if (!ig.system) {
			return;
		}
		// Resize the canvas style and tell Impact to resize the canvas itself;
		canvas.style.width = window.innerWidth + 'px';
		canvas.style.height = window.innerHeight + 'px';
		ig.system.resize(window.innerWidth * scale, window.innerHeight * scale);
		// Re-center the camera - it's dependend on the screen size.
		if (ig.game && ig.game.setupCamera) {
			ig.game.setupCamera();
		}
		// Also repositon the touch buttons, if we have any
		if (window.myTouchButtons) {
			window.myTouchButtons.align();
		}
	}, false);

//ig.main( '#canvas', MyGame, 60, 320, 240, 2 );
	var width = window.innerWidth * scale,
		height = window.innerHeight * scale;
	ig.main('#canvas', MyGame, 60, width, height, 2);
});
