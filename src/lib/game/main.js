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
	},
	paused: true,
	pause: function() {
		ig.Timer.timeScale = 0;
		ig.game.paused = true;
	},
	unpause: function() {
		ig.Timer.timeScale = 1;
		ig.game.paused = false;
	},

	update: function() {

		// when key pressed, game unpauses
		ig.show('oeufs',ig.game.oeufs.length);
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
		if (ig.game.paused) this.font.draw("Aidez chaque enfant\n à trouver un oeuf\n sans qu'ils t'attrappent!", x, y, ig.Font.ALIGN.CENTER);
		if (!ig.global.wm && ig.game.player) {
			var x = 10,
				y = 10;
			// draw HUD inventory items
			//if (ig.game.gameIsOver){
			ig.game.font.draw('Oeufs:' + ig.game.oeufs.length, x / 5, y / 5, ig.Font.ALIGN.LEFT);
			//}else{
			y += 22;
		}
		ig.game.font.draw("0", x, y, ig.Font.ALIGN.LEFT);


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
