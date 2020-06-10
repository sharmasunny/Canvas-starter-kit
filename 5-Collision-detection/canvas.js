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

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

document.addEventListener("resize", function (event) {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}


/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
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

function Ball(x, y, circleRadius) {
  this.x = x;
  this.y = y;
  this.velocity= {
      x: randomIntFromRange(-2, 2),
      y: randomIntFromRange(-2, 2)
  }

  this.circleRadius = circleRadius;
  this.minRadius = circleRadius;
  this.colour = getRandomColor();
  this.mass = 1;

  this.draw = function () {
    canvas2D.beginPath();
    canvas2D.arc(this.x, this.y, this.circleRadius, 0, Math.PI * 2, false);
    // border of circle
    canvas2D.strokeStyle = this.colour;
    canvas2D.stroke();

    // fill circle area
    // canvas2D.fillStyle = this.colour;
    // canvas2D.fill();
    canvas2D.closePath();
  };

  this.update = function (circleArray) {
    for (let i = 0; i < circleArray.length; i++) {
      if (this === circleArray[i]) continue;
      if (
        distance(this.x, this.y, circleArray[i].x, circleArray[i].y) -
          circleRadius * 2 <
        0
      ) {
        resolveCollision(this,circleArray[i]);
      }
    }
    if (this.y + this.circleRadius + this.velocity.y > canvas.height) {
        this.velocity.y = -this.velocity.y * friction;
    } else {
        this.velocity.y += gravity;
    }

    if (
      this.x + this.circleRadius + this.velocity.x > canvas.width ||
      this.x - this.circleRadius <= 0
    ) {
        this.velocity.x = -this.speedX;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  };
}

// 400 animated circle

init = function () {
  circleArray = [];
  for (let i = 0; i < 100; i++) {
    let circleRadius = randomIntFromRange(2, 5);
    let x = randomIntFromRange(circleRadius, canvas.width - circleRadius);
    let y = randomIntFromRange(0, canvas.height - circleRadius);

    if (i !== 0) {
      for (let j = 0; j < circleArray.length; j++) {
        if (
          distance(x, y, circleArray[j].x, circleArray[j].y) -
            circleRadius * 2 <
          0
        ) {
          x = randomIntFromRange(circleRadius, canvas.width - circleRadius);
          y = randomIntFromRange(0, canvas.height - circleRadius);
          j = -1;
        }
      }
    }

    circleArray.push(new Ball(x, y, circleRadius));
  }
};

animate = function () {
  requestAnimationFrame(animate);
  // clear canvas

  canvas2D.clearRect(0, 0, innerWidth, innerHeight);
  let index = 0;
  for (const circleObj of circleArray) {
    //     index++;
    // if(index<=1 ){
    //     circleObj.x = mouse.x;
    //     circleObj.y = mouse.y;
    // }
    circleObj.update(circleArray);
  }
};
init();
animate();
