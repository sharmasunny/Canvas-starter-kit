const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvas2D = canvas.getContext("2d");

// Animation

function Circle(x, y,speedX, speedY, circleRadius) {
  this.x = x;
  this.y = y;
  this.speedX = speedX;
  this.speedY = speedY;
  this.circleRadius = circleRadius;

  this.draw = function () {
    canvas2D.beginPath();
    canvas2D.arc(this.x, this.y, this.circleRadius, 0, Math.PI * 2, false);
    canvas2D.strokeStyle = this.getRandomColor();
    canvas2D.stroke();
    // fill circle area
    canvas2D.fill();
  }

  this.update = function () {
    this.draw();
    if (this.x + this.circleRadius > innerWidth || this.x - this.circleRadius < 0) {
      this.speedX = -this.speedX;
    }

    if (this.y + this.circleRadius > innerHeight || this.y - this.circleRadius < 0) {
      this.speedY = -this.speedY;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.getRandomColor =  function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
}




// 100 animated circle
let circleArray = [];

for(let i=0; i<100;i++){
    let circleRadius = 30;
    let x = Math.random() * (innerWidth -circleRadius * 2) + circleRadius;
    let y = Math.random() * (innerHeight -circleRadius *2) + circleRadius;
    let speedX = (Math.random()-0.5);
    let speedY = (Math.random()-0.5);
 
    circleArray.push(new Circle(x, y ,speedX,speedY,circleRadius));
}


function animate() {
  requestAnimationFrame(animate);
  // clear canvas
  canvas2D.clearRect(0, 0, innerWidth, innerHeight);
  for (const circleObj of circleArray) {
      circleObj.update();
  }
}
animate();
