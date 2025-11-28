// SETTINGS
let patternText = "ZHDK";   
let pressedText = "TONI";   

// MODEL
let toniModel;
let autoRot = 0;

// TEXTURE
let pattern;
let scrollX = 0;
let bgScrollX = 0;
let tileWidth = 200;
const baseScrollSpeed = 0.3;

function preload() {
  toniModel = loadModel("ToniAreal.obj", true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pattern = createGraphics(1000, 1000);
}

// BACKGROUND PATTERN
function drawBackgroundPattern() {
  resetMatrix();
  translate(-width / 2, -height / 2);

  let speed = mouseIsPressed ? 1.2 : 0.5;
  let fall = mouseIsPressed ? 30 : 0;

  let currentText = mouseIsPressed ? pressedText : patternText;

  bgScrollX -= speed;
  if (bgScrollX < -tileWidth) bgScrollX += tileWidth;

  textSize(64);
  fill(0);
  noStroke();

  push();
  translate(bgScrollX, fall);

  for (let y = 0; y < height + 60; y += 60) {
    for (let x = -tileWidth * 2; x < width + tileWidth * 2; x += tileWidth) {
      text(currentText, x, y);
    }
  }

  pop();
}

// DRAW
function draw() {
  background(255, 255, 110);

  drawBackgroundPattern();
  updatePattern();

  camera(0, 0, 800, 0, 0, 0, 0, 1, 0);

  ambientLight(200);
  directionalLight(255, 255, 255, 0.5, -1, -1, -0.3);

  autoRot += 0.003;

  push();
  texture(pattern);

  translate(0, 0, 0);
  rotateZ(PI);
  rotateX(radians(-80));
  rotateZ(radians(-mouseX));
  scale(3, -3, 3);
  noStroke();
  model(toniModel);

  pop();
}

// TEXTURE UPDATE
function updatePattern() {
  let speed = mouseIsPressed ? baseScrollSpeed * 4 : baseScrollSpeed;
  let fall = mouseIsPressed ? 40 : 0;

  let currentText = mouseIsPressed ? pressedText : patternText;

  scrollX -= speed;
  if (scrollX < -tileWidth) scrollX += tileWidth;

  pattern.background(255);
  pattern.textSize(64);
  pattern.fill(0);
  pattern.noStroke();

  pattern.push();
  pattern.translate(scrollX, fall);

  for (let y = 0; y < pattern.height + 60; y += 60) {
    for (let x = -tileWidth * 2; x < pattern.width + tileWidth * 2; x += tileWidth) {
      pattern.text(currentText, x, y);
    }
  }

  pattern.pop();
}

// RESIZE
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
