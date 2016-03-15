ig.module(
    'game.entities.kid02'
)
.requires(
    'game.entities.basekid'
)
.defines(function() {

    EntityKid02 = EntityBasekid.extend({
    	speed: {
    		current: 0,
    		normal: 50,
    		fast: 50,
    		randomFactor: 3
    	},
    	name: "kid02",
    	kidIndex: 2,
    	animSheet: new ig.AnimationSheet('media/kids.png', 24, 48),
    	init: function(x, y, settings) {
    		this.parent(x, y, settings);
    		this.addAnim('idle', 1, [14]); // 0, 7, 14, 21, 28, 35, 42, 49
    		this.addAnim('run', 1, [14]);
    	},
    	update: function() {
    		this.parent();
    	}
    });
});
