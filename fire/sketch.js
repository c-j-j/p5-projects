class Particle {
  constructor(x) {
    this.offset = random(1);
    this.pos = createVector(x, height - 10);
    this.vel = createVector(0, -3);

    this.lifespan = width / 2 - Math.abs(width / 2 - this.pos.x);
  }

  update() {
    this.vel.x = sin(this.offset) * 2;
    this.pos.add(this.vel);
    this.offset += 0.1;
    this.lifespan -= 2;
  }

  show() {
    fill(255, this.lifespan, this.lifespan, this.lifespan);
    ellipse(this.pos.x, this.pos.y, 5, 5);
  }

  isGone() {
    return this.lifespan < 0;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [new Particle(width / 2)];
  }

  update() {
    console.log(this.particles.length);
    this.particles = this.particles.filter(p => !p.isGone());
    for (let i = 0; i < 5; i++) {
      this.particles.push(new Particle(Math.floor(random() * width)));
    }

    this.particles.forEach(p => {
      p.update();
    });
  }

  draw() {
    this.particles.forEach(p => {
      p.show();
    });
  }
}

let particles;
function setup() {
  createCanvas(800, 800);
  particles = new ParticleSystem();
}

function draw() {
  background(55, 5);
  particles.update();
  particles.draw();
}
