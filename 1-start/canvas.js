const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvas2D = canvas.getContext('2d');

// Rectangle draw

// x,y,w,h
canvas2D.fillStyle = 'rgba(255,0,0,0.5)';
canvas2D.fillRect(100,100,100,100);

// start new object without connect old
canvas2D.beginPath();

//line - stroke
canvas2D.moveTo(50,300);
canvas2D.lineTo(300,100);
canvas2D.lineTo(400,300);
canvas2D.strokeStyle = "#fa34a3";
canvas2D.stroke();

//
canvas2D.beginPath();

// Arc / Circle

canvas2D.arc(300,300,30,0 ,Math.PI*2 ,false);
canvas2D.strokeStyle = 'blue';
canvas2D.stroke();


// loop circle

for(let i =0 ; i <20 ; i++){
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    canvas2D.beginPath();
    canvas2D.arc(x,y,30,0 ,Math.PI*2 ,false);
    canvas2D.strokeStyle = getRandomColor();
    canvas2D.stroke();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


// // Animation 
// let x = Math.random() * innerWidth;
// let y = Math.random() * innerHeight;
// let speedX = 5;
// let speedY = 5;
// let circleRadius = 30;
// function animate(){
//   requestAnimationFrame(animate);
//   // clear canvas
//   canvas2D.clearRect(0,0,innerWidth,innerHeight);

//   canvas2D.beginPath();
//   canvas2D.arc(x,y,circleRadius,0 ,Math.PI*2 ,false);
//   canvas2D.strokeStyle = 'blue';
//   canvas2D.stroke();

//   if(x + circleRadius>innerWidth || x- circleRadius < 0){
//     speedX = -speedX;
//   }

//   if(y + circleRadius>innerHeight || y- circleRadius < 0){
//     speedY = -speedY;
//   }
//   x += speedX;
//   y += speedY;
// }
// animate();