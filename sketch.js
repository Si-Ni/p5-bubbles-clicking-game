let width = 800;
let height = 800;
let bubbles = [];
let missed = 0;
let counter = 0;

function setup() {
  createCanvas(width, height);
  
}

function draw() {
  background(10);
  
  for(b of bubbles){
    b.show();
    if(b.grow()){
      bubbles.splice(bubbles.indexOf(b), 1);
      missed++;
    }
  }

  text(counter.toString(), 0, height - 10);
  text(missed.toString(), width-20, height - 10);
}

setInterval(() => {
  newBubble();
}, 1000);

function mousePressed() {
  let check = false;
  for(b of bubbles){
    if(b.clicked()){
      counter++;
      bubbles.splice(bubbles.indexOf(b), 1)
      check = true;
    }
  }
  if(check === false){
    missed++;
  }
}

class Bubble {
  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
  }

  clicked() {
    let d = dist(mouseX, mouseY, this.x, this.y)
    return (d < this.r/2);
  }

  grow(){
    this.r = this.r + 0.5;
    return (this.r > 120)
  }

  show(){
    noFill()
    stroke(255);
    ellipse(this.x, this.y, this.r,)
  }
}

function newBubble() {
  let x = floor(random(width));
  let y = floor(random(height));
  let r = floor(random(20, 70));

  let valid = true;
  for(bu of bubbles){
    let d = dist(x, y, bu.x, bu.y);
    if(d < bu.r/2 + r/2){
      valid = false;
      newBubble();
      break;
    }else if(x + r/2 > width-60 || x - r/2 < 60 || y + r/2 > height-60 || y - r/2 < 60){
      valid = false;
      newBubble();
      break;
    }
  }

  if(valid) {
    bubbles.push(new Bubble(x,y,r))
  }
}
