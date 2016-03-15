ig.module(
    'game.entities.lapin'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityLapin = ig.Entity.extend({
    	size: {
    		x: 48,
    		y: 48
    	},
    	collides: ig.Entity.COLLIDES.PASSIVE,
    	maxVel: {
    		x: 275,
    		y: 300
    	},
    	accelGround: 500,
    	accelAir: 300,
    	speed: {
    		current: 0,
    		normal: 300,
    		ladder: 600
    	},
    	friction: {
    		x: 400,
    		y: 600
    	},
    	type: ig.Entity.TYPE.A,
    	// Player friendly group
    	checkAgainst: ig.Entity.TYPE.A,
    	name: "player",
    	animSheet: new ig.AnimationSheet('media/lapin-sprite.png', 48, 48),
    	init: function(x, y, settings) {
    		this.parent(x, y, settings);
    		ig.game.player = this;
    		this.addAnim('idle', 1, [0]);
    		this.addAnim('run', 0.1, [1, 2, 3, 4, 5, 2]);
    	},
    	update: function() {
    		if (ig.input.state('left') || ig.input.state('right') || ig.input.state('up') || ig.input.state('down')  || ig.input.state('space')) {
    			ig.game.unpause();
    		}
    		// Handle user input; move left or right
    		var accel = this.standing ? this.accelGround : this.accelAir;
    		if (ig.input.state('left')) {
    			if (this.accel.x > 0) this.vel.x *= 0.7; // prevents sliding as if on ice when changing direction
    			this.accel.x = -accel;
    			this.flip = true;
    		} else if (ig.input.state('right')) {
    			if (this.accel.x < 0) this.vel.x *= 0.7; // prevents sliding as if on ice when changing direction
    			this.accel.x = accel;
    			this.flip = false;
    		} else {
    			this.accel.x = 0;
    		}
    		if (ig.input.state('up')) {
    			if (this.accel.y > 0) this.vel.y *= 0.7; // prevents sliding as if on ice when changing direction
    			this.accel.y = -accel;
    			//this.flip = true;
    		} else if (ig.input.state('down')) {
    			if (this.accel.y < 0) this.vel.y *= 0.7; // prevents sliding as if on ice when changing direction
    			this.accel.y = accel;
    			//this.flip = false;
    		} else {
    			this.accel.y = 0;
    		}
    		if (ig.input.state('space') && ig.game.oeufTimer.delta() > 0) {
    			var offset = -32;
    			if (this.flip) offset = 48;
    			ig.game.spawnEntity('EntityOeuf', this.pos.x + offset, this.pos.y + 24);
    			ig.game.oeufTimer.set(0.25); // only allow spawning max once per x second
    			//this.flip = false;
    		}
    		if (this.vel.x == 0 && this.vel.y == 0) {
    			this.currentAnim = this.anims.idle;
    		} else {
    			this.currentAnim = this.anims.run;
    		}
    		this.currentAnim.flip.x = this.flip;
    		this.parent();
    	}
    });
});
