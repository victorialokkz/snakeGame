var draw = function (snakeToDraw, apple) {
var drawableSnake = {color: "green", pixels:snakeToDraw};
var drawableApple = {color: "red", pixels:[apple]};
var drawableObjects = [drawableSnake, drawableApple];
CHUNK.draw(drawableObjects);
}

//foreach Function. user 12 -16 OR 28-40

// var moveSegment = function(segment) {
//   if (segment.direction === "down") {
//     return { top: segment.top + 1, left: segment.left}
//   } else if (segment.direction === "up") {
//     return {top: segment.top - 1, left: segment.left}
//   } else if (segment.direction === "right") {
//     return {top: segment.top, left: segment.left + 1}
//   } else if (segment.direction === "left"){
//     return {top: segment.top, left: segment.left - 1}
//   }
//   return segment;
// }

//Switch statement

var moveSegment = function(segment) {
switch (segment.direction) {
  case "down":
    return {top: segment.top + 1, left: segment.left}
  case "up":
    return {top: segment.top - 1, left: segment.left}
  case "right":
    return {top: segment.top, left: segment.left + 1}
  case "left":
    return {top: segment.top, left: segment.left - 1}
  default:
    return segment;
  }
}

var segmantFurtherForwardThan = function (index, snake){
  if (snake[index - 1] === undefined) {
    return snake [index]
} else {
    return snake[index - 1];
  }
}

var moveSnake = function(snake) {
  return snake.map(function(oldSegment,segmentIndex) {
    var newSegment = moveSegment(oldSegment);
    newSegment.direction = segmantFurtherForwardThan (segmentIndex, snake).direction;
    return newSegment
    // newSnake.push(newSegment);
  });
}

//detectCollisionBetween takes two collections of coordinates
//and returns true if the collections share any pixels

//CHUNK.endGame tells chunk to stop calling the advanceGame function,
//effectively ending the game
var advanceGame = function() {
  var newSnake = moveSnake(snake);

  if (ate(newSnake,snake)) {
    CHUNK.endGame();
    CHUNK.flashMessage("Cannibal");
  }
  if (ate(newSnake,[apple])) {
      newSnake = growSnake(newSnake);
      apple = CHUNK.randomLocation
  }
  if (ate(newSnake,[CHUNK.gameBoundaries()])) {
    CHUNK.endGame();
    CHUNK.flashMessage("Try again LOSEr!");
  }
  snake = newSnake;
  draw(snake, apple);
}

var changeDirection = function(direction){
  snake[0].direction = direction;
  console.log("You're controlling the snake");
}

var growSnake = function(snake) {
  var tipOfTailIndex = snake.length - 1
  var tipOfTail = snake [tipOfTailIndex];
  snake.push({top:tipOfTail.top, left: tipOfTail.left});
  return snake;
}

var ate = function(snake, otherThing) {
  var head = snake [0];
  return CHUNK.detectCollisionBetween([head], otherThing);
}

var apple = {top:8,left:10};

var snake = [{ top: 1, left: 0, direction: "down"}, {top: 0, left: 0, direction: "down" }];

//this moves the snake automatically, every second
CHUNK.executeNTimesPerSecond(advanceGame, 1);
//this allows you to use arrows to change direction
CHUNK.onArrowKey(changeDirection);


// PRACTICE: drawSnake(snake);
//paste into terminal to execute changes
// var drawableSnake = {color: "purple", pixels: snake};
// var drawableObjects = [drawableSnake];
// CHUNK.draw(drawableObjects);
