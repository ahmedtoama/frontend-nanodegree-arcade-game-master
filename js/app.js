'use strict';
// class for player
var Player = function () {
   // Coordinates for palyer x,y
    this.x = 200;
    this.y = 410;
   //image for enemy
    this.sprite = 'images/char-boy.png';
   //variable for score for player
   this.score_player=0;
   //variable for number of die
   this.loser=0;

};

//drawing for player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//movement for player and condition for movement
Player.prototype.handleInput = function(dir) {
    if(dir == 'left' && this.x > 0) {
        this.x -= 30;
    }
    if(dir == 'right' && this.x < 400) {
        this.x += 30;
    }
    if(dir == 'up' && this.y > 3) {
        this.y -= 30;
    }
    if(dir == 'down' && this.y < 400) {
        this.y += 30;
    }
};

//object fo player
let player = new Player();

//life
let life = document.getElementsByClassName("fa-heart");

//set score for player
$(".score").text(player.score_player);

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Coordinates for enemy x,y
    this.x = x;
    this.y = y;
    //speed for Enemies
    this.speed=150;
    //image for enemy
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    if (this.x < 505) {
        this.x += (this.speed * dt);
    }
    else {
      this.x = -90;
   }

    // when enemy and player are crashed
    if((this.x < (player.x + 30)) && (player.x < (this.x + 60)) && (this.y < (player.y + 60)) && (player.y < (this.y + 40 ))) {

      player.score_player = 0;          //reset score when player crash  with enemy

      // hidden stars for score = 0
      if (player.score_player === 0) {
         $(".p_s_1").css("visibility","hidden");
         $(".p_s_2").css("visibility","hidden");
         $(".p_s_3").css("visibility","hidden");
      }

      player.loser+=1;                //counter for number of lose
      // condition for loser
      if(player.loser === 1){
         life[0].style.visibility=" hidden";

      }
      else if (player.loser === 2) {
         life[1].style.visibility=" hidden";
      }
      else if (player.loser === 3) {
         life[2].style.visibility=" hidden";
         $(".loser").fadeIn(1000);
      }

		$(".score").text(player.score_player);
		player.reset();
    }
};

//drawing for enemy on screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// called every time for know the Coordinates for player when he reach for water
Player.prototype.update = function() {

	// Coordinates y for player to reach water
	if (this.y < 20) {
	player.score_player++;

   $(".score").text(this.score_player);

   //condition for stars
   if (this.score_player>=1 && this.score_player<=5) {
      $(".p_s_1").css("visibility","visible");
   }

   else if (this.score_player>=6 && this.score_player<=10) {
      $(".p_s_2").css("visibility","visible");
   }

   else if (this.score_player>=10 && this.score_player<15) {
      $(".p_s_3").css("visibility","visible");
   }

   else if(this.score_player===15) {
      $(".winner").fadeIn(1000);
   }

   else if (this.score_player === 0) {
      $(".p_s_1").css("visibility","hidden");
      $(".p_s_2").css("visibility","hidden");
      $(".p_s_3").css("visibility","hidden");
   }

   this.reset();
}
};
// make reset for player to intial value for player
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 410;
};

//make objects for enemy
let enemy_1 = new Enemy(-130, 50);
let enemy_2 = new Enemy(-230, 130);
let enemy_3 = new Enemy(-330, 220);
let enemy_4 = new Enemy(-430, 130);
let enemy_5 = new Enemy(-530, 50);

//array for enemies
let Enemies = [enemy_1, enemy_2, enemy_3, enemy_4, enemy_5];

//action listner for keyboard
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//refresh page
$('.fa-repeat').click(function() {
    location.reload();
});
