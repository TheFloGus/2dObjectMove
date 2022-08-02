const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;

let canvasPosition = canvas.getBoundingClientRect();

window.addEventListener("resize", function (e) {
  canvasPosition = canvas.getBoundingClientRect();
});

const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false,
};

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
});

canvas.addEventListener("mousedown", function (event) {
  mouse.click = true;
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
});

document.addEventListener("mouseup", function (event) {
  mouse.click = false;
});

const square = {
  x: canvas.width/2,
  y: canvas.height / 2,
  size: 50,
  angle: 0,
};

function update() {
  const dx = square.x - mouse.x;
  const dy = square.y - mouse.y;
  let theta = Math.atan2(dy, dx);
  square.angle = theta;
  if (mouse.click) {
    if (mouse.x != square.x) {
      square.x -= dx / 30;
    }
    if (mouse.y != square.y) {
      square.y -= dy / 30;
    }
  }
}

function draw(x, y, angle, size) {
  if (mouse.click) {
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
  }

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.translate(-x, -y);
  ctx.rect(
    x - size / 2,
    y - size / 2,
    size,
    size
  );
  ctx.fill();
  ctx.restore();
  ctx.closePath();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  draw(square.x, square.y, square.angle, square.size);
  requestAnimationFrame(animate);
}
animate();
