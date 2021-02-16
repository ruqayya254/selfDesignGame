const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var girl,clouds,day
var l=3 ;
var PLAY=0;
var END=1;
var gameState=PLAY;
function preload(){
backgroundImage=loadImage("day.jpg")
cloudsImage=loadImage("clouds.png")
girlImage=loadImage("girl.png")
}

function setup(){
  var canvas = createCanvas(displayWidth,displayHeight);
  engine = Engine.create();
  world = engine.world;
  ground=createSprite(displayWidth-600,displayHeight-600,displayWidth+600,displayHeight)
  ground.addImage(backgroundImage)
  ground.velocityX=-3
  ground.scale=4;
  girl=createSprite(250,300,10,10) 
  girl.addImage(girlImage)
  girl.scale=0.2

  cloudsGroup=new Group();
  bulletsGroup=new Group();
  
}
function draw(){
  background("white");
  Engine.update(engine);
  if (gameState===PLAY){




  
if(ground.x<0){
  ground.x=ground.width/2

}

if(keyDown("left_arrow")){
  girl.x = girl.x - 3;
}

if(keyDown("right_arrow")){
  girl.x = girl.x + 3;
}

if(keyDown("space")){
  girl.velocityY = -10;

}
if (keyWentDown("space")){
  bullet=createSprite(girl.y,girl.x)
  bullet.velocityY=-4
  bulletsGroup.add(bullet)
}

spawnClouds();
  }
if(cloudsGroup.isTouching(girl)){
  l=l-1
  
}
if (gameState===END){
  ground.velocityX=0;
  cloudsGroup.setVelocityYEach(0);
  l=0

}
drawSprites()

fill("black")
text("Lives:"+l,130,50)

if (l===0){
  gameState=END;
  fill("black")
  textSize(30)
  text("GAME OVER",500,200)

}


}
function spawnClouds(){
  if(frameCount%60===0){
  clouds=createSprite(800,50,10,20)
  clouds.x=Math.round(random(10,1000))
  clouds.addImage(cloudsImage)
  clouds.scale=0.3
  clouds.velocityY=3;
  cloudsGroup.add(clouds)
}}