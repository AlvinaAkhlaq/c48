var bgImg;
var bg
var shooterImg, shooter
var shootingImg
var zombieGroup, zombie,zombieImg
var bulletGroup
var h1,h2,h3 
var h1img, h2img, h3img
var gamestate="fight"
var bullets = 25
var bulletImg
var life=3
var loose, win, explosion
var score=0

function preload(){
bgImg = loadImage("assets/bg.jpeg");
shooterImg = loadImage("assets/shooter_2.png")
shootingImg=loadImage("assets/shooter_3.png")
zombieImg= loadImage("assets/zombie.png")
h1img = loadImage("assets/heart_1.png")
h2img = loadImage("assets/heart_2.png")
h3img = loadImage("assets/heart_3.png")
bulletImg= loadImage("bulletBg.png")
loose = loadSound("assets/lose.mp3")
win= loadSound("assets/win.mp3")
explosion= loadSound("assets/explosion.mp3")

}

function setup(){
createCanvas(windowWidth,windowHeight);
bg=createSprite(windowWidth/2,windowHeight/2,45,45);
bg.addImage("background",bgImg);

shooter=createSprite(windowWidth/4, windowHeight-150,50,60);
shooter.scale=0.5
shooter.addImage("player",shooterImg);
shooter.setCollider("rectangle",0,0,300,400);
shooter.debug=false
shooter.addImage("playing",shootingImg)

zombieGroup = new Group();
bulletGroup = new Group ();

h1= createSprite(displayWidth-500,40,20,20);
h1.addImage("heart1",h1img);
h1.visible= false
h1.scale=0.2

h2= createSprite(displayWidth-450,40,20,20);
h2.addImage("heart2",h2img);
h2.visible= false
h2.scale=0.2

h3= createSprite(displayWidth-500,40,20,20);
h3.addImage("heart3",h3img);
h3.scale=0.2


}

function draw(){
  background("black");
if (gamestate === "fight"){
  if(life===3){
 h3.visible= true;
 h2.visible= false;
 h1.visible= false;
  }

  if(life===2){
    h3.visible= false;
    h2.visible= true;
    h1.visible= false;
     }

     if(life===1){
      h3.visible= false;
      h2.visible= false;
      h1.visible= true;
       }

       if(life===0){
        gamestate="lost";
       }

       if(score===100){
        gamestate="won";
        win.play();
       }

if(keyDown("up")||touches.length>0){
  shooter.y=shooter.y-3;
}

if(keyDown("down")||touches.length<0){
  shooter.y=shooter.y+3;
}

if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150, shooter.y-30,20,10);
  bullet.addImage("shoot",bulletImg)
  bullet.scale=0.1
  bullet.velocityX=10;
bulletGroup.add(bullet);
shooter.depth = bullet.depth;
shooter.depth= shooter.depth+2;
  shooter.changeImage("playing",shootingImg);
 bullets= bullets-1
 explosion.play()
}

else if(keyWentUp("space")){
  shooter.changeImage("player",shooterImg)
}

if(bullets===0){
  gamestate="bullet"
  loose.play();
}

if(zombieGroup.isTouching(bulletGroup)){
  for(i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
      explosion.play()
      score=score+5
    }
  }
}

if(zombieGroup.isTouching(shooter)){
  loose.play()
  for(i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(shooter)){
      zombieGroup[i].destroy();
   life=life-1
}
  }}

enemy();}

  drawSprites();
  textSize(20)
  fill("white")
  text("Bullets="+bullets,displayWidth-500,displayHeight/2-250)
  text("Score="+score,displayWidth-500,displayHeight/2-220)
  text("Lives="+life,displayWidth-500,displayHeight/2-280)

  

  if(gamestate==="lost"){
    textSize(100);
    fill("white");
    stroke("red");
    text("You Lost!", 350,400);
    zombieGroup.destroyEach();
    shooter.destroy();
  }
else if(gamestate==="won"){
  textSize(100);
    fill("green");
    stroke("yellow");
    text("YOU WON!", 350,400);
    shooter.destroy(); 
    zombieGroup.destroyEach()
}


  else if(gamestate==="bullet"){
    textSize(100);
    fill("blue");
    stroke("yellow");
    text("You ran out of bullets!", 100,410);
    bulletGroup.destroyEach();
    shooter.destroy(); 
    zombieGroup.destroyEach()
  }


    stroke("white");
    fill("red");
    textSize(20)
    text("Hint: Shoot the head of the zombie",25, windowHeight-30)
  



}

function enemy(){
  if(frameCount%80===0){
zombie=createSprite(random(500,1000),random(300,500),50,50);
zombie.addImage("enemy",zombieImg);
zombie.scale=0.2
zombie.velocityX= -3;
zombie.lifetime=400;
zombie.setCollider("rectangle",0,-300,400,200);
zombie.debug=false;
zombieGroup.add(zombie);
  }
}

