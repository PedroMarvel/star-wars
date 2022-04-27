var nave, imgNave;
var ground, imgGround;
var ini, imgIni1, imgIni2, grupoIni;
var gameover, imgGameover;
var win, imgWin;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var distancia = 0;
var edges;

function preload(){
    imgNave = loadImage("nave.png");
    imgGround = loadImage("fundo.png");
    imgIni1 = loadImage("inimigo1.png");
    imgIni2 = loadImage("inimigo2.png");
    imgGameover = loadImage("gameover.png");
    imgWin = loadImage("win.png");
}



function setup(){
    createCanvas(600,800);

    ground = createSprite(300,400);
    ground.addImage("moving", imgGround);
    
    nave = createSprite(300,700,10,10);
    nave.addImage(imgNave);
    nave.scale = 0.3;

    edges = createEdgeSprites();

    grupoIni = new Group();

    gameover = createSprite(300,400);
    gameover.addImage("go", imgGameover);
    gameover.visible = false;

    
}

function draw(){
    background(200);


    if(gameState === PLAY){
        distancia = distancia + Math.round(getFrameRate()/50);

        nave.x = World.mouseX;
    
        ground.velocityY = 10;
    
        if(ground.y >= 1000){
            ground.y = -300;
        }
        
        nave.collide(edges);
        enemy();

        if(grupoIni.isTouching(nave)){
            gameState = END;
        }
        
    }
    
    else if(gameState === END){
        ground.velocityY = 0;

        grupoIni.setVelocityYEach(0);
        grupoIni.setLifetimeEach(-1);

        gameover.visible = true;
        if(mousePressedOver(gameover)){
            reset();
        }
    }

        
   
    drawSprites();

    fill("yellow");
    textSize(16);
    text("Distancia: " + distancia, 450,50);


}
function enemy(){
    if (frameCount % 60 === 0){
        ini = createSprite(random(100,500),-10,10,10);
        ini.velocityY = 10;

        var rand = Math.round(random(1,2));
        switch(rand) {
            case 1: ini.addImage(imgIni1);
                    ini.scale = 0.6;
              break;
            case 2: ini.addImage(imgIni2);
                    ini.scale = 0.13;
              break;
            default: break;
        }
        ini.lifetime = 150;
        grupoIni.add(ini);

        ini.depth = gameover.depth;
        gameover.depth += 1;
    }
     
}

function reset(){
    gameState = PLAY;
    gameover.visible = false;


    grupoIni.destroyEach();
    distancia = 0;

}