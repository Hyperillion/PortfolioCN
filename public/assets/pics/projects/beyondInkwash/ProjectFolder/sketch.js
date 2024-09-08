//Fishboat PNG from:
//https://th.pngtree.com/freepng/ink-fishing-boat_5405056.html
//Allowed for personal use

let balls0 = [];
let springs0 = [];
let balls1 = [];
let springs1 = [];
let inkParticles = [];
let drops = [];
let noiseIndex = 0;
let hillX = 0;
let amount;
let bg;
let lastMouseX = 0;
let lastMouseY = 0;
let mouseVel;
let fog1;
let fishboat;
let sunImg;
let boatX = 0;
let boatSpd = 0;
let boatAcc = 0;
let randomWind;
let birdFreq = 1000;
let addWind = false;
let ui = {
  clearCanvas: false,
  autoInkSize: true,
  inkSize: 1,
  objectAmount: 0,
  FPS: 120,
  mouseInfluence: false,
  influenceLevel: 5,
  rainAmount: 18,
  windSpeed: 0,
  boatSpeed: 0,
  mouseX: 0,
  mouseY: 0,
  waterReflection: true,
  screenCapture: false,
  realisticRaindrops: false,
  renderWidth: 0,
  renderHeight: 0,
  endPosition: 550,
  birdPath: false,
};

const RESOLUTION = 100;
const FREQ_POS = 0.001;
const FREQ_TIME = 0.002;

let rows, cols;
let angles = [];
let vehicles = [];

let extraCanvas;
let extraExCanvas;

function setup() {
  randomSeed(928);
  createCanvas(windowWidth, windowHeight); //main canvas for rains and cursor, always erase

  //loading Graphics
  extraCanvas = createGraphics(windowWidth, windowHeight); //extraCanvas for the hills, never erase
  extraExCanvas = createGraphics(windowWidth, windowHeight);
  ui.renderWidth = windowWidth;
  ui.renderHeight = windowHeight;

  pg = createGraphics(windowWidth, windowHeight); //pg for ripple in lakes, semi-transparent background

  saveLayer = createGraphics(windowWidth, windowHeight); //save layer create white background when save the canvas
  saveLayer.background(255); //set savelayer background to 255

  leaves = createGraphics(10, 30); //willow leaves canvas
  leaves.blendMode(DODGE); //set blendMode for leaves
  drawLeaves(); //call function

  rippleLayer = createGraphics(windowWidth, windowHeight);
  rippleLayer.background(255);

  fishboat = loadImage("fishboat.png"); //load boat image
  sunImg = loadImage("sun.png");

  let gui = new dat.GUI(); //assign value for gui

  let consoleFolder = gui.addFolder("Console"); //gui folder
  consoleFolder.add(ui, "clearCanvas").listen(); //button clear the hills
  consoleFolder.add(ui, "waterReflection").listen(); //button open water reflection
  consoleFolder.add(ui, "realisticRaindrops").listen(); //button drops type
  consoleFolder.add(ui, "autoInkSize").listen(); //button inksize automatically raise
  consoleFolder.add(ui, "inkSize").min(1).max(10).step(1).listen(); //set the circle radius of the inkParticles
  consoleFolder.add(ui, "mouseInfluence").listen(); //button mouse control the inkParticles
  consoleFolder.add(ui, "influenceLevel").min(1).max(100).step(1).listen(); //how strong the inkParticles will be influenced
  consoleFolder.add(ui, "rainAmount").min(0).max(20).step(1).listen(); //amount of rain
  consoleFolder.add(ui, "screenCapture").listen(); //button save the canvas
  consoleFolder.add(ui, "endPosition").min(0).max(1000).step(10).listen();
  consoleFolder.add(ui, "birdPath").listen();
  let dashFolder = gui.addFolder("Dashboard");
  dashFolder.add(ui, "windSpeed").listen(); //listen the wind speed
  dashFolder.add(ui, "boatSpeed").listen(); //listen the boat speed
  dashFolder.add(ui, "objectAmount").listen(); //listen the total object amount
  dashFolder.add(ui, "FPS").listen(); //listen FPS
  dashFolder.add(ui, "mouseX").listen(); //listen mouse position
  dashFolder.add(ui, "mouseY").listen(); //listen mouse position
  dashFolder.add(ui, "renderWidth").listen(); //canvasWidth
  dashFolder.add(ui, "renderHeight").listen(); //canvasHeight

  mouseVel = createVector(0, 0); //initialize mouseVel
  randomWind = createVector(0, 0); //initialize randomWind

  //willow
  for (let i = 0; i < 13; i++) {
    balls1.push(new Ball(10 + 2 * i, 30 + 30 * i, 5)); //first willow connection points
  }

  for (let i = 0; i < 12; i++) {
    springs1.push(new Spring(balls1[i], balls1[i + 1], 20)); //first willow connection lines
  }

  //willow
  for (let i = 0; i < 14; i++) {
    balls0.push(new Ball(10 + 2 * i, 30 + 30 * i, 5)); //second willow connection points
  }

  for (let i = 0; i < 13; i++) {
    springs0.push(new Spring(balls0[i], balls0[i + 1], 20)); //second willow connection lines
  }

  createCanvas(windowWidth, windowHeight);
  background(220);

  cols = ceil((width * 1.5) / RESOLUTION);
  rows = ceil((height * 1.5) / RESOLUTION);

  let birdHeight = random(height / 4, height / 2);
  for (let i = 0; i < 5; i++) {
    vehicles.push(new Vehicle(random(-80), birdHeight + random(100)));
  }

  angleMode(DEGREES); //set the angle mode to degrees
  frameRate(120); //set the frame rate
}

function draw() {
  clear(); //clear the main canvas

  image(saveLayer, 0, 0); //save layer display

  // pg.background(0, 5);
  image(pg, 0, 0); //pg layer display

  image(rippleLayer, 0, 0);
  rippleLayer.background(255, 100);

  //hills display
  // extraCanvas.background(230);//extraCanvas background

  if (ui.waterReflection) {
    push();
    // translate(0, height/4); //move downwards
    // scale(1, 0.5); //flip horizontally
    tint(255, 120);
    image(extraExCanvas, 0, 0); //flipped display
    pop();
  }

  //sun
  sun();

  image(extraCanvas, 0, 0); //extraCanvas layer display

  //hill
  hill(); //draw hill

  //fog
  // fog();

  //rains
  rain(); //draw rains

  //boats
  boat(); //draw boat

  //wind
  wind(); //calculate wind

  //willow
  willow(); //draw willow

  //cursor
  myCursor(); //draw cursor

  //updates
  updateParas(); //update parameters

  //clearCanvas
  if (ui.clearCanvas) {
    clearCanvas(); //erase mountains
  }

  birds();

  //captureCanvas
  if (ui.screenCapture) {
    saveCanvas("My Generated Ink-wash", "png");
    ui.screenCapture = false; //save canvas as png
  }
}

function sun() {
  push();
  scale(0.1);
  image(sunImg, width * 5, height * 1.2);
  pop();
}

function birds() {
  // console.log(vehicles.length);
  if (frameCount % birdFreq == 0) {
    birdFreq = round(random(3000, 4000));
    let birdHeight = random(height / 6, height / 4);
    for (let i = 0; i < 5; i++) {
      vehicles.push(
        new Vehicle(width / 3 + random(40), birdHeight + random(100))
      );
    }
  }
  // empty the angles array
  angles = [];

  // draw and update the flow field;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = c * RESOLUTION - 0.25 * width;
      let y = r * RESOLUTION;

      // angle
      let xFrq = x * FREQ_POS + frameCount * FREQ_TIME;
      let yFrq = y * FREQ_POS + frameCount * FREQ_TIME;

      let noiseValue = noise(xFrq, yFrq); // 0 to 1
      let angle;
      angle = map(noiseValue, 0, 1, -PI / 4, PI / 4); // *** why 6?
      if (r >= 8) {
        if (angle >= 0) {
          angle = -angle;
        }
      }
      angles.push(angle);

      push();

      // draw grid
      translate(x, y);
      fill(255, 0);
      stroke(0, 100);
      if (ui.birdPath) {
        rect(0, 0, RESOLUTION, RESOLUTION);
      }
      // diplay line
      translate(RESOLUTION / 2, RESOLUTION / 2);
      let vector = p5.Vector.fromAngle(angle);
      vector.mult(RESOLUTION / 2);
      stroke(0);
      if (ui.birdPath) {
        line(0, 0, vector.x, vector.y);
      }

      // draw index
      let index = angles.length;
      fill(0);
      noStroke();
      if (ui.birdPath) {
        text(index, -15, -5);
      }
      pop();
    }
  }

  // vehicles
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    let c = floor(v.pos.x / RESOLUTION);
    let r = floor(v.pos.y / RESOLUTION);
    let index = c + r * cols;
    let angle = angles[index];
    v.flow(angle);
    v.update();
    v.reappear();
    v.display();
    if (v.die) {
      vehicles.splice(i, 1);
    }
  }
}

function drawLeaves() {
  // leaves.background(200);
  leaves.translate(5, 0);
  leaves.fill(29, 65, 35);
  leaves.noStroke();
  leaves.beginShape();
  leaves.curveVertex(0, 0);
  leaves.curveVertex(0, 0);
  leaves.curveVertex(-2, 0.5);
  leaves.curveVertex(-3, 1);
  leaves.curveVertex(-5, 9);
  leaves.curveVertex(-2, 27);
  leaves.curveVertex(-1, 28);
  leaves.curveVertex(-1, 28);
  leaves.curveVertex(1, 27);
  leaves.curveVertex(1, 9);
  leaves.curveVertex(-1, 1);
  leaves.curveVertex(-2, 0.5);
  leaves.curveVertex(0, 0);
  leaves.curveVertex(0, 0);
  leaves.endShape();

  for (let i = 0; i <= 4000; i++) {
    leaves.erase();
    leaves.circle(random(-5, 5), randomGaussian(30, 8), 0.2); //add noise on leaves
    leaves.noErase();
  }
}

function willow() {
  // springs
  for (let i = 0; i < springs0.length; i++) {
    springs0[i].update();
    springs0[i].display();
  }
  for (let i = 0; i < springs1.length; i++) {
    springs1[i].update();
    springs1[i].display();
  }

  balls1[0].firm(-15, 30);

  balls1[1].applyForce(createVector(1, -1));
  balls1[2].applyForce(createVector(0.5, 0));
  balls1[5].applyForce(createVector(0.2, -1));

  balls0[0].firm(-25, 40);

  balls0[1].applyForce(createVector(1, -0.7));
  balls0[2].applyForce(createVector(0.5, 0));
  balls0[3].applyForce(createVector(0.2, 0));
  balls0[4].applyForce(createVector(0.2, 0));
  balls0[5].applyForce(createVector(0.2, -1));

  for (let i = 1; i < balls0.length; i++) {
    if (addWind) {
      let force = p5.Vector.mult(mouseVel, 0.004);
      balls0[i].applyForce(force);
    }
    balls0[i].applyGravity();
    balls0[i].updatePosition();
  }
  for (let i = 1; i < balls1.length; i++) {
    if (addWind) {
      let force = p5.Vector.mult(mouseVel, 0.004);
      balls1[i].applyForce(force);
    }
    balls1[i].applyGravity();
    balls1[i].updatePosition();
  }
  // image(leaves, 10, 10);
}

function myCursor() {
  if (mouseIsPressed) {
    noCursor();
    let i = new Cursor(mouseX, mouseY, random(6, 10));
    inkParticles.push(i);
  } else {
    noCursor();
    noStroke();
    fill(43, 60, 67, 200);
    circle(mouseX, mouseY, 15);
  }
}

function wind() {
  randomWind = createVector(
    ((noise(noiseIndex) - 0.5) * ui.rainAmount) / 100,
    0
  );

  if (mouseIsPressed) {
    addWind = true;
    ui.windSpeed = mouseVel.x;
  } else {
    addWind = false;
    ui.windSpeed = 0;
  }
}

function clearCanvas() {
  extraCanvas.clear();
  extraExCanvas.clear();
  pg.clear();
  inkParticles = [];
  hillX = 0;
  ui.clearCanvas = false;
  ui.inkSize = 1;
}

function boat() {
  if (frameCount % round((2 - abs(boatSpd)) * 20) == 0) {
    d = new Drop(boatX + 110, height * 0.75 + 80, [0, 0]);
    d.isDone = true;
    d.pos.y = height * 0.75 + 80 + cos(noiseIndex * 100) * 5;
    d.scale = 0.93;
    d.scale = 1.2
    // d.doneY = height * 0.65;
    drops.push(d);
  }
  push();
  translate(boatX, height * 0.75 + cos(noiseIndex * 100) * 5);
  scale(0.06);
  rotate((noise(noiseIndex) - 0.5) * ui.rainAmount);
  image(fishboat, -100, -50);
  pop();
  if (boatX <= width * 0.33) {
    boatAcc = noise(noiseIndex) - 0.3;
  } else {
    boatAcc = noise(noiseIndex) - 0.5;
  }
  boatSpd += boatAcc / 300;

  if (addWind) {
    boatSpd += mouseVel.x / 1000;
  }
  boatSpd += randomWind.x / 300;
  boatSpd -= boatSpd / 100;
  ui.boatSpeed = boatSpd * 10;
  boatX += boatSpd;
}

function fog() {
  for (let i = 0; i < 1; i++) {
    push();
    scale(0.5);
    translate(
      noise(noiseIndex) * 1000,
      height / 2 + noise(noiseIndex + 10) * 2
    );
    image(fog1, 0, 0);
    pop();
  }
}

function updateParas() {
  //spdCalculate
  mouseVel.x = mouseX - lastMouseX;
  mouseVel.y = mouseY - lastMouseY;
  //mouseSpd
  lastMouseX = mouseX;
  lastMouseY = mouseY;
  //windSpeed

  ui.objectAmount =
    inkParticles.length +
    drops.length +
    balls1.length +
    springs1.length +
    balls0.length +
    springs0.length;
  if (frameCount % 5 == 0) {
    ui.FPS = frameRate();
  }

  ui.mouseX = mouseX;
  ui.mouseY = mouseY;
  ui.endPosition =
    height / 2 + ui.inkSize * 30 + (noise(noiseIndex) - 0.5) * 35 - 40;
}

function rain() {
  //raindrops
  if (ui.rainAmount != 0 && frameCount % ((21 - ui.rainAmount) / 2) == 0) {
    drops.push(
      new Drop(random(-width / 2, width * 1.5), random(height / 2, height), [
        0,
        0,
      ])
    );
  }
  for (var i = 0; i < drops.length; i++) {
    var d = drops[i];
    d.heading();
    d.addForce();
    d.checkStatus();
    d.update();
    d.display();
    if (d.isFinish) {
      // remove!
      drops.splice(i, 1);
    }
  }
}

function rainDrop() {
  push();
  if (ui.realisticRaindrops) {
    scale(0.5);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(0 - 5, 0 + 10);
    curveVertex(0 - 6, 0 + 20);
    curveVertex(0, 0 + 24);
    curveVertex(0 + 6, 0 + 20);
    curveVertex(0 + 5, 0 + 10);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape();
  } else {
    stroke(0);
    strokeWeight(1);
    rotate(45);
    line(-15, -15, 10, 10);
  }
  pop();
}

function hill() {
  push();
  strokeWeight(4);
  upper = (noise(noiseIndex) * height) / 2 + height / 5;
  // stroke(131, 149, 150, 80);

  let i = new InkParticle(
    hillX,
    upper + ui.inkSize * 65 - abs(width / 2 - hillX) / 2 - 30,
    random(ui.inkSize - 2, ui.inkSize + 2)
  );
  inkParticles.push(i);

  hillX += 1;
  noiseIndex += 0.008;
  pop();

  if (hillX > width) {
    hillX = 0;
    if (ui.autoInkSize && ui.inkSize < 7) {
      ui.inkSize += 0.5;
    }else if(ui.autoInkSize && ui.inkSize >= 7){
      ui.clearCanvas = true;
    }
    // noiseIndex = 0;
  }

  for (const i of inkParticles) {
    i.addForce();
    i.update();
    i.display();
  }

  // limit
  while (inkParticles.length > 1000) {
    inkParticles.splice(0, 1);
  }

  // remove if the particle is done!
  // flip the for loop!
  for (const i of inkParticles) {
    if (i.isDone) {
      inkParticles.splice(i, 1);
    }
  }
}

class Spring {
  constructor(b1, b2, len) {
    this.b1 = b1;
    this.b2 = b2;
    this.len = len;
    this.k = 0.1; // ***
  }

  update() {
    this.force = p5.Vector.sub(this.b2.pos, this.b1.pos);
    let distance = this.force.mag();

    let stretch = distance - this.len;
    let mag = -1 * this.k * stretch; // Hooke's Law

    this.force.normalize(); // direction
    this.force.mult(mag);
    this.b2.applyForce(this.force);

    this.force.mult(-1);
    this.b1.applyForce(this.force);
  }

  display() {
    stroke(20, 43, 24);
    strokeWeight(2);
    line(this.b1.pos.x, this.b1.pos.y, this.b2.pos.x, this.b2.pos.y);
    push();

    translate(this.b2.pos.x, this.b2.pos.y);
    rotate(this.force.heading() - 70);

    image(leaves, 0 - 5, 0);
    pop();

    push();
    translate(
      (this.b2.pos.x + this.b1.pos.x) / 2,
      (this.b2.pos.y + this.b1.pos.y) / 2
    );
    rotate(this.force.heading() - 110);
    image(leaves, 0 - 5, 0);

    pop();
  }
}

//

class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    //
    this.rad = r;
    this.mass = this.rad / 10;
    //
    this.damping = 0.97; // -0.03%
    this.gravity = createVector(0, 0.3);
    this.angle = 0;
  }

  firm(x = 100, y = 100) {
    this.pos = createVector(x, y);
  }

  applyGravity() {
    this.applyForce(this.gravity);
  }

  applyForce(f) {
    if (this.mass <= 0) {
      console.log("Wrong mass!");
      return;
    }
    let force = p5.Vector.div(f, this.mass);
    this.acc.add(force); // force accumulation
  }

  adjustVelocity(amount) {
    //Coefficient of Restitution
    this.vel.mult(1 + amount);
  }

  updatePosition() {
    this.applyForce(randomWind);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // ***
    //
    this.vel.mult(this.damping);

    // this.angle += (-this.vel.heading() + 90 - this.angle)/100
  }
}

class InkParticle {
  constructor(x, y, r = 10) {
    this.pos = createVector(x, y);
    this.rad = r;
    this.initialHeight = y;
    //
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.r = 30;
    this.g = 46;
    this.b = 53;
    //
    this.lifespan = (height / 1.5 - y) / 150; // 100%
    this.lifeReduction = random(0.006, 0.018);
    this.isDone = false;
    this.trans = 255 * this.lifespan;
    //
    return this;
  }
  update() {
    this.vel.y += 0.08;
    this.updateLifespan();
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.trans = map(this.pos.y, this.initialHeight, ui.endPosition, 200, 10);
    this.r += (height - this.pos.y) / 200;
    this.g += (height - this.pos.y) / 200;
    this.b += (height - this.pos.y) / 200;
    this.pos.x += random(-1, 1);
    this.pos.y += random(-1, 1);
  }
  display() {
    if (this.pos.y < ui.endPosition) {
      extraCanvas.push();
      extraCanvas.translate(this.pos.x, this.pos.y);
      extraCanvas.noStroke();
      extraCanvas.fill(this.r, this.g, this.b, this.trans);
      extraCanvas.circle(0, 0, this.rad);
      extraCanvas.pop();

      let x = sin(this.pos.y * 20 + frameCount * 5) * 5;
      extraExCanvas.push();
      extraExCanvas.translate(
        this.pos.x,
        ui.endPosition * 1.5 - this.pos.y / 2 + 5
      );
      extraExCanvas.noStroke();
      // extraExCanvas.translate(0,ui.inkSize * 27)
      extraExCanvas.fill(this.r, this.g, this.b, 20 + ui.inkSize * 3);
      extraExCanvas.circle(x, 0, this.rad / 2);
      extraExCanvas.pop();
    }
  }
  updateLifespan() {
    this.lifespan -= this.lifeReduction;
    if (this.pos.y > ui.endPosition) {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  addForce() {
    //wind
    if (addWind && ui.mouseInfluence) {
      let force = p5.Vector.mult(mouseVel, ui.influenceLevel / 1000);
      this.acc.add(force);
    }
  }
}

class Cursor extends InkParticle {
  constructor(x, y, r = 10) {
    super(x, y, r);
    this.pos.x += random(-1, 1);
    this.pos.y += random(-1, 1);
    this.spd = mouseVel.mag();
    this.rad = random(2);
    if (!ui.mouseInfluence) {
      this.lifespan = 20;
    }
    this.endPosition = height;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(this.r, this.g, this.b, this.trans);
    circle(0, 0, this.rad);
    pop();
  }
  update() {
    // this.vel.y += 0.08;
    if (this.b >= 100) {
      this.trans -= 10;
    }
    this.rad -= 1;
    this.updateLifespan();
    this.trans -= 1;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.trans -= 4.5;
    this.r += 5;
    this.g += 5;
    this.b += 5;
    this.pos.x += random(-0.5, 0.5);
    this.pos.y += random(-0.5, 0.5);
  }
}

class Drop {
  constructor(x, y, spd) {
    this.pos = createVector(x, 0);
    this.vel = createVector(spd[0], spd[1]);
    this.acc = createVector(0, 0);
    this.gravity = createVector(0, 0.7);
    this.scale = random(0.8, 1.5);
    this.rippleY = 0;
    this.doneY = height - 200 + (this.scale - 1) * 400;
    this.isDone = false;
    this.endY = y;
  }

  update() {
    if (!this.isDone) {
      this.addForce(randomWind.mult(1.1));
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    } else {
      this.doneY += 10;
      this.rippleY += map(this.endY, height / 2, height, 4, 8);
    }
  }

  display() {
    if (this.isDone) {
      //Ripple
      rippleLayer.push();
      rippleLayer.noFill();
      // rippleLayer.strokeWeight(5);
      rippleLayer.stroke(150, this.pos.y - height / 3 - this.rippleY / 1.8);
      rippleLayer.translate(this.pos.x, this.pos.y);
      rippleLayer.scale(this.scale / 2);
      rippleLayer.ellipse(0, 0, this.rippleY * 0.5, this.rippleY * 0.12);
      rippleLayer.pop();
    } else {
      //raindrops
      push();
      noStroke();
      fill(0, 0, 0, 200);
      translate(this.pos.x, this.pos.y);
      rotate(this.angle - 90);
      scale(this.scale - 0.6);
      rainDrop();
      pop();
    }
  }

  addForce(f) {
    //gravity
    this.acc.add(this.gravity);

    //wind
    if (addWind && this.isDone == false) {
      let force = p5.Vector.mult(mouseVel, 0.02);
      this.acc.add(force);
    }

    //friction
    this.friction = createVector(this.vel.x * -0.01, this.vel.y * -0.01);
    this.acc.add(this.friction);
    this.acc.add(f);
  }

  heading() {
    this.angle = this.vel.heading();
    // console.log(this.angle)
  }

  checkStatus() {
    if (this.pos.y > this.endY) {
      this.isDone = true;
      this.vel.x = 0;
    }
    if (this.doneY > height * 2) {
      this.isFinish = true;
    }
  }
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    //
    this.mass = 1;
    this.size = 20;
    //
    this.angle = 0;
    //
    this.maxSpeed = ui.rainAmount / 60 + 0.2;
    this.maxSteerForce = 0.1;
    //
    this.die = false;
    this.size = random(0.3, 0.7);
    this.phase = random(1);
  }
  attractedTo(target) {
    let vector = p5.Vector.sub(target, this.pos);
    vector.mult(0.05);
    this.applyForce(vector);
    //
    this.vel.mult(0.9);
  }
  flow(angle) {
    let desiredVel = p5.Vector.fromAngle(angle); // direction
    desiredVel.mult(this.maxSpeed); // desire

    let steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxSteerForce);

    this.applyForce(steerForce);
  }
  seek(target) {
    let desiredVel = p5.Vector.sub(target, this.pos);
    desiredVel.normalize(); // direction
    desiredVel.mult(this.maxSpeed); // desire

    let steerForce = p5.Vector.sub(desiredVel, this.vel);
    steerForce.limit(this.maxSteerForce);

    this.applyForce(steerForce);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    //
    this.angle = this.vel.heading();
  }
  applyForce(f) {
    if (this.mass <= 0) {
      console.log("Wrong mass");
      return;
    }
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  reappear() {
    if (this.pos.x < 0) {
      // this.die = true;
    } else if (this.pos.x > width + 20) {
      this.die = true;
    }
    if (this.pos.y < -20) {
      this.die = true;
    } else if (this.pos.y > height + 20) {
      this.die = true;
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    // rotate(this.angle);
    noStroke();
    fill(20, this.size * 500);
    let zoom = map(
      abs(this.pos.x - width / 3),
      0,
      width / 2,
      -this.size,
      -this.size / 4
    );
    scale(this.size + zoom);
    let cosValue =
      cos((noiseIndex * (1 - this.size) * 2 + this.phase) * 300) + 1;
    let sinValue = cos((noiseIndex * (1 - this.size) * 2 + this.phase) * 300);
    translate(0, sinValue * 5);
    scale(0.5);
    noStroke();
    beginShape();
    curveVertex(0, 2);
    curveVertex(0, 2);
    curveVertex(3, 0);
    curveVertex(10, -15 + cosValue);
    curveVertex(20, -25 + cosValue * 6);
    curveVertex(30, -30 + cosValue * 12);
    curveVertex(40, -30 + cosValue * 14);
    curveVertex(50, -25 + cosValue * 8);
    curveVertex(40, -32 + cosValue * 12);
    curveVertex(30, -35 + cosValue * 10);
    curveVertex(20, -34 + cosValue * 5);
    curveVertex(10, -28 + cosValue);
    curveVertex(0, -17);
    curveVertex(0, -17);
    curveVertex(-10, -28 + cosValue);
    curveVertex(-20, -34 + cosValue * 5);
    curveVertex(-30, -35 + cosValue * 10);
    curveVertex(-40, -32 + cosValue * 12);
    curveVertex(-50, -25 + cosValue * 8);
    curveVertex(-40, -30 + cosValue * 14);
    curveVertex(-30, -30 + cosValue * 12);
    curveVertex(-20, -25 + cosValue * 6);
    curveVertex(-10, -15 + cosValue);
    curveVertex(-3, 0);
    curveVertex(0, 2);
    curveVertex(0, 2);
    endShape();
    pop();
  }
}
