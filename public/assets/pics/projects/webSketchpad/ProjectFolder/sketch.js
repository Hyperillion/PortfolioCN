let line1 = 40;
line2 = 100;
line3 = 160;
row1 = 80;
row2 = row1 + 90;
row3 = row2 + 60;
row4 = row3 + 60;
row5 = row4 + 60;
row6 = row5 + 90;
row7 = row6 + 60;
row8 = row7 + 60;
pencil = false;
pen = false;
highlighter = false;
orange = false;
yellow = false;
theGreen = false;
theRed = false;
black = true;
lightBlue = false;
pink = false;
violet = false;
darkBlue = false;
custom = false;
erazer = false;
ruler = false;
theTriangle = false;
rfirstClick = false;
firstClick = false;
secondClick = false;
theColor = 0;
speed = 1;

let img;
function preload() {
  img = loadImage("custom.png");
}

function setup() {
  //UI
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  //Initialize
  noStroke();
  rectMode(CORNER);
  strokeWeight(1);
  frameRate(1000);

  //leftTab
  fill(230);
  rect(2, 2, 196, 596, 30);

  //brushArea
  textSize(12);

  //Pencil
  if (pencil == true) {
    stroke(0);
  } else {
    noStroke();
  }
  fill(255);
  circle(line1, row1 - 20, 50);
  fill(0);
  text("Pencil", line1 - 16, row1 + 20);
  stroke(0);
  line(line1 - 10, row1 - 43, line1 - 10, row1 - 20);
  line(line1 + 10, row1 - 43, line1 + 10, row1 - 20);
  line(line1 - 10, row1 - 20, line1 + 10, row1 - 20);
  fill(255);
  triangle(line1 - 10, row1 - 20, line1 + 10, row1 - 20, line1, row1);
  fill(0);
  triangle(line1 - 4, row1 - 10, line1 + 4, row1 - 10, line1, row1);

  //Pen
  if (pen == true) {
    stroke(0);
  } else {
    noStroke();
  }
  fill(255);
  circle(line2, row1 - 20, 50);
  fill(0);
  text("Pen", line2 - 10, row1 + 20);
  stroke(0);
  line(line2 - 10, row1 - 43, line2 - 10, row1 - 25);
  line(line2 + 10, row1 - 43, line2 + 10, row1 - 25);
  line(line2 - 10, row1 - 25, line2 + 10, row1 - 25);
  fill(255);
  beginShape();
  vertex(line2 - 5, row1 - 25);
  vertex(line2 + 5, row1 - 25);
  vertex(line2 + 8, row1 - 10);
  vertex(line2, row1);
  vertex(line2 - 8, row1 - 10);
  vertex(line2 - 5, row1 - 25);
  endShape();
  line(line2, row1, line2, row1 - 15);
  circle(line2, row1 - 15, 2);

  //Highlighter
  if (highlighter == true) {
    stroke(0);
  } else {
    noStroke();
  }
  fill(255);
  circle(line3, row1 - 20, 50);
  fill(0);
  text("Highlighter", line3 - 29, row1 + 20);
  stroke(0);
  line(line3 - 15, row1 - 40, line3 - 15, row1 - 20);
  line(line3 + 15, row1 - 40, line3 + 15, row1 - 20);
  line(line3 - 15, row1 - 20, line3 + 15, row1 - 20);
  quad(
    line3 - 10,
    row1 - 20,
    line3 + 10,
    row1 - 20,
    line3 + 10,
    row1 - 8,
    line3 - 10,
    row1
  );

  //separationLine1
  stroke(150);
  line(15, row1 - 55, 185, row1 - 55);
  fill(20);

  textSize(12);
  noStroke();
  text("Brushes", 78, row1 - 60);

  //colorArea
  //Orange
  fill(255);
  circle(line1, row2, 50);
  fill(255, 93, 19);
  if (orange == true) {
    circle(line1, row2, 50);
  } else {
    circle(line1, row2, 30);
  }

  //Yellow
  fill(255);
  circle(line2, row2, 50);
  fill(252, 254, 46);
  if (yellow == true) {
    circle(line2, row2, 50);
  } else {
    circle(line2, row2, 30);
  }

  //Green
  fill(255);
  circle(line3, row2, 50);
  fill(29, 255, 41);
  if (theGreen == true) {
    circle(line3, row2, 50);
  } else {
    circle(line3, row2, 30);
  }

  //Red
  fill(255);
  circle(line1, row3, 50);
  fill(255, 0, 0);
  if (theRed == true) {
    circle(line1, row3, 50);
  } else {
    circle(line1, row3, 30);
  }

  //Black
  fill(255);
  circle(line2, row3, 50);
  fill(0);
  if (black == true) {
    circle(line2, row3, 50);
  } else {
    circle(line2, row3, 30);
  }

  //lightBlue
  fill(255);
  circle(line3, row3, 50);
  fill(72, 252, 230);
  if (lightBlue == true) {
    circle(line3, row3, 50);
  } else {
    circle(line3, row3, 30);
  }

  //Pink
  fill(255);
  circle(line1, row4, 50);
  fill(251, 16, 126);
  if (pink == true) {
    circle(line1, row4, 50);
  } else {
    circle(line1, row4, 30);
  }

  //Violet
  fill(255);
  circle(line2, row4, 50);
  fill(132, 0, 252);
  if (violet == true) {
    circle(line2, row4, 50);
  } else {
    circle(line2, row4, 30);
  }

  //darkBlue
  fill(255);
  circle(line3, row4, 50);
  fill(45, 0, 251);
  if (darkBlue == true) {
    circle(line3, row4, 50);
  } else {
    circle(line3, row4, 30);
  }

  //Custom
  fill(255);
  stroke(0);
  strokeWeight(1);
  rectMode(CENTER);
  imageMode(CENTER);
  textSize(30);
  image(img, line2, row5);
  text("CUSTOM", line2 - 63, row5 + 12);
  if (custom == true) {
    fill(255, 0);
    stroke(0);
    rect(line2, row5, 170, 50, 50);
  }

  //separationLine2
  stroke(150);
  line(15, row1 + 50, 185, row1 + 50);

  textSize(12);
  noStroke();
  fill(20);
  text("Colors", 81, row1 + 45);

  //toolArea
  //Eraser
  if (erazer == true) {
    stroke(0);
  } else {
    noStroke();
  }
  fill(255);
  circle(line1, row6, 50);
  fill(0);
  text("Erazer", line1 - 17, row6 + 40);
  //icon
  fill(0);
  stroke(0);
  rect(line1, row6 - 2, 10, 14);
  fill(255);
  rect(line1, row6 + 7, 10, 5);

  //Ruler
  if (ruler == true) {
    stroke(0);
  } else {
    noStroke();
  }
  fill(255);
  circle(line2, row6, 50);
  fill(0);
  text("Ruler", line2 - 13, row6 + 40);
  //icon
  fill(255);
  stroke(0);
  rect(line2, row6, 10, 35);
  line(line2 - 5, row6, line2 + 2, row6);
  line(line2 - 5, row6 - 5, line2 + 2, row6 - 5);
  line(line2 - 5, row6 - 10, line2 + 2, row6 - 10);
  line(line2 - 5, row6 + 5, line2 + 2, row6 + 5);
  line(line2 - 5, row6 + 10, line2 + 2, row6 + 10);

  //Triangle
  if (theTriangle == true) {
    stroke(0);
  } else {
    noStroke();
  }
  fill(255);
  circle(line3, row6, 50);
  fill(0);
  text("Triangle", line3 - 20, row6 + 40);
  //icon
  fill(255);
  stroke(0);
  triangle(line3, row6 - 15, line3 - 10, row6 + 13, line3 + 10, row6 + 13);

  //Clear
  fill(255);
  rect(line2, row8, 170, 50, 50);
  textSize(30);
  fill(0);
  text("Clear", line2 - 35, row8 + 10);

  //separationLine3
  stroke(150);
  line(15, row5 + 50, 185, row5 + 50);

  textSize(12);
  noStroke();
  fill(20);
  text("Tools", 86, row5 + 45);

  //interactive
  //pencilButtons
  if (
    (mouseX - line1) * (mouseX - line1) +
      (mouseY - row1 + 20) * (mouseY - row1 + 20) <
    625
  ) {
    noStroke();
    fill(0);
    circle(line1, row1 - 20, 50);
    fill(255);
    stroke(255);
    line(line1 - 10, row1 - 43, line1 - 10, row1 - 20);
    line(line1 + 10, row1 - 43, line1 + 10, row1 - 20);
    line(line1 - 10, row1 - 20, line1 + 10, row1 - 20);
    fill(0);
    triangle(line1 - 10, row1 - 20, line1 + 10, row1 - 20, line1, row1);
    fill(255);
    triangle(line1 - 4, row1 - 10, line1 + 4, row1 - 10, line1, row1);
  }

  //penButtons
  if (
    (mouseX - line2) * (mouseX - line2) +
      (mouseY - row1 + 20) * (mouseY - row1 + 20) <
    625
  ) {
    noStroke();
    fill(0);
    circle(line2, row1 - 20, 50);
    fill(255);
    stroke(255);
    line(line2 - 10, row1 - 43, line2 - 10, row1 - 25);
    line(line2 + 10, row1 - 43, line2 + 10, row1 - 25);
    line(line2 - 10, row1 - 25, line2 + 10, row1 - 25);
    fill(0);
    beginShape();
    vertex(line2 - 5, row1 - 25);
    vertex(line2 + 5, row1 - 25);
    vertex(line2 + 8, row1 - 10);
    vertex(line2, row1);
    vertex(line2 - 8, row1 - 10);
    vertex(line2 - 5, row1 - 25);
    endShape();
    line(line2, row1, line2, row1 - 15);
    circle(line2, row1 - 15, 2);
  }

  //highlighterButton
  if (
    (mouseX - line3) * (mouseX - line3) +
      (mouseY - row1 + 20) * (mouseY - row1 + 20) <
    625
  ) {
    noStroke();
    fill(0);
    circle(line3, row1 - 20, 50);
    fill(255);
    stroke(255);
    line(line3 - 15, row1 - 40, line3 - 15, row1 - 20);
    line(line3 + 15, row1 - 40, line3 + 15, row1 - 20);
    line(line3 - 15, row1 - 20, line3 + 15, row1 - 20);
    quad(
      line3 - 10,
      row1 - 20,
      line3 + 10,
      row1 - 20,
      line3 + 10,
      row1 - 8,
      line3 - 10,
      row1
    );
  }

  //erazerButton
  if (dist(mouseX, mouseY, line1, row6) < 25) {
    noStroke();
    fill(0);
    circle(line1, row6, 50);
    fill(255);
    stroke(255);
    rect(line1, row6 - 2, 10, 14);
    fill(0);
    rect(line1, row6 + 7, 10, 5);
  }

  //rulerButton
  if (dist(mouseX, mouseY, line2, row6) < 25) {
    noStroke();
    fill(0);
    circle(line2, row6, 50);
    fill(0);
    stroke(255);
    rect(line2, row6, 10, 35);
    line(line2 - 5, row6, line2 + 2, row6);
    line(line2 - 5, row6 - 5, line2 + 2, row6 - 5);
    line(line2 - 5, row6 - 10, line2 + 2, row6 - 10);
    line(line2 - 5, row6 + 5, line2 + 2, row6 + 5);
    line(line2 - 5, row6 + 10, line2 + 2, row6 + 10);
  }

  //TriangleButton
  if (dist(mouseX, mouseY, line3, row6) < 25) {
    noStroke();
    fill(0);
    circle(line3, row6, 50);
    fill(0);
    stroke(255);
    triangle(line3, row6 - 15, line3 - 10, row6 + 13, line3 + 10, row6 + 13);
  }

  //clearButton
  if (
    dist(mouseX, mouseY, line1, row8) < 25 ||
    dist(mouseX, mouseY, line3, row8) < 25 ||
    (mouseX < 160 && mouseX > 40 && mouseY < row8 + 25 && mouseY > row8 - 25)
  ) {
    fill(0);
    rect(line2, row8, 170, 50, 50);
    textSize(30);
    fill(255);
    stroke(255);
    text("Clear", line2 - 35, row8 + 10);
  }

  //pencilDrawing
  if (pencil == true && mouseIsPressed) {
    stroke(theColor);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  //penDrawing
  if (pen == true && mouseIsPressed) {
    stroke(theColor);
    distance = dist(pmouseX, pmouseY, mouseX, mouseY);
    speed = speed * 0.98 + distance * 0.08;
    strokeWeight(20 - speed);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  //highlighterDrawing
  if (highlighter == true && mouseIsPressed) {
    stroke(theColor);
    strokeWeight(40);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  //erazerDrawing
  if (erazer == true && mouseIsPressed) {
    stroke(255);
    strokeWeight(40);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function mouseClicked() {
  //pencil
  if (dist(mouseX, mouseY, line1, row1 - 20) < 25) {
    pencil = !pencil;
    pen = false;
    highlighter = false;
    erazer = false;
    ruler = false;
    theTriangle = false;
  }

  //pen
  else if (dist(mouseX, mouseY, line2, row1 - 20) < 25) {
    pen = !pen;
    pencil = false;
    highlighter = false;
    erazer = false;
    ruler = false;
    theTriangle = false;
  }

  //Highlighter
  else if (dist(mouseX, mouseY, line3, row1 - 20) < 25) {
    highlighter = !highlighter;
    pen = false;
    pencil = false;
    erazer = false;
    ruler = false;
    theTriangle = false;
  }

  //Orange
  else if (dist(mouseX, mouseY, line1, row2) < 25) {
    orange = true;
    yellow = false;
    theGreen = false;
    theRed = false;
    black = false;
    lightBlue = false;
    pink = false;
    violet = false;
    darkBlue = false;
    custom = false;
    theColor = color(255, 93, 19);
  }

  //Yellow
  else if (dist(mouseX, mouseY, line2, row2) < 25) {
    orange = false;
    yellow = true;
    theGreen = false;
    theRed = false;
    black = false;
    lightBlue = false;
    pink = false;
    violet = false;
    darkBlue = false;
    custom = false;
    theColor = color(252, 254, 46);
  }

  //Green
  else if (dist(mouseX, mouseY, line3, row2) < 25) {
    orange = false;
    yellow = false;
    theGreen = true;
    theRed = false;
    black = false;
    lightBlue = false;
    pink = false;
    violet = false;
    darkBlue = false;
    custom = false;
    theColor = color(29, 255, 41);
  }

  //theRed
  else if (dist(mouseX, mouseY, line1, row3) < 25) {
    orange = false;
    yellow = false;
    theGreen = false;
    theRed = true;
    black = false;
    lightBlue = false;
    pink = false;
    violet = false;
    darkBlue = false;
    custom = false;
    theColor = color(255, 0, 0);
  }

  //Black
  else if (dist(mouseX, mouseY, line2, row3) < 25) {
    orange = false;
    yellow = false;
    theGreen = false;
    theRed = false;
    black = true;
    lightBlue = false;
    pink = false;
    violet = false;
    darkBlue = false;
    custom = false;
    theColor = color(0);
  }

  //lightBlue
  else if (dist(mouseX, mouseY, line3, row3) < 25) {
    orange = false;
    yellow = false;
    theGreen = false;
    theRed = false;
    black = false;
    lightBlue = true;
    pink = false;
    violet = false;
    darkBlue = false;
    custom = false;
    theColor = color(72, 252, 230);
  }

  //Pink
  else if (dist(mouseX, mouseY, line1, row4) < 25) {
    orange = false;
    yellow = false;
    theGreen = false;
    theRed = false;
    black = false;
    lightBlue = false;
    pink = true;
    violet = false;
    darkBlue = false;
    custom = false;
    theColor = color(251, 16, 126);
  }

  //Violet
  else if (dist(mouseX, mouseY, line2, row4) < 25) {
    orange = false;
    yellow = false;
    theGreen = false;
    theRed = false;
    black = false;
    lightBlue = false;
    pink = false;
    violet = true;
    darkBlue = false;
    custom = false;
    theColor = color(132, 0, 252);
  }

  //darkBlue
  else if (dist(mouseX, mouseY, line3, row4) < 25) {
    orange = false;
    yellow = false;
    theGreen = false;
    theRed = false;
    black = false;
    lightBlue = false;
    pink = false;
    violet = false;
    darkBlue = true;
    custom = false;
    theColor = color(45, 0, 251);
  }

  //Custom
  while (
    dist(mouseX, mouseY, line1, row5) < 25 ||
    dist(mouseX, mouseY, line3, row5) < 25 ||
    (mouseX < 160 && mouseX > 40 && mouseY < row5 + 25 && mouseY > row5 - 25)
  ) {
    theColor = prompt("Please input a HEX color code. Sample: #FFFFFF");
    if (theColor == null) {
      continue;
    } else {
      orange = false;
      yellow = false;
      theGreen = false;
      theRed = false;
      black = false;
      lightBlue = false;
      pink = false;
      violet = false;
      darkBlue = false;
      custom = true;
      break;
    }
  }

  //Erazer
  if (dist(mouseX, mouseY, line1, row6) < 25) {
    pencil = false;
    pen = false;
    highlighter = false;
    erazer = !erazer;
    ruler = false;
    theTriangle = false;
  }

  //Ruler
  else if (dist(mouseX, mouseY, line2, row6) < 25) {
    pen = false;
    pencil = false;
    highlighter = false;
    erazer = false;
    ruler = !ruler;
    theTriangle = false;
  }

  //Triangle
  else if (dist(mouseX, mouseY, line3, row6) < 25) {
    highlighter = false;
    pen = false;
    pencil = false;
    erazer = false;
    ruler = false;
    theTriangle = !theTriangle;
  }

  //Clear
  else if (
    dist(mouseX, mouseY, line1, row8) < 25 ||
    dist(mouseX, mouseY, line3, row8) < 25 ||
    (mouseX < 160 && mouseX > 40 && mouseY < row8 + 25 && mouseY > row8 - 25)
  ) {
    background(255);
  }

  //rulerDrawing
  if (ruler == true && rfirstClick == false && mouseX > 200) {
    rfirstClick = !rfirstClick;
    startX = mouseX;
    startY = mouseY;
    fill(theColor);
    circle(startX, startY, 10);
  } else if (ruler == true && rfirstClick == true) {
    stroke(theColor);
    strokeWeight(10);
    line(startX, startY, mouseX, mouseY);
    rfirstClick = false;
  }

  //triangleDrawing
  if (
    theTriangle == true &&
    firstClick == false &&
    secondClick == false &&
    mouseX > 200
  ) {
    firstClick = !firstClick;
    startX = mouseX;
    startY = mouseY;
    fill(theColor);
    circle(startX, startY, 10);
  } else if (
    theTriangle == true &&
    firstClick == true &&
    secondClick == false
  ) {
    andX = mouseX;
    andY = mouseY;
    fill(theColor);
    circle(andX, andY, 10);
    stroke(theColor);
    strokeWeight(10);
    line(startX, startY, mouseX, mouseY);
    secondClick = !secondClick;
  } else if (theTriangle == true && firstClick == true && secondClick == true) {
    stroke(theColor);
    strokeWeight(10);
    fill(0, 0);
    triangle(startX, startY, andX, andY, mouseX, mouseY);
    firstClick = false;
    secondClick = false;
  }
}
