// Initial Data
let currentColor = 'black';
let canDraw = false;

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

// Events
document.querySelectorAll('.color').forEach(item => {
  item.addEventListener('click', colorClickEvent);
});
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);
document.querySelector('.save').addEventListener('click', saveDrawing);

// Functions
function colorClickEvent(e) {
  let color = e.target.getAttribute('data-color');
  currentColor = color;

  document.querySelector('.color.active').classList.remove('active');
  e.target.classList.add('active');
}
function mouseDownEvent(e) {
  canDraw = true;
  mouseX = e.pageX - screen.offsetLeft;
  mouseY = e.pageY - screen.offsetTop;
}
function mouseMoveEvent(e) {
  if (canDraw) {
    draw(e.pageX, e.pageY);
  }
}
function mouseUpEvent() {
  canDraw = false;
}
function draw(x, y) {
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";
  ctx.moveTo(mouseX, mouseY);
  ctx.lineTo(pointX, pointY);
  ctx.closePath();
  ctx.strokeStyle = currentColor;
  ctx.stroke();


  mouseX = pointX;
  mouseY = pointY;
}
function clearScreen() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function saveDrawing() {
  const userConfirmed = confirm("Você tem certeza de que quer salvar este desenho?");

  const imageURI = screen.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = imageURI;
  link.download = "draw.png";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  link.click();

}