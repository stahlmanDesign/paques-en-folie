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
        friction: {x:0,y:0},

        type: ig.Entity.TYPE.A, // Player friendly group
		checkAgainst: ig.Entity.TYPE.B,

		name:"oeuf",


        animSheet: new ig.AnimationSheet('media/oeufs.png', 24, 24),

        init: function (x, y, settings) {

            this.parent(x, y, settings);

			this.addAnim('idle', 1, [0,1,2,3,4]);

			ig.game.oeufs.push(this); // add to array when created
        },

        update: function() {




			if (this.vel.x == 0 && this.vel.y == 0) this.currentAnim = this.anims.idle;
			else this.currentAnim = this.anims.run;

			this.parent();

        },
        check:function(other){
	        if (other instanceof EntityLapin) return;
			if (other instanceof EntityBasekid ){
				this.kill();
				ig.game.kids[other.kidIndex].numOeufs += 1; // give egg to kid
			}
		},
        kill:function(){
	        for (var i = ig.game.oeufs.length; i > -1; i--){
		        var oeuf = ig.game.oeufs[i];
		        if (oeuf == this){
		        	ig.game.oeufs.splice(i,1); // remove from array
		        	break;
		        }
	        }
	        this.parent();
        }
    });
});
