const canvas = document.getElementById("resume-pixels");
const context = canvas.getContext("2d");

const pixelColors = ["#e5cab7", "#6db5ff"];
const updateEveryMs = 140;

let cellSize = 14;
let columns = 0;
let rows = 0;
let generation = 0;
let liveCells = new Set();

function cellKey(x, y) {
  return `${x}:${y}`;
}

function readCell(key) {
  return key.split(":").map(Number);
}

function wrap(value, max) {
  return (value + max) % max;
}

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  const width = window.innerWidth * pixelRatio;
  const height = window.innerHeight * pixelRatio;

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  cellSize = Math.max(
    12,
    Math.floor(Math.min(window.innerWidth, window.innerHeight) / 65),
  );
  columns = Math.ceil(window.innerWidth / cellSize);
  rows = Math.ceil(window.innerHeight / cellSize);

  liveCells = new Set();
  seedCells(140);
}

function seedCells(amount) {
  for (let i = 0; i < amount; i++) {
    const x = Math.floor(Math.random() * columns);
    const y = Math.floor(Math.random() * rows);

    liveCells.add(cellKey(x, y));
  }
}

function getNeighbours(x, y) {
  const neighbours = [];

  for (let xOffset = -1; xOffset <= 1; xOffset += 1) {
    for (let yOffset = -1; yOffset <= 1; yOffset += 1) {
      if (xOffset === 0 && yOffset === 0) {
        continue;
      }

      const neighbourX = wrap(x + xOffset, columns);
      const neighbourY = wrap(y + yOffset, rows);

      neighbours.push(cellKey(neighbourX, neighbourY));
    }
  }

  return neighbours;
}

function countLiveNeighbours(x, y) {
  return getNeighbours(x, y).filter((key) => liveCells.has(key)).length;
}

function getNextGeneration() {
  const cellsToCheck = new Set();

  liveCells.forEach((key) => {
    const [x, y] = readCell(key);
    cellsToCheck.add(key);

    getNeighbours(x, y).forEach((neighbour) => {
      cellsToCheck.add(neighbour);
    });
  });

  const nextCells = new Set();

  cellsToCheck.forEach((key) => {
    const [x, y] = readCell(key);
    const neighbours = countLiveNeighbours(x, y);
    const isAlive = liveCells.has(key);

    if (neighbours === 3 || (isAlive && neighbours === 2)) {
      nextCells.add(key);
    }
  });

  return nextCells;
}

function drawCells() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  liveCells.forEach((key) => {
    const [x, y] = readCell(key);
    const colorIndex = (x + y + generation) % pixelColors.length;

    context.globalAlpha = 0.35 + Math.random() * 0.35;
    context.fillStyle = pixelColors[colorIndex];

    context.fillRect(
      x * cellSize,
      y * cellSize,
      Math.max(2, cellSize - 8),
      Math.max(2, cellSize - 8),
    );
  });

  context.globalAlpha = 1;
}

function update() {
  liveCells = getNextGeneration();
  generation += 1;

  // faking game of life patterns because it will probably die out
  if (generation % 45 === 0 || liveCells.size < 20) {
    seedCells(35);
  }

  drawCells();
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
drawCells();
window.setInterval(update, updateEveryMs);
