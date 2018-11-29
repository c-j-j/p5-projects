let w = 40;
let grid = [];

function setup() {
  createCanvas(400, 400);
  let rows = width / w;
  let cols = height / w;

  background(10);
  stroke(255);
  noFill();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid.push(new Cell(i, j));
    }
  }
}

function draw() {
  grid.forEach(cell => cell.show());

  grid
    .filter(() => {
      const f = floor(random(100)) % 2 === 0;
      return f;
    })
    .forEach(cell => {
      cell.makeCurrent();
    });

  grid
    .filter(() => {
      const f = floor(random(100)) % 2 === 0;
      return f;
    })
    .forEach(cell => {
      cell.makeNotCurrent();
    });
}

const index = (i, offset) => {
  return i * w + offset;
};

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.current = false;
    this.walls = [true, true, true, true];
  }

  makeCurrent() {
    this.current = true;
  }

  makeNotCurrent() {
    this.current = false;
  }

  show() {
    let { i, j } = this;

    // top line
    if (this.walls[0]) {
      line(index(i, 0), index(j, 0), index(i, w), index(j, 0));
    }

    // right line
    if (this.walls[1]) {
      line(index(i, w), index(j, 0), index(i, w), index(j, w));
    }

    // bottom line
    if (this.walls[2]) {
      line(index(i, 0), index(j, w), index(i, w), index(j, w));
    }

    // left line
    if (this.walls[3]) {
      line(index(i, 0), index(j, 0), index(i, 0), index(j, w));
    }

    if (this.current) {
      fill(100);
      stroke(100);
      rect(index(i, 0), index(j, 0), index(i, w), index(j, w));
    } else {
      noFill();
      stroke(0);
      rect(index(i, 0), index(j, 0), index(i, w), index(j, w));
    }
  }
}
