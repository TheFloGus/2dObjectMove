const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;

let canvasPosition = canvas.getBoundingClientRect();

window.addEventListener("resize", function (e) {
  canvasPosition = canvas.getBoundingClientRect();
  console.log("nice");
});

const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false,
};


canvas.addEventListener("mousemove", function (event) {
  if (mouse.click) {
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
  }
});

canvas.addEventListener("mousedown", function (event) {
  mouse.click = true;
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
});

canvas.addEventListener("mouseup", function (event) {
  mouse.click = false;
});

const square = {
  x: canvas.width,
  y: canvas.height / 2,
  size: 50,
  angle: 45,
  frameX: 0,
  frameY: 0,
};

function update() {
  const dx = square.x - mouse.x;
  const dy = square.y - mouse.y;
  let theta = Math.atan2(dx, dy);
  square.angle = theta;
  if (mouse.x != square.x) {
    square.x -= dx / 30;
  }
  if (mouse.y != square.y) {
    square.y -= dy / 30;
  }
}

function draw() {
  if (mouse.click) {
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(square.x, square.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
  }

  ctx.fillStyle = "red";
  ctx.beginPath();
//   ctx.rotate(square.angle);
  ctx.rect(
    square.x - square.size / 2,
    square.y - square.size / 2,
    square.size,
    square.size
  );
  ctx.fill();
  ctx.closePath();



}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  draw();
  requestAnimationFrame(animate);
}
animate();
