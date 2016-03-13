ig.module(
    'game.entities.kid00'
)
.requires(
    'game.entities.basekid'
)
.defines(function() {

    EntityKid00 = EntityBasekid.extend({

		speed: {current:0,normal:30,fast:60,randomFactor:2},

		name:"kid00",
		kidIndex:0,

        animSheet: new ig.AnimationSheet('media/kids.png', 24, 48),

        init: function (x, y, settings) {

            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]); // 0, 7, 14, 21, 28, 35, 42, 49
	        this.addAnim('run', 1, [0]);

        },

        update: function() {

			this.parent();

        }
    });
});
