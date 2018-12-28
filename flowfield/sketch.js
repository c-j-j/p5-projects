let scale = 5;
let inc = 0.05;
let cols, rows;
let zoff = 0;
let numberOfParticles = 500;
let looping = false;
let particles = [];
let forcefield = [];

function setup() {
  createCanvas(700, 700);
  colorMode(HSB, 255);

  cols = width / scale;
  rows = height / scale;
  background(51);

  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Boid());
  }
}

function draw() {
  // stroke(255);
  let yoff = 0;
  for (let i = 0; i < rows; i++) {
    let xoff = 0;
    for (let j = 0; j < cols; j++) {
      const randomAngle = noise(xoff, yoff, zoff) * TWO_PI;

      const angle = p5.Vector.fromAngle(randomAngle);
      angle.setMag(1);

      const index = i + j * cols;
      forcefield[index] = angle;
      // push();
      // strokeWeight(1);
      // translate(scale * i, scale * j);
      // rotate(angle.heading());
      // line(0, 0, scale, 0);
      // pop();

      xoff += inc;
    }
    yoff += inc;
  }
  zoff += inc;

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(forcefield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

function mousePressed() {
  if (looping) {
    looping = false;
    noLoop();
  } else {
    looping = true;
    loop();
  }
}
