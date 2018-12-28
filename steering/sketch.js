class Particle {
  constructor() {
    this.pos = createVector(10, 10);
    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  steer(target) {
    const desired = target
      .sub(this.pos)
      .normalize()
      .mult(this.maxSpeed);

    const steerVector = desired.sub(this.vel).limit(0.05);
    this.applyForce(steerVector);
  }

  show() {
    const theta = this.vel.heading() + PI / 2;
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    triangle(0, -10, -5, 10, 5, 10);
    pop();
  }
}

let particle;

function setup() {
  createCanvas(600, 600);
  particle = new Particle();
}

function draw() {
  const target = createVector(mouseX, mouseY);
  background(55);
  fill(0, 255, 0);
  ellipse(target.x, target.y, 10);
  particle.steer(target);
  particle.update();
  particle.show();
}
