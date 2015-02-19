
// Array to keep bugs in check

var yAxis = [60, 140, 226, 310, 410, 500];




// Enemies our player must avoid
var Enemy = function () {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -100;  // Start -100 to not show current bug.
  this.y = yAxis[Math.floor(Math.random() * 3)];
  this.speed = Math.floor(Math.random() * 5 + 3);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += 70 * this.speed * dt;

  //When Enemy is greater than 500 it kills the current instance and spawns a new one.

  if (this.x > 530) {

    killEnemy(this);

    spawnEnemy();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function () {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 390;
};

Player.prototype.update = function (dt) {
  this.x * dt;
  this.y * dt;

  //If the player position y is in the water, you win!  and it resets the game and creates the enemies.

  if (this.y === -25) {
    spawnPlayer();
    allEnemies = [];
    allEnemies = [enemy, enemy, enemy]
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {

  //Basic handling for the keyboard input

  if (direction === 'left' && this.x > 0) {
    this.x -= 101;
  } else if (direction === 'right' && this.x < 400) {
    this.x += 101;
  } else if (direction === 'up' && this.y > -100) {
    this.y -= 83;
  } else if (direction === 'down' && this.y < 350) {
    this.y += 83;
  }
};

var enemy = new Enemy();
var allEnemies = [enemy, enemy, enemy]

var killEnemy = function (enemyToKill) {

  var location = allEnemies.indexOf(enemyToKill);
  allEnemies.splice(location, 1);

};


var spawnEnemy = function () {

  var enemyCreate = new Enemy();
  allEnemies.push(enemyCreate);

};

var spawnPlayer = function () {
  player = new Player();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function (e) {

  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

//Prevents window scrolling using up/down keys.
window.addEventListener("keydown", function (e) {
  // space and arrow keys
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);
