let angleTarget = 0;
let camZ = 2;
let zoomTarget = 900;
let rot = 2;
let camY = -250;
let camYTarget = -250;
let toniModel; 
let pattern;
let scrollX = 0;
const scrollSpeed = 0.3;
const tileWidth = 200;



function preload() {
  toniModel = loadModel("ToniAreal.obj", true);
}

function setup() {
  createCanvas(1400, 600, WEBGL);

  // TEXTURE
  pattern = createGraphics(1000, 1000);
  pattern.background(255); 
  pattern.textAlign(CENTER, CENTER);
  pattern.textSize(25);
  pattern.fill(0);
  for (let y = 0; y < 300; y += 30) {
    for (let x = 0; x < 300; x += 100) {
      pattern.text("ZHDK", x + 1, y + 2);
    }
  }
}

function draw() {
  background(255, 255, 110);
  updatePattern();

  push();
  texture(pattern);
  noStroke();
  pop();

	
  // CAMERA
camZ = lerp(camZ, zoomTarget, 0.01);
camY = lerp(camY, camYTarget, 0.02);   // smooth movement
camera(0, camY, camZ, 10, 0, 0, 0, 1, 0);
rot = lerp(rot, angleTarget, 0.01);
rotateY(rot);





  // LIGHTING
  ambientLight(200);
  directionalLight(255, 255, 255, 0.5, -10, -0.4);

  drawToniAreal();
}

// INTERACTION
function mousePressed() {
  zoomTarget = 700;
  angleTarget = PI / 35;
  camYTarget = -80;     // smoothly go lower
}

function mouseReleased() {
  zoomTarget = 900;
  angleTarget = 0;
  camYTarget = -250;    // smoothly go back up
}

// TONI AREAL MODEL
function drawToniAreal() {
  push();
  translate(-40, -200, 300);
  rotateY(radians(-80));
  rotateX(HALF_PI);
  push();
  scale(2, -2, 2);
  texture(pattern);
  noStroke();
  model(toniModel);
  pop();
}

function updatePattern() {
  scrollX += scrollSpeed;  // speed of scrolling

  if (scrollX <= -tileWidth) {
    scrollX += tileWidth;  // seamless loop
  }

  pattern.background(255);
  pattern.textSize(64);
  pattern.fill(0);
  pattern.noStroke();

  pattern.push();
  pattern.translate(scrollX, 0);  // actual scrolling

  for (let y = 0; y < pattern.height + 60; y += 60) {
    for (let x = -tileWidth * 2; x < pattern.width + tileWidth * 2; x += tileWidth) {
      pattern.text("ZHDK", x, y);
    }
  }

  pattern.pop();  // <-- REQUIRED!
}