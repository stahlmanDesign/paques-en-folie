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
		checkAgainst: ig.Entity.TYPE.B,

		//name:"basekid",
		//kidIndex:0,

        animSheet: new ig.AnimationSheet('media/kids.png', 24, 48),

        init: function (x, y, settings) {

            this.parent(x, y, settings);

			// 8 kids with 7 anims each: 0-6, 7-13, 14-20 etc.
			// these will be overridden by kid instances
			// this base class should not be instantiated
            this.addAnim('idle', 1, [14]); // 0, 7, 14, 21, 28, 35, 42, 49
	        this.addAnim('run', 1, [14]);

        },
        update: function() {
// chase bunny
						var angle = this.angleTo(ig.game.player);
						if ( this.distanceTo(ig.game.player) < 1000) {
							this.speed.current = this.speed.normal;
							this.vel.x = (Math.cos(angle) * this.speed.current);
							this.vel.y = (Math.sin(angle) * this.speed.current);
						}
						// chase eggs
						for (var i in ig.game.oeufs) {
							var oeuf = ig.game.oeufs[i];
							var angleOeuf = this.angleTo(oeuf);
							if (this.distanceTo(oeuf) < 2000) {
								this.speed.current = this.speed.fast * Math.random() * this.speed.randomFactor;
								this.vel.x = (Math.cos(angleOeuf) * this.speed.current);
								this.vel.y = (Math.sin(angleOeuf) * this.speed.current);
							}
						}
						// but prefer bunny if close enough
						if (this.distanceTo(ig.game.player) < 100) {
							this.speed.current = this.speed.fast;
							this.vel.x = (Math.cos(angle) * this.speed.current);
							this.vel.y = (Math.sin(angle) * this.speed.current);
						}

			// keep distance from each other

			for (var i in ig.game.entities) {
				var ent = ig.game.entities[i];
				if (ent instanceof EntityBasekid) {
					var anotherKid = ent;
					var angleKid = this.angleTo(anotherKid);
					if (this.distanceTo(anotherKid) < 30 && anotherKid != this) {
						this.speed.current = 20
						this.vel.x = (Math.cos(angleKid) * -this.speed.current);
						this.vel.y = (Math.sin(angleKid) * -this.speed.current);
					}
				}
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
