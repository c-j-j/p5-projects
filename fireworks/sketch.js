let particles = [];

const randomColour = () => ({
  r: random(255),
  g: random(255),
  b: random(255)
});

class FireworkParticle {
  constructor(x, y, colour) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.colour = colour;
    this.lifeSpan = 255;
  }

  applyForce(f) {
    this.acc.add(f);
  }

  isDone() {
    return this.lifeSpan < 0;
  }

  update() {
    this.lifeSpan -= 5;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(this.colour.r, this.colour.g, this.colour.b, this.lifeSpan);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(0, 10), -random(10, 15));
    this.acc = createVector(0, 0);
    this.exploded = false;
    this.fireworkParticles = [];
    this.colour = randomColour();
  }

  applyGravity() {
    this.vel.add(createVector(0, 0.2));
  }

  applyForce(f) {
    this.acc.add(f);
  }

  explode() {
    for (let i = 0; i < 100; i++) {
      const fireworkParticle = new FireworkParticle(
        this.pos.x,
        this.pos.y,
        this.colour
      );
      fireworkParticle.applyForce(p5.Vector.random2D().mult(3));
      this.fireworkParticles.push(fireworkParticle);
    }
  }

  update() {
    this.applyGravity();
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.pos.add(this.vel);

    this.fireworkParticles.forEach(p => p.update());

    if (!this.exploded && this.vel.y > 0) {
      this.explode();
      this.exploded = true;
    }
  }

  show() {
    stroke(this.colour.r, this.colour.g, this.colour.b);
    strokeWeight(8);

    if (!this.exploded) {
      point(this.pos.x, this.pos.y);
    } else {
      this.fireworkParticles.forEach(p => p.show());
    }
  }
}

function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < 20; i++) {
    particles.push(new Particle(random(0, 800), 800));
  }
}

function draw() {
  background(0);

  particles.forEach(particle => {
    particle.update();
    particle.show();
  });
}
