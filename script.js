const SKETCH_SIZE = 500;
const DEFAULT_GRID_SIZE = 16;

let currentMode = "black";
let currentGridSize = DEFAULT_GRID_SIZE;

let body = document.body;
let sketch = document.querySelector(".sketch");
let blackBtn = document.getElementById("black-mode");
let rainbowBtn = document.getElementById("rainbow-mode");
let eraserBtn = document.getElementById("eraser-mode");
let clearBtn = document.getElementById("clear-mode");
let gridSizeSlider = document.getElementById("grid-size-slider");


blackBtn.onclick = () => (currentMode = 'black');
rainbowBtn.onclick = () => (currentMode = 'rainbow');
eraserBtn.onclick = () => (currentMode = 'eraser');
clearBtn.onclick = () => {
  let squares = document.querySelectorAll(".square");
  squares.forEach(square => {
    square.style.backgroundColor = "white";
  });
}
gridSizeSlider.onchange = (e) => changeGridSize(e.target.value);

function generateDivs(n) {
  const squareSize = (SKETCH_SIZE) / n;
  sketch.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  sketch.style.gridTemplateRows = `repeat(${n}, 1fr)`;
  for (let i = 0; i < n * n; i++) {
    let square = document.createElement("div");
    square.className = "square";
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.addEventListener("mouseover", changeColor);
    sketch.appendChild(square);
  }
}

function changeColor(e) {
  switch(currentMode) {
    case "black":
      e.target.style.backgroundColor = "black";
      break;
    case "rainbow":
      e.target.style.backgroundColor = randomColor();
      break;
    case "eraser":
      e.target.style.backgroundColor = "white";
      break;
    }
}

function changeGridSize(value) {
  currentGridSize = value;
  sketch.innerHTML = '';
  generateDivs(currentGridSize);
}

function randomColor() {
  let color = [];
  for (let i = 0; i < 3; i++) {
    color.push(Math.floor(Math.random() * 256));
  }
  return 'rgb(' + color.join(', ') + ')';
}
//source: https://codepen.io/teresethulin/pen/MWWrdVZ

generateDivs(currentGridSize);
