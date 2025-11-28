//BEER VOLUME
let beerLevel = 0;
let isFilling = false;
let serving = false;
let glassX = 0;
let bg;

function preload() {
  bg = loadImage("assets/Bar.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  imageMode(CORNER);
  image(bg, 0, 0, width, height); 

  noStroke();

  // Table
  for (let y = height - 150; y < height; y++) {
    let t = map(y, height - 150, height, 0, 1);
    let r = lerp(90, 40, t);
    let g = lerp(50, 20, t);
    let b = lerp(0, 10, t);
    fill(r, g, b);
    rect(0, y, width, 1);
  }

  // Glossy highlight
  fill(255, 80);
  rect(0, height - 155, width, 12);

  // Dark top edge line
  fill(25, 15, 10);
  rect(0, height - 150, width, 4);

  // Serve animation
  if (serving) {
    glassX += 10;
    if (glassX > width) {
      glassX = 0;
      beerLevel = 0;
      serving = false;
    }
  }

  // Draw bar tap
  drawTap(isFilling);

  // Glass + liquid
  push();
  translate(width / 2 + glassX, height / 2 + 40);

  // Glass shape
  fill(255, 255, 255, 20);
  stroke(90);
  strokeWeight(7);
  beginShape();
  vertex(-90, -200);
  bezierVertex(-110, 0, -80, 200, -60, 230);
  vertex(60, 230);
  bezierVertex(80, 200, 110, 0, 90, -200);
  endShape(CLOSE);

  // Liquid
  if (beerLevel > 0) {
    noStroke();
    fill(240, 180, 40, 220);
    beginShape();
    vertex(-80, -150 + (1 - beerLevel) * 300);
    bezierVertex(-95, 20, -70, 190, -50, 210);
    vertex(50, 210);
    bezierVertex(70, 190, 95, 20, 80, -150 + (1 - beerLevel) * 300);
    endShape(CLOSE);
  }

  // Foam
  if (beerLevel > 0.9) {
    drawFoam(0, -175, 85, 20);
  }

  // Bubbles
  for (let i = 0; i < 18 * beerLevel; i++) {
    let x = random(-40, 40);
    let y = random(-130, 180);
    drawBubble(x, y);
  }

  pop();


  // TEXT ON TABLE (WHITE, THICK, BOTTOM)

  textAlign(CENTER);
  stroke(255);
  strokeWeight(4);
  fill(255);

  // Volume Text
  textSize(40);
  text("🔊 " + int(beerLevel * 100) + "%", width / 2, height - 60);

  // Serve text
  if (beerLevel >= 1) {
    textSize(28);
    text("Press SPACE to serve", width / 2, height - 110);
  }

  // Update fill level
  if (isFilling && !serving) {
    beerLevel = min(1, beerLevel + 0.005);
  }
}

// Bubbles
function drawBubble(x, y) {
  fill(255, 255, 255, 80);
  noStroke();
  ellipse(x, y, random(8, 15));
}

// Foam
function drawFoam(cx, cy, w, h) {
  fill(255);
  noStroke();
  for (let i = -w; i <= w; i += 25) {
    let r = random(20, 35);
    ellipse(cx + i, cy + random(-5, 5), r, r);
  }
}

// Mouse controls
function mousePressed() {
  if (!serving) isFilling = true;
}

function mouseReleased() {
  isFilling = false;
}

// Tap drawing
function drawTap(active) {
  push();
  translate(width / 2, height / 2 - 220);
  noStroke();

  fill(180);
  rect(-20, 0, 40, 200, 10);

  push();
  rotate(active ? -0.5 : 0);
  fill(60);
  rect(-10, -70, 20, 70, 5);
  pop();

  fill(150);
  rect(-15, 200, 30, 20, 5);

  // White thick text
  stroke(255);
  strokeWeight(3);
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text('VOLUME CONTROL', 0, -90);

  pop();
}

// Serve Key
function keyPressed() {
  if (key === ' ' && beerLevel >= 1) {
    serving = true;
  }
}
