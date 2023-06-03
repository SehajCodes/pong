//Sehajdeep Singh

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(255, 0, 115);

  randomBool = random(0, 1) < 0.5
  console.log(randomBool)
  if (randomBool) {
    sign = 1
  } else {
    sign = -1
  }
  changeX = sign * windowWidth/100;

  randomBool = random(0, 1) < 0.5
  console.log(randomBool)
  if (randomBool) {
    sign = 1
  } else {
    sign = -1
  }
  changeY = sign * windowHeight/70;

  spotX = random(windowWidth*1/4, windowWidth*3/4);
  spotY = random(windowHeight*1/8, windowHeight*7/8);

  paddleW = windowWidth/25
  paddleH = windowHeight/4
  
  Y = windowHeight/2
  leftPaddleY = Y
  rightPaddleY = Y

  rectMode(CENTER)
}

function draw() {
  
  background(151, 244, 247)
  stroke(69)
  strokeWeight(4)
  line(windowWidth/2, 0, windowWidth/2, windowHeight)
  noStroke();

  if (keyIsDown(087) && leftPaddleY > paddleH/2) {
    leftPaddleY = leftPaddleY - windowHeight/70
  }
  if (keyIsDown(083) && leftPaddleY < windowHeight-paddleH/2) {
    leftPaddleY = leftPaddleY + windowHeight/70
  }
  
  
  if (keyIsDown(UP_ARROW) && rightPaddleY > paddleH/2) {
    rightPaddleY = rightPaddleY - windowHeight/70
  }
  if (keyIsDown(DOWN_ARROW) && rightPaddleY < windowHeight-paddleH/2) {
    rightPaddleY = rightPaddleY + windowHeight/70
  }

  if (touches.length>0) {
    for (let i = 0; i<touches.length; i++) {
      if (touches[i].x < windowWidth/2 && touches[i].y < leftPaddleY && leftPaddleY > paddleH/2) {
        leftPaddleY = leftPaddleY - windowHeight/70
      }
      if (touches[i].x < windowWidth/2 && touches[i].y > leftPaddleY && leftPaddleY < windowHeight-paddleH/2) {
        leftPaddleY = leftPaddleY + windowHeight/70
      }
      if (touches[i].x > windowWidth/2 && touches[i].y < rightPaddleY && rightPaddleY > paddleH/2) {
        rightPaddleY = rightPaddleY - windowHeight/70
      }
      if (touches[i].x > windowWidth/2 && touches[i].y > rightPaddleY && rightPaddleY < windowHeight-paddleH/2) {
        rightPaddleY = rightPaddleY + windowHeight/70
      }
  }
}

  var tempX = changeX
  var tempY = changeY

  if (keyIsDown(32)) {
    tempX = changeX / 4
    tempY = changeY / 4
    console.log("slow mo")
  }
  
  //Horizontal Change
  spotX = spotX + tempX;
  
  //to prevent the circle from clipping to X border
  if (spotX > windowWidth-paddleW-windowHeight/32) {
    spotX = windowWidth-paddleW-windowHeight/32
  }
  if (spotX < paddleW+windowHeight/32) {
    spotX = paddleW+windowHeight/32
  }
  
  //var changeX will become changeX*-1 if conditions satisfied, else page setup() will be called
  if (spotX == paddleW+windowHeight/32) {
    if (leftPaddleY-paddleH/2-windowHeight/32<spotY && spotY<leftPaddleY+paddleH/2+windowHeight/32) {
    changeX = changeX * -1
    } else {
      prevLeftPaddleY = leftPaddleY
      prevRightPaddleY = rightPaddleY
      setup()
      leftPaddleY = prevLeftPaddleY
      rightPaddleY = prevRightPaddleY
      }
  }
  if (spotX == windowWidth-paddleW-windowHeight/32) {
    if (rightPaddleY-paddleH/2-windowHeight/32<spotY && spotY<rightPaddleY+paddleH/2+windowHeight/32) {
      changeX = changeX * -1
    } else {
      prevLeftPaddleY = leftPaddleY
      prevRightPaddleY = rightPaddleY
      setup()
      leftPaddleY = prevLeftPaddleY
      rightPaddleY = prevRightPaddleY
    }
  }

  //Vertical Change
  spotY = spotY + tempY;

  //to prevent the circle from clipping to Y border
  if (spotY < windowHeight*1/32) {
    spotY = windowHeight*1/32
  }
  if (spotY > windowHeight*31/32) {
    spotY = windowHeight*31/32
  }
  //var changeY will become changeY*-1
  if (spotY == windowHeight*31/32 || spotY == windowHeight*1/32) {
    changeY = changeY * -1
  }

  rect(paddleW/2, leftPaddleY, paddleW, paddleH)
  rect(windowWidth-paddleW/2, rightPaddleY, paddleW, paddleH)
  ellipse(spotX, spotY, windowHeight/16)

  fill(0)
  textSize(32)
  text('W', 10, 40)
  text("S", 10, windowHeight-20)
  text("↑", windowWidth-35, 40)
  text("↓", windowWidth-35, windowHeight-20)
  textAlign(CENTER)
  text("Hold SPACEBAR for slow-mo", windowWidth/2, windowHeight-20)
  textAlign(LEFT)
  fill(255, 0, 115);
}

function windowResized() {
  setup()
}
