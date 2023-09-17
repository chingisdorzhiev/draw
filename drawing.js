const canvas = document.getElementById("drawing");
const ctx = canvas.getContext("2d");

const smallCanv = document.getElementById("sizeCanv");
const sizeCtx = smallCanv.getContext("2d");
const sizeSilder = document.getElementById("sizeSlider");

let picture = [];
let lastLine = [];

let color = "black";
let size = 5;

// Кнопки color, size

document.getElementById("color").oninput = function () {
  color = this.value;
};

sizeSilder.oninput = function () {
  size = this.value;
  sizeCtx.clearRect(0, 0, 200, 200);
  sizeCtx.beginPath();
  sizeCtx.fillStyle = "white";
  sizeCtx.fillRect(0, 0, 200, 200);
  sizeCtx.strokeStyle = color;
  sizeCtx.fillStyle = color;
  sizeCtx.arc(100, 100, size, 0, 2 * Math.PI, true);
  sizeCtx.stroke();
  sizeCtx.fill();
};

document.getElementById("size").onclick = function () {
  if (smallCanv.hidden && sizeSilder.hidden) {
    smallCanv.hidden = false;
    sizeSilder.hidden = false;
    sizeCtx.fillStyle = "white";
    sizeCtx.fillRect(0, 0, 200, 200);
    sizeCtx.strokeStyle = color;
    sizeCtx.fillStyle = color;
    sizeCtx.arc(100, 100, size, 0, 2 * Math.PI, true);
    sizeCtx.stroke();
    sizeCtx.fill();
  } else {
    smallCanv.hidden = true;
    sizeSilder.hidden = true;
  }
};

// Кнопки undo, redo, clear

document.getElementById("clear").onclick = function () {
  picture = [];
  lastLine = [];
  ctx.clearRect(0, 0, 600, 600);
};

document.getElementById("undo").onclick = function () {
  lastLine = picture.pop();
  ctx.clearRect(0, 0, 600, 600);
  drawPicture();
};

document.getElementById("redo").onclick = function () {
  if (lastLine.length) {
    picture.push(lastLine);
    drawPicture();
  }
};

// Сохранение картинки

function savePoint(x, y, size, color, line) {
  let newPoint = [x, y, size, color];
  line.push(newPoint);
}

function drawPicture() {
  for (let i = 0; i < picture.length; i++) {
    for (let j = 0; j < picture[i].length; j++) {
      ctx.beginPath();
      ctx.strokeStyle = picture[i][j][3];
      ctx.fillStyle = picture[i][j][3];
      ctx.arc(
        picture[i][j][0],
        picture[i][j][1],
        picture[i][j][2],
        0,
        2 * Math.PI,
        true
      );
      ctx.stroke();
      ctx.fill();
    }
  }
}

// Отрисовка

canvas.onmousedown = function (event) {
  let newLine = [];
  let x = event.offsetX;
  let y = event.offsetY;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.arc(x, y, size, 0, 2 * Math.PI, true);
  ctx.stroke();
  ctx.fill();
  savePoint(x, y, size, color, newLine);
  canvas.onmousemove = function (event) {
    let x = event.offsetX;
    let y = event.offsetY;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.arc(x, y, size, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.fill();
    savePoint(x, y, size, color, newLine);
  };

  canvas.onmouseup = function () {
    canvas.onmousemove = null;
    picture.push(newLine);
  };
};
