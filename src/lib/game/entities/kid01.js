ig.module(
    'game.entities.kid01'
)
.requires(
    'game.entities.basekid'
)
.defines(function() {

    EntityKid01 = EntityBasekid.extend({

		speed: {current:0,normal:40,fast:50,randomFactor:4},

		name:"kid01",
		kidIndex:1,

        animSheet: new ig.AnimationSheet('media/kids.png', 24, 48),

        init: function (x, y, settings) {

            this.parent(x, y, settings);
            this.addAnim('idle', 1, [7]); // 0, 7, 14, 21, 28, 35, 42, 49
	        this.addAnim('run', 1, [7]);

        },

        update: function() {

			this.parent();

        }
    });
});
