ig.module(
    'game.entities.kid02'
)
.requires(
    'game.entities.basekid'
)
.defines(function() {

    EntityKid02 = EntityBasekid.extend({

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

		name:"kid02",

        animSheet: new ig.AnimationSheet('media/kids.png', 24, 48),

        init: function (x, y, settings) {

            this.parent(x, y, settings);
            this.addAnim('idle', 1, [14]); // 0, 7, 14, 21, 28, 35, 42, 49
	        this.addAnim('run', 1, [14]);

        },

        update: function() {

			this.parent();

        }
    });
});
