var winCount = 0;
var loseCount = 0;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 510) {
        this.x = -80;
        this.speed = 100 + Math.floor(Math.random() * 450);
    }

    // Collision between player and enemies
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 205;
        player.y = 405;

// Check if the player is losing the game
        loseCount = loseCount+1;
        lose.innerText = "Losing" +" "+ loseCount +" " +"times!";
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-princess-girl.png';
};
Player.prototype.update = function() {

  // Prevent the player from moving after the wall boundaries

    if (this.x > 405) {
        this.x = 405;
    }

    if (this.y > 405) {
        this.y = 405;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y < 0) {
        this.x = 205;
        this.y = 405;

  // Check if the player is winning the game
        winCount = winCount+1;
        win.innerText = "Winning" +" "+ winCount +" " +"times!";
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {

        case 'left':
            this.x -= this.speed + 50;
            break;

        case 'up':
            this.y -= this.speed + 30;
            break;

        case 'right':
            this.x += this.speed + 50;
            break;

        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(205, 415, 50);

var center = [55, 155, 225];
var enemy;

center.forEach(function(spot) {
    enemy = new Enemy(0, spot, 100 + Math.floor(Math.random() * 450));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
