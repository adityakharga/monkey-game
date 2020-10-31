var monkey , monkey_running,bg,bgImage;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup,obstacleGroup;
var score;
var ground;
var gameState = "play";
var banana,bananaImage;
var obstacle,obstacleImage;
var survivalTime = 0;

function preload(){ 
monkey_running=loadAnimation("r1.png","r2.png","r3.png",
"r4.png","r5.png","r6.png","r7.png","r8.png","r9.png")
 
obstacleImage = loadImage("obstacle.png");  
bananaImage = loadImage("banana.png");
obstaceImage = loadImage("obstacle.png");
bgImage = loadImage("bg.jpg"); 
bananaImage = loadImage("banana.png");
}

function setup() {
createCanvas(400,400);
  
bg = createSprite(200,210,400,400);
bg.addImage(bgImage);
bg.depth = 0.1;
bg.scale = 0.9;

  
monkey = createSprite(50,350,20,20); 
monkey.addAnimation("r1.png","r2.png","r3.png",
"r4.png","r5.png","r6.png","r7.png","r8.png","r9.png");
monkey.scale = 0.14;

ground = createSprite(200,390,900,10);
ground.visible = false;
ground.velocityX = -4;
ground.x = ground.width/2;
  
obstacleGroup = createGroup();
foodGroup = createGroup();

score = 0;
}

function draw() {
background("black")
stroke("white");
textSize(20);
fill("white");
survivalTime = Math.ceil(frameCount/frameRate());
text("Survival Time:"+survivalTime,240,20);
stroke("white");
textSize(20);
fill("white");
text("Score:"+score,20,20);
if(ground.x<0){
ground.x = ground.width/2;  
}
if(monkey.x<0){
monkey.x = 50;  
}

  
if(gameState === "play"){
spawnBananas();
spawnObstacles();
if(keyDown("space") && monkey.y >= 325){
monkey.velocityY = -15;  
}
if(monkey.isTouching(obstacleGroup)){
gameState = "end"
}
if(monkey.isTouching(foodGroup)){
score = score+1;
foodGroup.destroyEach();
}
console.log(score);
}

else if(gameState ==="end"){
monkey.velocityX = 0;
obstacle.velocityX = 0;
banana.velocityX = 0;
stroke("red");
textSize(20);
fill("red");
text("GAME OVER",100,20);

}
  
monkey.velocityY = monkey.velocityY + 0.8;
  
monkey.collide(ground);    
drawSprites();  
}
function spawnObstacles(){
if(frameCount%100===0){
obstacle = createSprite(400,350,10,10);  
obstacle.velocityX = -8;
obstacle.addImage(obstacleImage);
obstacle.scale = 0.2; 
obstacle.debug = false;
obstacle.setCollider("rectangle",0,0,400,400);
obstacleGroup.add(obstacle);

}  
}

function spawnBananas(){
if(frameCount%61===0){
banana = createSprite(400,300,10,10);  
banana.y = Math.round(random(200,300));
banana.velocityX = -8;
banana.addImage(bananaImage);
banana.scale = 0.1;
banana.debug = false;
banana.setCollider("rectangle",0,0,400,400);
foodGroup.add(banana);
}
}
function reset(){
score = 0;
}

