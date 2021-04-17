var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var foodGroup;
var obstacleGroup
var score;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;

  foodGroup = new Group();
  obstacleGroup = new Group();
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  score = 0;
  
}

function draw() { 
  background(0);
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,550,50);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);


    if(foodGroup.isTouching(player)){

      foodGroup.destroyEach();
      score = score+2;
      player.scale += 0.1;

    }

    if(obstacleGroup.isTouching(player)){

      gameState = END;
    }
    





    spawnFood();
    spawnObstacle();
  }

  else if(gameState=== END){

    backgr.velocityX = 0;
    player.visible = false;

    foodGroup.destroyEach();
    obstacleGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over!",  300,220);

  }

  
}

function spawnFood()
{
if(frameCount % 80 == 0)
{
  var banana = createSprite(600,250,50,50);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.velocityX = -4;
  banana.scale = 0.05;
  player.depth = banana.depth + 1;
  foodGroup.add(banana);
  banana.lifetime = 300;

}
}
function spawnObstacle()
{
if(frameCount % 300 == 0)
{
  var obstacle = createSprite(800,350,50,50);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -4;
  obstacle.scale = 0.2;
  player.depth = obstacle.depth + 1;
  obstacleGroup.add(obstacle);
  obstacle.lifetime = 300;
  obstacleGroup.add(obstacle);

}
}
