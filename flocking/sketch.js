class Boid {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(3, -3), random(3, -3));
    this.acc = createVector(0, 0);
    this.maxSpeed = 5;
    this.maxForce = 0.05;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  edges() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }

  steer(target) {
    const desired = target
      .sub(this.pos)
      .normalize()
      .mult(this.maxSpeed);

    const steerVector = desired.sub(this.vel).limit(0.05);
    this.applyForce(steerVector);
  }

  seperate(boids) {
    const steer = createVector(0, 0);
    let count = 0;
    for (let boid of boids) {
      if (boid.pos.dist(this.pos) > 0 && boid.pos.dist(this.pos) < 30) {
        const diff = p5.Vector.sub(this.pos, boid.pos).normalize();
        steer.add(diff);
        count++;
      }
    }

    if (count > 0) {
      steer.div(count);
      steer.setMag(this.maxSpeed);
      steer.sub(this.vel).limit(this.maxForce);
    }

    return steer;
  }

  align(boids) {
    const steer = createVector(0, 0);
    let count = 0;
    for (let boid of boids) {
      if (boid.pos.dist(this.pos) > 0 && boid.pos.dist(this.pos) < 50) {
        steer.add(boid.vel);
        count++;
      }
    }

    if (count > 0) {
      steer.div(count);
      steer.setMag(this.maxSpeed);
      steer.sub(this.vel).limit(this.maxForce);
    }
    return steer;
  }

  cohese(boids) {
    const average = createVector();
    let count = 0;

    for (let boid of boids) {
      if (boid.pos.dist(this.pos) > 0 && boid.pos.dist(this.pos) < 50) {
        average.add(boid.pos);
        count++;
      }
    }

    if (count > 0) {
      average.div(count);
      const desired = average
        .sub(this.pos)
        .normalize()
        .setMag(this.maxSpeed);

      return desired.sub(this.vel).limit(0.05);
    } else {
      return average;
    }
  }

  flock(boids) {
    const separation = this.seperate(boids).mult(sepSlider.value());
    const alignment = this.align(boids).mult(alignSlider.value());
    const cohesion = this.cohese(boids).mult(coheseSlider.value());

    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
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

let boids = [];
let sepSlider, coheseSlider, alignSlider;

function setup() {
  createCanvas(600, 600);
  sepSlider = createSlider(0, 5, 0, 0.1);
  alignSlider = createSlider(0, 5, 0, 0.1);
  coheseSlider = createSlider(0, 5, 0, 0.1);

  for (let i = 0; i < 100; i++) {
    boids.push(new Boid());
  }
}

function draw() {
  background(55);

  for (let boid of boids) {
    boid.flock(boids);
    boid.update();
    boid.show();
    boid.edges();
  }
}
