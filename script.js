let canvasHeight = 440;
let canvasWidth = 700;

let pipes = [];
let frames = 0;
let seconds = 0;
let counter = 0;
let currentPipe;

let gravity = 1;
let flying = 0;
let MRcubeYpos = 200;

let gat;

class Pipe {
  constructor(xPos, yPos, height){
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 50;
    this.height = height;
  }
  
  display(){
    fill(50, 180, 80);
    rect(this.xPos -= 5, this.yPos, this.width, this.height)
  }
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  // functie geeft een wilikeurig getal tussen 2 gegeven getallen
}

function checkCollision(pipe) {
  // Checkt of coordinaten + dimensies overlappen tussen pipe en cube
  if (
    MRcubeYpos < pipe.yPos + pipe.height &&
    MRcubeYpos + 40 > pipe.yPos &&
    80 < pipe.xPos + pipe.width &&
    120 > pipe.xPos
  ) {
    // Gevolg van collision word behandeld in gameOver() function
    gameOver();
  }
}
  
function setup() {
  createCanvas(canvasWidth, canvasHeight); // maak canvas aan
}

function draw() {
  // frames per second
  frames += 1;
  seconds = frames/60; // maak van 60 frams p/s 1 seconden
  timer = Math.ceil(seconds); // rond secondes af
  text(timer, 100, 100); // zet tijd op scherm
  
  // check keypresses
  if (keyIsDown(UP_ARROW)){
        flying = 5; // tussen 5 en 15
      }
  
  // code for MRcube
  if (flying != 0) {
    gravity = 1;
    Xmultiplier += 0.05; // of 0,03
  }
  else{
    gravity += 0.03;
    Xmultiplier = 1;
  }
  MRcubeYpos += 3 * gravity;
  
  if (flying != 0 ){
    flying -= 1;
    MRcubeYpos -= 5 * Xmultiplier;
  }
  
  if (MRcubeYpos <= 1) {
    MRcubeYpos = 1;
  } else if (MRcubeYpos >= 399) {
    MRcubeYpos = 399;
  }
 
  // code for pipes
  counter += 1;
  gat = randomInteger(0, 300)
  if (counter >= 75) { // kijkt of counter hoger of gelijk is aan 75
    pipe = new Pipe(700, 0, gat); // maak pipe boven
    pipes.push(pipe); // sla pipe boven op
    pipe = new Pipe(700, gat+130, 440-gat); // maak pipe beneden
    pipes.push(pipe); //. sla pipe beneden op
    counter = 0; // reset de counter naar 0
  }
  
  
  // draw code
  background(220);
  fill(255, 220, 115); 
  rect(80, MRcubeYpos, 40, 40);
  
  
  for (let i = 0; i < pipes.length; i++){
    currentPipe = pipes[i];
    currentPipe.display();
    checkCollision(currentPipe);
  }

  fill(0, 0, 0);
  text(timer, 10, 20); // display tijd
 }

function gameOver() {
  // als gameOver() word geroepen worden Ypos, pipes en frames gereset
  MRcubeYpos = 200;
  pipes = [];
  frames = 0;
}