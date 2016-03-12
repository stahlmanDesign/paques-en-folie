ig.module(
    'game.entities.lapin'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityLapin = ig.Entity.extend({

        size: { x: 48, y: 48 },
        collides: ig.Entity.COLLIDES.PASSIVE,
        maxVel: {
			x: 275,
			y: 300
		},
		accelGround: 500,
		accelAir: 300,
		speed: {current:0,normal:300,ladder:600},
        friction: {x:400,y:600},

        type: ig.Entity.TYPE.A, // Player friendly group
		checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,

		name:"player",


        animSheet: new ig.AnimationSheet('media/lapin-sprite.png', 48, 48),

        init: function (x, y, settings) {

            this.parent(x, y, settings);

			ig.game.player = this;
            this.addAnim('idle', 1, [0]);
	        this.addAnim('run', 0.1, [1,2,3,4,5,2]);



        },

        update: function() {


			// Handle user input; move left or right
			var accel = this.standing ? this.accelGround : this.accelAir;
			if( ig.input.state('left')) {
				if (this.accel.x > 0) this.vel.x *=0.7; // prevents sliding as if on ice when changing direction
				this.accel.x = -accel;
				this.flip = true;

			}
			else if( ig.input.state('right')) {
				if (this.accel.x < 0) this.vel.x *=0.7; // prevents sliding as if on ice when changing direction
				this.accel.x = accel;
				this.flip = false;
			}
			else if( ig.input.state('up')) {
				if (this.accel.y > 0) this.vel.y *=0.7; // prevents sliding as if on ice when changing direction
				this.accel.y = -accel;
				//this.flip = true;

			}
			else if( ig.input.state('down')) {
				if (this.accel.y < 0) this.vel.y *=0.7; // prevents sliding as if on ice when changing direction
				this.accel.y = accel;
				//this.flip = false;
			}
			else {
				this.accel.x = 0;
				this.accel.y = 0;
			}
ig.show('vel.x',this.vel.x);
ig.show('vel.y',this.vel.y);

			if (this.vel.x == 0 && this.vel.y == 0) this.currentAnim = this.anims.idle;
			else this.currentAnim = this.anims.run;

			this.currentAnim.flip.x = this.flip;

			this.parent();

        }
    });
});
