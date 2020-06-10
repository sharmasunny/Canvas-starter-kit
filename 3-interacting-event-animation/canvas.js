const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvas2D = canvas.getContext("2d");
const maxRadius = 20;
const mouse = {
  x: undefined,
  y: undefined,
};
let circleArray = [];

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function (event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

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

function Circle(x, y, speedX, speedY, circleRadius) {
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
    canvas2D.strokeStyle = this.colour;
    canvas2D.stroke();
    canvas2D.fillStyle = this.colour;
    // fill circle area
    canvas2D.fill();
  };

  this.update = function () {
    if (
      this.x + this.circleRadius > innerWidth ||
      this.x - this.circleRadius < 0
    ) {
      this.speedX = -this.speedX;
    }

    if (
      this.y + this.circleRadius > innerHeight ||
      this.y - this.circleRadius < 0
    ) {
      this.speedY = -this.speedY;
    }
    this.x += this.speedX;
    this.y += this.speedY;

    // mouse interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.circleRadius < maxRadius) {
        this.circleRadius += 1;
      }
    } else if (this.circleRadius > this.minRadius) {
      this.circleRadius -= 1;
    }

    this.draw();
  };
}

// 100 animated circle

init = function () {
  circleArray = [];
  for (let i = 0; i < 1000; i++) {
    let circleRadius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - circleRadius * 2) + circleRadius;
    let y = Math.random() * (innerHeight - circleRadius * 2) + circleRadius;
    let speedX = Math.random() - 0.5;
    let speedY = Math.random() - 0.5;

    circleArray.push(new Circle(x, y, speedX, speedY, circleRadius));
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
