const canvas = document.querySelector("canvas");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

const canvas2D = canvas.getContext("2d");
const maxRadius = 40;
const mouse = {
  x: document.innerWidth / 2,
  y: document.innerHeight / 2,
};
let circleArray = [];
let gravity = 1;
let friction = 0.9;

document.addEventListener("click", function (event) {
  init();
});



document.addEventListener("resize", function (event) {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// random colour generator
getRandomColor = function () {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
// Animation

function Ball(x, y, speedX, speedY, circleRadius) {
  this.x = x;
  this.y = y;
  this.speedX = speedX;
  this.speedY = speedY;
  this.circleRadius = circleRadius;
  this.minRadius = circleRadius;
  this.colour = getRandomColor();

  this.draw = function () {
    canvas2D.beginPath();
    canvas2D.arc(this.x, this.y, this.circleRadius, 0, Math.PI * 2, false);
    // border of circle
    canvas2D.strokeStyle = this.colour;
    canvas2D.stroke();

    // fill circle area
    canvas2D.fillStyle = this.colour;
    canvas2D.fill();
    canvas2D.closePath();
  };

  this.update = function () {
    if (this.y + this.circleRadius + this.speedY > canvas.height) {
      this.speedY = -this.speedY * friction;
    } else {
      this.speedY += gravity;
    }

    if (
      this.x + this.circleRadius + this.speedX > canvas.width ||
      this.x - this.circleRadius <= 0
    ) {
      this.speedX = -this.speedX;
    }

    this.x += this.speedX;
    this.y += this.speedY;
    this.draw();
  };
}

// 400 animated circle

init = function () {
  circleArray = [];
  for (let i = 0; i < 400; i++) {
    let circleRadius =  randomIntFromRange(8,20);
    let x =  randomIntFromRange(circleRadius, canvas.width -circleRadius); 
    let y = randomIntFromRange(0 , canvas.height - circleRadius); 
    let speedX = randomIntFromRange(-2,2);
    let speedY = randomIntFromRange(-2,2);

    circleArray.push(new Ball(x, y, speedX, speedY, circleRadius));
  }
};

animate = function () {
  requestAnimationFrame(animate);
  // clear canvas

  canvas2D.clearRect(0, 0, innerWidth, innerHeight);
  for (const circleObj of circleArray) {
    circleObj.update();
  }
};
init();
animate();
