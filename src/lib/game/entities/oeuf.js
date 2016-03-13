ig.module(
    'game.entities.oeuf'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityOeuf = ig.Entity.extend({

        size: { x: 24, y: 24 },
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

		name:"oeuf",


        animSheet: new ig.AnimationSheet('media/oeufs.png', 24, 24),

        init: function (x, y, settings) {

            this.parent(x, y, settings);

			this.addAnim('idle', 1, [0,1,2,3,4]);

        },

        update: function() {




			if (this.vel.x == 0 && this.vel.y == 0) this.currentAnim = this.anims.idle;
			else this.currentAnim = this.anims.run;

			this.parent();

        }
    });
});
