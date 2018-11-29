class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.prevPos = this.pos.copy();
    this.h = 0;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(4);
    this.acc.mult(0);
    this.pos.add(this.vel);
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }

  follow(forcefield) {
    const x = Math.floor(this.pos.x / scale);
    const y = Math.floor(this.pos.y / scale);

    const index = x + y * cols;
    this.acc.add(forcefield[index]);
  }

  show() {
    stroke(this.h, 255, 255, 25);

    this.h += 1;
    if (this.h > 255) {
      this.h = 0;
    }

    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }
}
