var girl, girl_running, girl_collided;
var ground, invisibleGround, groundImage;
var background1,background2;
var cloudImage;
var obstacle;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var obstaclegroup, cloudgroup, safetygroup;
var girlEnd
var restart
//var touches = [];
var covidmessage;



function preload(){
  girl_running = loadAnimation("girl6.jpg","girl7.png","girl9.jpg","girl10.jpg","girl11.jpg");
  
  groundImage = loadImage("ground.jpg");
  cloudImage = loadImage("cloud.png");

  covidmessage = loadSound("covidaudio.mp3");

  bgImage = loadImage("background.jpg");
 
 
  o1 = loadImage("sanitizer.png");
  o1.scale = 1.5
  o2 = loadImage("wipes.png");
  o2.scale = 1.5
  o3 = loadImage("mask.png");
  o3.scale = 1.5
  o4 = loadImage("covid.png");
  o4.scale = 0.5

  
  girlEnd = loadAnimation("girl16.jpg");
  restart = loadImage("restart.png");

}

function setup() {
  background(0)
  createCanvas(windowWidth,windowHeight);
  
  

  //create a girl sprite
  girl = createSprite(100,height-180,20,50);
  girl.addAnimation("running", girl_running);
  girl.addAnimation("ending", girlEnd);
  girl.scale = 1;
  
  //create a ground sprite
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.scale = 2;
  ground.x = ground.width /2;
  
  
  //creating invisible ground
  invisibleGround = createSprite(width/2,height-50,width,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)
  
  girl.setCollider("circle",0,0,100)
  girl.debug = false
  
  restart1 = createSprite(width/2,height/2);
  restart1.addAnimation("r", restart);
  restart1.scale = 0.4;

  
  obstaclegroup = new Group();
  cloudgroup = new Group();
  safetygroup = new Group();
}

function draw() {
  //set background color
  background(bgImage);
  console.log(gameState)

  if (gameState === PLAY){
     ground.velocityX = -10;

  // jump when the space key is pressed
 /* if((touches.length > 0 || keyDown("SPACE")) && girl.collide(invisibleGround)) { 
    girl.velocityY = -10; 
    touches = []; }*/

    if((touches.length>0 || keyDown("SPACE")) && girl.collide(invisibleGround)){
      girl.velocityY = -10;
    }

  girl.velocityY = girl.velocityY+0.5
  
     
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  //Spawn Clouds
  spawnClouds()
  spawnSafety()
  spawnVirus()

  if (safetygroup.isTouching(girl)){
    score = score+5;
    safetygroup[0].destroy();
  }
  if (obstaclegroup.isTouching(girl)){
    gameState = END;
    obstaclegroup.destroyEach();
  }
  
  restart1.visible = false;
    
  }
  else if (gameState === END){
    ground.velocityX = 0;
    girl.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    safetygroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    safetygroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    girl.changeAnimation("ending", girlEnd);
    restart1.visible = true;
    if(mousePressedOver(restart1) || touches.length>0){
      reset();
      
      /*if((touches.length>0 || keyDown("SPACE"))){
        reset();
      }*/
    }
    //covidmessage.play();
  textSize(20);
  fill("red");
  text("                 Simply wearing a mask and getting vaccinated can save a million lives!", 100,windowHeight-250);
  fill("blue");
  text("                    Stay Home, Stay Safe, and Let's End this Battle Against Humanity!", 100,windowHeight-230);
}

 

//girl.depth = ground.depth;
//girl.depth = girl.depth+1;

  //stop girl from falling down
  girl.collide(invisibleGround);
  
 
  drawSprites();
  textSize(30);
  fill("black");
  text("Points: "+score, 500, 50);
}

//function to spawn the clouds
function spawnClouds(){
  if (frameCount%60  === 0){
    cloud = createSprite(width+20,height-300, 40, 10);
    cloud.addImage(cloudImage);
    cloud.scale = 0.2;
    cloud.velocityX = -10
    cloud.y = Math.round(random(30,150));
    console.log(cloud.x);
    cloud.lifetime = 410;
    cloudgroup.add(cloud);
    var a=5;
    console.log(a);
  }
    
}

function spawnVirus(){
  if(frameCount%250 === 0){
    obstacle = createSprite(1250,height-95, 10,30);
    obstacle.setCollider("rectangle",0,0,80,80)
    obstacle.debug = false;
    obstacle.velocityX = -8;
    obstacle.addImage(o4);
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclegroup.add(obstacle);
    
  }
}
function reset(){
  gameState= PLAY;
  background(bgImage);
  cloudgroup.destroyEach();
  obstaclegroup.destroyEach();
  safetygroup.destroyEach();
  restart1.visible=false;
  girl.changeAnimation("running", girl_running);
  score=0;
}

function spawnSafety(){
  if(frameCount%200 === 0){
    safety = createSprite(1250,height-95,10,30);
    safety.setCollider("rectangle",0,0,60,60)
    safety.debug = false;
    safety.velocityX = -8;
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1:   safety.addImage(o1);
                break;
      case 2: safety.addImage(o2);
              break;
      case 3: safety.addImage(o3);
              break;
      default:break;
    }
    safety.scale = 0.5;
    safety.lifetime = 300;
    safetygroup.add(safety);
  }
}


