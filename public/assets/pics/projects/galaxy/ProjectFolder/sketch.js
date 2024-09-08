let bg;
let stars = [];
let planets = [];
let G = 0.0006;
let centerMass = 1000000;
let index;
let orbitIndex = 100;
let lastIndex = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Linear bg
  bg = drawingContext.createLinearGradient(width / 2, 0, width / 2, height);
  bg.addColorStop(0, "rgb(50,8,57)");
  // bg.addColorStop(0.5, "rgb(125, 182, 243)");
  bg.addColorStop(1, "rgb(0,0,0)");

  //star bg
  for (let i = 0; i <= width / 2; i++) {
    stars.push(new Star());
  }

  //fixed star
  planets.push(new Planet(100, centerMass, 0, 0));

  while (orbitIndex <= height / 2.2) {
    index = random(3, 15);
    orbitIndex += index + lastIndex;
    planets.push(new Planet(index, index, orbitIndex, 2));
    lastIndex = index;
  }
}

function draw() {
  //background
  linearBG();

  //stars
  star();

  if (mouseIsPressed && mouse == false) {
    index = random(5, 20);
    planets.push(
      new Planet(index, index, dist(mouseX, mouseY, width / 2, height / 2), 1)
    );
  }

  push();
  translate(width / 2, height / 2);

  for (let p of planets) {
    p.applyGravitationalAttractionBetween(planets);
    p.checkCollosionWith(planets);
    p.update();
    p.display();
    p.kill();
    if (p.die == true) {
      planets.splice(planets.indexOf(p), 1);
      console.log("removed");
    }
  }

  fill(0, 0, 0);
  circle(planets[0].pos.x, planets[0].pos.y, 240);

  for (let i = 0; i <= 20; i++) {
    strokeWeight(3);
    noFill();
    stroke(205, 155, 137, i * 2);
    circle(planets[0].pos.x, planets[0].pos.y, 260 - i);
  }

  for (let i = 0; i <= 5; i++) {
    strokeWeight(3);
    noFill();
    stroke(205 + 5 * i, 155 + 13 * i, 137 + 15 * i, 120 + i * 20);
    circle(planets[0].pos.x, planets[0].pos.y, 240 - 2 * i);
  }

  pop();

  mouse = mouseIsPressed;
  mouseLastX = mouseX;
  mouseLastY = mouseY;
}

class Planet {
  constructor(diameter, mass, orbit, type) {
    this.dia = diameter;
    this.mass = mass;
    this.orbit = orbit;
    this.type = type;
    this.die = false;

    if (this.type == 1) {
      this.pos = createVector(mouseX - width / 2, mouseY - height / 2);
    } else {
      this.pos = createVector(0, -this.orbit);
    }

    if (this.type == 0) {
      this.vel = createVector(0, 0);
    } else if (this.type == 1) {
      this.vel = createVector(mouseX - width / 2, mouseY - height / 2);
      this.vel.rotate(-PI / 2);
      this.vel.normalize();
      this.vel.mult(((G * centerMass) / this.orbit) ** 0.5);
    } else {
      this.vel = createVector(-(((G * centerMass) / this.orbit) ** 0.5), 0);
    }

    if (this.type == 0) {
      this.color = [0, 0, 0, 0];
    } else {
      this.color = [random(100, 250), random(150, 250), random(200, 250), 255];
    }

    this.acc = createVector();
  }

  applyGravitationalAttractionBetween(others) {
    for (let other of others) {
      // let vector = p5.Vector.sub(other.pos, this.pos);
      // let distance = vector.mag();
      if (this != other) {
        let vector = p5.Vector.sub(other.pos, this.pos);
        let distance = vector.mag();
        vector.normalize(); // direction
        let magnitude = (G * this.mass * other.mass) / (distance * distance);
        vector.mult(magnitude);
        this.addForce(vector);
      }
    }
  }

  checkCollosionWith(others) {
    for (let other of others) {
      if (this != other) {
        let vector = p5.Vector.sub(other.pos, this.pos);
        let distance = vector.mag();
        if (distance < this.dia / 2 + other.dia / 2) {
          let force1 = vector.copy();
          force1.mult(-1 * other.vel.mag()); // 10%;
          this.addForce(force1);
          let force2 = vector.copy();
          force2.mult(1 * this.vel.mag()); // 10%;
          other.addForce(force2);
        }
      }
    }
  }

  addForce(f) {
    let force = p5.Vector.div(f, this.mass);
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.type == 0) {
      this.pos.set(0, 0);
    }
  }

  display() {
    push();
    noStroke();
    translate(this.pos.x, this.pos.y);
    fill(this.color[0], this.color[1], this.color[2], this.color[3]);

    rotate(this.pos.heading() + PI / 2);
    let ratio1 = map(dist(this.pos.x, this.pos.y, 0, 0), 0, 200, 1.5, 1);
    let ratio2 = constrain(ratio1, 1, 1.5);
    scale(ratio2, 1);
    circle(0, 0, this.dia);
    pop();
  }

  kill() {
    if (dist(this.pos.x, this.pos.y, 0, 0) < 100 && this.type != 0) {
      this.die = true;
    } else {
      this.die = false;
    }
  }
}

class Star {
  constructor() {
    this.pX = random(width);
    this.pY = random(height);
    this.pos = createVector(this.pX - width/2, this.pY - height/2)
    this.brightness = random(255);
    this.color = [random(100, 255), random(100, 255), random(100, 255)];
  }

  display() {
    push();
    noStroke();
    translate(this.pX, this.pY);
    fill(this.color[0], this.color[1], this.color[2], this.brightness);

    rotate(this.pos.heading() + PI / 2);

    let ratio1 = map(dist(this.pX, this.pY, width/2, height/2), 0, 170, 30, 1);
    let ratio2 = constrain(ratio1, 1, 30);
    scale(ratio2, 1);

    circle(0, 0, width / 600);
    pop();
  }

  update() {
    this.brightness += random(-50, 50);
  }
}

function linearBG() {
  push();
  drawingContext.fillStyle = bg;
  noStroke(0);
  rect(0, 0, width, height);
  pop();
}

function star() {
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    stars[i].update();
    s.display();
  }
}
