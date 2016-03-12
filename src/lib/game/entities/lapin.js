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


        animSheet: new ig.AnimationSheet('media/lapin-sprite.png', 48, 48),

        init: function (x, y, settings) {

            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);
	        this.addAnim('run', 0.1, [1,2,3,4,5,2]);

			this.currentAnim = this.anims.run;

        },

        update: function() {

			// Handle user input; move left or right
			var accel = this.standing ? this.accelGround : this.accelAir;
			if( ig.input.state('left')) {
				if (this.accel.x > 0) this.vel.x *=0.05; // prevents sliding as if on ice when changing direction
				this.accel.x = -accel;
				this.flip = true;

			}
			else if( ig.input.state('right')) {
				if (this.accel.x < 0) this.vel.x *=0.05; // prevents sliding as if on ice when changing direction
				this.accel.x = accel;
				this.flip = false;
			}
			else {
				this.accel.x = 0;
			}
            this.parent();

        }
    });
});
