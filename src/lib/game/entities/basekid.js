ig.module(
    'game.entities.basekid'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityBasekid = ig.Entity.extend({

        size: { x: 24, y: 48 },
        collides: ig.Entity.COLLIDES.PASSIVE,
        maxVel: {
			x: 275,
			y: 300
		},
		accelGround: 500,
		accelAir: 300,
		speed: {current:0,normal:30,fast:40},
        friction: {x:400,y:600},

        type: ig.Entity.TYPE.B, // Player friendly group
		checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,

		//name:"basekid",


        animSheet: new ig.AnimationSheet('media/kids.png', 24, 48),

        init: function (x, y, settings) {

            this.parent(x, y, settings);


            this.addAnim('idle', 1, [0]);
	        this.addAnim('run', 0.1, [0]);

        },

        update: function() {

			// chase bunny
		    var angle = this.angleTo( ig.game.player );

			if (this.distanceTo(ig.game.player) < 500 ){
		        this.vel.x = (Math.cos(angle) * this.speed.normal);
		        this.vel.y = (Math.sin(angle) * this.speed.normal);
		    }
		    if (this.distanceTo(ig.game.player) < 100 ){
		        this.vel.x = (Math.cos(angle) * this.speed.fast);
		        this.vel.y = (Math.sin(angle) * this.speed.fast);
		    }

			// Handle user input; move left or right
			var accel = this.standing ? this.accelGround : this.accelAir;
			if( this.vel.x < 0) { // left
				if (this.accel.x > 0) this.vel.x *=0.7; // prevents sliding as if on ice when changing direction
				this.accel.x = -accel;
				this.flip = true;

			}
			else if( this.vel.x > 0) { // right
				if (this.accel.x < 0) this.vel.x *=0.7; // prevents sliding as if on ice when changing direction
				this.accel.x = accel;
				this.flip = false;
			}

			else {
				this.accel.x = 0; // stop
			}

			if( this.vel.y < 0) { // up
				if (this.accel.y > 0) this.vel.y *=0.7; // prevents sliding as if on ice when changing direction
				this.accel.y = -accel;
				//this.flip = true;

			}
			else if( this.vel.y > 0) { // down
				if (this.accel.y < 0) this.vel.y *=0.7; // prevents sliding as if on ice when changing direction
				this.accel.y = accel;
				//this.flip = false;
			}

			else {
				this.accel.y = 0; // stop
			}



			if (this.vel.x == 0 && this.vel.y == 0) this.currentAnim = this.anims.idle;
			else this.currentAnim = this.anims.run;

			this.currentAnim.flip.x = this.flip;

			this.parent();

        }
    });
});
