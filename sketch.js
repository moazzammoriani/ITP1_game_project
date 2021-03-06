// Initialization of variables
var lives
var game_score
var gameChar_x;
var gameChar_world_x;
var gameChar_y;
var gameCharBottom_y;
var gameCharTop_y;
var gameCharLength;
var floorPos_y;
var trees_x, trees_y;
var canyonImage;
var canyon;
var touchCanyonEdge;
var inCanyon;
var isLeft, isRight, isJumping, isFalling, isPlummeting;
var jumpRange;
var scrollPos;
var betweenCanyon;
var platformImage;
var platforms;
var onPlatform;
var abovePlatform;
var enemyContact;
var quackSound;
var coinSound;
var forwardDuck;
var backwardDuck;
var mountainArray;
var canyonArray;

//Loading data
function preload() {
    canyonImage = loadImage("canyon.png");
    platformImage = loadImage("platform.png");
    forwardDuck = loadImage("forwardDuck.png");
    forwardDuckStep = loadImage("forwardDuck_step.png");
    backwardDuck = loadImage("backwardDuck.png");
    backwardDuckStep = loadImage("backwardDuck_step.png");

    soundFormats('mp3', 'wav');
    backgroundMusic = loadSound('sounds/background-music.mp3');
    backgroundMusic.setVolume(0.2);
}

// Loading more data and setting values
function setup() {
    victorySound = loadSound('victory.wav');
    victorySound.setVolume(0.4);
    fallingSound = loadSound('falling.wav');
    fallingSound.setVolume(0.1);
    coinSound = loadSound('coin.wav');
    coinSound.setVolume(0.1);
    quackSound = loadSound('quack_sound_effect.mp3');
    quackSound.setVolume(0.3);
    jumpSound = loadSound('sounds/flame-sound.mp3');
    jumpSound.setVolume(0.3);
	createCanvas(1024, 576);
    lives = 3;
	floorPos_y = height * 3/4;
    lifeToken_x = [50, 75, 100];
    lifeToken_y = 110;
    mountainArray = [];
    canyonArray = [];
    startGame();
    backgroundMusic.loop();
}

// Main drawing loop
function draw() {
    gameChar_world_x = gameChar_x - scrollPos;
	background(255,155,255); 
	betweenCanyon = false; 
    checkPlayerDie();

	//Ground
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); 

	
	push(); //Scrolling implementaton
	translate(scrollPos, 0);

	//Clouds
    drawClouds();

	//Mountains
    drawMountains();
	//Trees
    drawTrees();
        
	//Canyons
	for (var i = 0; i < canyons.length; i++) {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);

        if (gameChar_y > 576 ||( inCanyon && (abs(canyons[i].x_pos - gameChar_world_x) < 10 || abs(canyons[i].x_pos + canyons[i].width - gameChar_world_x )) < 10)) {
            touchedCanyonEdge = true; 
            fallingSound.play();
        }

	}

	//Collectables
	for (var i = 0; i < collectables.length; i++) {
        drawCollectable(collectables[i]);
        checkCollectable(collectables[i]);
	}

    renderFlagpole();
    checkFlagpole();

    // Draw platforms
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }

    // Check if above any platform 
    for (var i = 0; i< platforms.length; i++) {
        if (platforms[i].checkIfAbove()) {
            abovePlatform = true;
            break
        }
        abovePlatform = false;
    }

    //Check if on any platform
    for (var i = 0; i < platforms.length; i++) {
        if (platforms[i].checkIfOnTop()) {
            onPlatform = true;
            break;
        }
        onPlatform = false;
    }

    // Draw enemies
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }

	pop();

	if (gameChar_y < floorPos_y + 15 && !onPlatform) { //Detects if character is mid-air 
		isFalling = true;
	}

	else { //Detects if the character is on the ground
		isFalling = false;
	}

    drawGameChar();

    //Jumping-action implementation
	if (isJumping && gameChar_y > jumpRange) { 
		gameChar_y -= 10;
	}

    if (gameChar_y <= jumpRange) {
        isJumping = false;
    }

    //Gravity implementation
	if (isFalling || isPlummeting) { 
		gameChar_y += 5;
	}

    // Game score text
    fill(255);
    noStroke();
    textSize(24);
    text("Score: " + game_score, 30, 30);

    // Indicating lives left
    for (let i = 0; i < lives; i++) {
        drawLifeTokens();
    }

    // Game over logic
    if (lives < 1) {
        textSize(40);
        text("GAME OVER", 350, 320);
        textSize(30);
        text("Press F5 to Replay", 350, 370);
        noLoop();

    }

    // Level completion logic
    if (flagpole.isReached) {
        if (flagpole.flag_height <= 150) {
            textSize(40);
            text("LEVEL COMPLETE", 350, 320);
            textSize(30);
            text("Press F5 to replay", 350, 370);
            noLoop();
            backgroundMusic.stop();
            victorySound.play();
        }
    }

}

//The code below deals with user-input interaction
function keyPressed() {
	if (keyCode ==  37 && !inCanyon) {
		isLeft = true;
	}

	else if (keyCode == 32 && !isFalling && !isPlummeting) {
        jumpRange = gameChar_y - 150;
		isJumping = true;
        jumpSound.play();
        jumpSound.stop(0.4);
	}

	else if (keyCode == 39 && !inCanyon) {
		isRight = true;
	}
}

function keyReleased() {
	if (keyCode ==  37) {
		isLeft = false;
	}

	else if (keyCode == 32) {
		isJumping = false;
	}

	else if (keyCode == 39) {
		isRight = false;
	}
}

// Draws gameChar
function drawGameChar() {
	if (isLeft && isFalling) { //Draws the game character when it is falling and facing left
		//head
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		fill(220);
		rect(gameChar_x, gameChar_y - 50, 20, 21, 50);
		
		//torso
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		fill(220);
		rect(gameChar_x - 8, gameChar_y - 30, 10, 4);
		rect(gameChar_x + 8, gameChar_y - 30, 10, 4);
		rect(gameChar_x, gameChar_y - 30, 19, 21, 4);
	
		//flame_back
		ellipseMode(CENTER);
		noStroke();
		fill(255, 89, 18);
		ellipse(gameChar_x + 0.5 - 15, gameChar_y - 25 , 5, 4);
		triangle(gameChar_x - 2 - 15, gameChar_y - 24.6, gameChar_x + 3 - 15, gameChar_y - 24.6, gameChar_x + 0.5 -15, gameChar_y -21);
		fill(255, 184, 18);
		ellipse(gameChar_x + 0.5 - 15, gameChar_y - 25 , 2.5, 2);
		triangle(gameChar_x - .75 - 15, gameChar_y - 24.75, gameChar_x + 1.75 - 15, gameChar_y - 24.75, gameChar_x +.5 -15, gameChar_y - 23)
		stroke(0)

		//rocket_back
		fill(220);
		quad(gameChar_x - 2 + .5 - 15, gameChar_y - 33, gameChar_x - 2.5 +.5 - 15, gameChar_y - 27, gameChar_x + 2.5 +.5 - 15, gameChar_y - 27, gameChar_x + 2+.5 - 15, gameChar_y - 33);
	
		//flame_front
		ellipseMode(CENTER);
		noStroke();
		fill(255, 89, 18);
		ellipse(gameChar_x + 0.5 + 15, gameChar_y - 25 , 5, 4);
		triangle(gameChar_x - 2 + 15, gameChar_y - 24.6, gameChar_x + 3 + 15, gameChar_y - 24.6, gameChar_x + 0.5 + 15, gameChar_y -21);
		fill(255, 184, 18);
		ellipse(gameChar_x + 0.5 + 15, gameChar_y - 25 , 2.5, 2);
		triangle(gameChar_x - .75 + 15, gameChar_y - 24.75, gameChar_x + 1.75 + 15, gameChar_y - 24.75, gameChar_x +.5 + 15, gameChar_y - 23)
		stroke(0)

		//rocket_front
		fill(220);
		quad(gameChar_x - 2 + .5 + 15, gameChar_y - 33, gameChar_x - 2.5 +.5 + 15, gameChar_y - 27, gameChar_x + 2.5 +.5 + 15, gameChar_y - 27, gameChar_x + 2+.5 + 15, gameChar_y - 33);
	
		//Tracks
		fill(120);
		triangle(gameChar_x, gameChar_y - 26, gameChar_x - 13, gameChar_y - 16, gameChar_x +13, gameChar_y - 16);
		fill(220);
		ellipse(gameChar_x, gameChar_y - 22.2, 5, 5);
		ellipse(gameChar_x - 5, gameChar_y - 18.5, 5, 5);
		ellipse(gameChar_x + 5, gameChar_y - 18.5, 5, 5);

		//Arms
			//left
		line(gameChar_x - 17, gameChar_y - 40, gameChar_x - 10, gameChar_y - 37);
			//right
		line(gameChar_x + 11, gameChar_y - 42, gameChar_x + 1 , gameChar_y - 37);
			
		//eyes
		fill(5);
		rect(gameChar_x - 5, gameChar_y - 51, 8, 6, 0, 10 , 10 , 0);
			//right
		noStroke();
		ellipseMode(CENTER);
		fill(18, 30, 255);
		ellipse(gameChar_x - 5, gameChar_y - 50.5, 6, 6);
		fill(255);	
		ellipse(gameChar_x + 3.6- 10, gameChar_y - 51.5, 2, 2);
		
		strokeWeight(1); //To revert strokeWeight for the frames to the default value 
		rectMode(CORNER); //To undo the change in rectMode I made for my character drawing purposes
		
		//Conditional block used for scrolling implementation
		if (gameChar_x > 300) {
			gameChar_x -= 4;
		}

		else {
			scrollPos += 4;
		}
	}

	else if (isRight && isFalling) { // Draws the game character when it is falling and facing right.
		//head
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		fill(220);
		rect(gameChar_x, gameChar_y - 50, 20, 21, 50);
		
		//torso
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		fill(220);
		rect(gameChar_x - 8, gameChar_y - 30, 10, 4);
		rect(gameChar_x + 8, gameChar_y - 30, 10, 4);
		rect(gameChar_x, gameChar_y - 30, 19, 21, 4);

		//flame_back
		ellipseMode(CENTER);
		noStroke();
		fill(255, 89, 18);
		ellipse(gameChar_x + 0.5 - 15, gameChar_y - 25 , 5, 4);
		triangle(gameChar_x - 2 - 15, gameChar_y - 24.6, gameChar_x + 3 - 15, gameChar_y - 24.6, gameChar_x + 0.5 -15, gameChar_y -21);
		fill(255, 184, 18);
		ellipse(gameChar_x + 0.5 - 15, gameChar_y - 25 , 2.5, 2);
		triangle(gameChar_x - .75 - 15, gameChar_y - 24.75, gameChar_x + 1.75 - 15, gameChar_y - 24.75, gameChar_x +.5 -15, gameChar_y - 23)
		stroke(0)

		//rocket_back
		fill(220);
		quad(gameChar_x - 2 + .5 - 15, gameChar_y - 33, gameChar_x - 2.5 +.5 - 15, gameChar_y - 27, gameChar_x + 2.5 +.5 - 15, gameChar_y - 27, gameChar_x + 2+.5 - 15, gameChar_y - 33);

		//flame_front
		ellipseMode(CENTER);
		noStroke();
		fill(255, 89, 18);
		ellipse(gameChar_x + 0.5 + 15, gameChar_y - 25 , 5, 4);
		triangle(gameChar_x - 2 + 15, gameChar_y - 24.6, gameChar_x + 3 + 15, gameChar_y - 24.6, gameChar_x + 0.5 + 15, gameChar_y -21);
		fill(255, 184, 18);
		ellipse(gameChar_x + 0.5 + 15, gameChar_y - 25 , 2.5, 2);
		triangle(gameChar_x - .75 + 15, gameChar_y - 24.75, gameChar_x + 1.75 + 15, gameChar_y - 24.75, gameChar_x +.5 + 15, gameChar_y - 23)
		stroke(0)

		//rocket_front
		fill(220);
		quad(gameChar_x - 2 + .5 + 15, gameChar_y - 33, gameChar_x - 2.5 +.5 + 15, gameChar_y - 27, gameChar_x + 2.5 +.5 + 15, gameChar_y - 27, gameChar_x + 2+.5 + 15, gameChar_y - 33);

		//Tracks
		fill(120);
		triangle(gameChar_x, gameChar_y - 26, gameChar_x - 13, gameChar_y - 16, gameChar_x +13, gameChar_y - 16);
		fill(220);
		ellipse(gameChar_x, gameChar_y - 22.2, 5, 5);
		ellipse(gameChar_x - 5, gameChar_y - 18.5, 5, 5);
		ellipse(gameChar_x + 5, gameChar_y - 18.5, 5, 5);

		//Arms
			//left
		line(gameChar_x + 17, gameChar_y - 40, gameChar_x + 10, gameChar_y - 37);
			//right
		line(gameChar_x - 11, gameChar_y - 42, gameChar_x - 1 , gameChar_y - 37);
		
		//eyes
		fill(5);
		rect(gameChar_x + 5, gameChar_y - 51, 8, 6, 10, 0 , 0 , 10);
			//left
		noStroke();
		ellipseMode(CENTER);
		fill(18, 30, 255);
		ellipse(gameChar_x + 5.5, gameChar_y - 50.5, 6, 6);
		fill(255);	
		ellipse(gameChar_x + 3.75, gameChar_y - 51.5, 2, 2);
		
		strokeWeight(1); //To revert strokeWeight for the frames to the default value 
		rectMode(CORNER); //To undo the change in rectMode I made for my character drawing purposes

		//Conditional block used for scrolling implementation
		if (gameChar_x < 704) {
			gameChar_x += 4;
		}

		else {
			scrollPos -=4;
		}
	}

	else if (isLeft) { //Draws the game character when it is on the ground and facing left
		//head
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		fill(220);
		rect(gameChar_x, gameChar_y - 50, 20, 21, 50);
		
		//torso
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		fill(220);
		rect(gameChar_x, gameChar_y - 30, 19, 21, 4);

		//Tracks
		
		fill(120);
		triangle(gameChar_x, gameChar_y - 26, gameChar_x - 13, gameChar_y - 16, gameChar_x +13, gameChar_y - 16);
		fill(220);
		ellipse(gameChar_x, gameChar_y - 22.2, 5, 5);
		ellipse(gameChar_x - 5, gameChar_y - 18.5, 5, 5);
		ellipse(gameChar_x + 5, gameChar_y - 18.5, 5, 5);

		//Arms
			//left
		line(gameChar_x - 17, gameChar_y - 40, gameChar_x - 10, gameChar_y - 37);
		
			//right
		line(gameChar_x + 17 - 10, gameChar_y - 30, gameChar_x , gameChar_y - 37);
		
		
		//eyes
		fill(5);
		rect(gameChar_x - 5, gameChar_y - 51, 8, 6, 0, 10 , 10 , 0);

			//right
		noStroke();
		ellipseMode(CENTER);
		fill(18, 30, 255);
		ellipse(gameChar_x - 5, gameChar_y - 50.5, 6, 6);
		fill(255);	
		ellipse(gameChar_x + 3.6- 10, gameChar_y - 51.5, 2, 2);

		strokeWeight(1); //To revert strokeWeight for the frames to the default value 
		rectMode(CORNER); //To undo the change in rectMode I made for my character drawing purposes

		//Conditional block used for scrolling implementation
		if (gameChar_x > 300) {
			gameChar_x -= 4;
		}

		else {
			scrollPos += 4;
		}
	}

	else if (isRight) { //Draws the game character when it is on the ground and facing right.
		//head
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		fill(220);
		rect(gameChar_x, gameChar_y - 50, 20, 21, 50);
		
		//torso
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		fill(220);
		rect(gameChar_x, gameChar_y - 30, 19, 21, 4);

		//Tracks
		fill(120);
		triangle(gameChar_x, gameChar_y - 26, gameChar_x - 13, gameChar_y - 16, gameChar_x +13, gameChar_y - 16);
		fill(220);
		ellipse(gameChar_x, gameChar_y - 22.2, 5, 5);
		ellipse(gameChar_x - 5, gameChar_y - 18.5, 5, 5);
		ellipse(gameChar_x + 5, gameChar_y - 18.5, 5, 5);

		//Arms
			//left
		line(gameChar_x + 17, gameChar_y - 40, gameChar_x + 10, gameChar_y - 37);
			//right
		line(gameChar_x - 7, gameChar_y - 30, gameChar_x , gameChar_y - 37);
		
		//eyes
		fill(5);
		rect(gameChar_x + 5, gameChar_y - 51, 8, 6, 10, 0 , 0 , 10);
			//left
		noStroke();
		ellipseMode(CENTER);
		fill(18, 30, 255);
		ellipse(gameChar_x + 5.5, gameChar_y - 50.5, 6, 6);
		fill(255);	
		ellipse(gameChar_x + 3.75, gameChar_y - 51.5, 2, 2);
		
		strokeWeight(1); //To revert strokeWeight for the frames to the default value 
		rectMode(CORNER); //To undo the change in rectMode I made for my character drawing purposes

		//Conditional block used for scrolling implementation
		if (gameChar_x < 704) {
			gameChar_x += 4;
		}

		else {
			scrollPos -= 4;
		}
	}

	else if(isFalling || isPlummeting) { //Draws the game character when it is mid-air, falling or plummeting while facing forward
		//head
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		fill(220);
		rect(gameChar_x, gameChar_y - 50, 20, 21, 50);
		
		//torso
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		fill(220);
		rect(gameChar_x, gameChar_y - 30, 19, 21, 4);

		//flame
		ellipseMode(CENTER);
		noStroke();
		fill(255, 89, 18);
		ellipse(gameChar_x + 0.5, gameChar_y - 25 , 5, 4);
		triangle(gameChar_x - 2, gameChar_y - 24.6, gameChar_x + 3, gameChar_y - 24.6, gameChar_x + 0.5, gameChar_y -21);
		fill(255, 184, 18);
		ellipse(gameChar_x + 0.5, gameChar_y - 25 , 2.5, 2);
		triangle(gameChar_x - .75, gameChar_y - 24.75, gameChar_x + 1.75, gameChar_y - 24.75, gameChar_x +.5, gameChar_y - 23)
		stroke(0)

		//rocket
		fill(220);
		quad(gameChar_x - 2 + .5, gameChar_y - 33, gameChar_x - 2.5 +.5, gameChar_y - 27, gameChar_x + 2.5 +.5, gameChar_y - 27, gameChar_x + 2+.5, gameChar_y - 33);

		//Tracks
			//left_Track
		fill(100);
		rect(gameChar_x - 12.5, gameChar_y - 20, 6, 14); //left
		line(gameChar_x - 15, gameChar_y - 24, gameChar_x - 10, gameChar_y - 24);
		line(gameChar_x - 15, gameChar_y - 21, gameChar_x - 10, gameChar_y - 21);
		line(gameChar_x - 15, gameChar_y - 18, gameChar_x - 10, gameChar_y - 18);
		line(gameChar_x - 15, gameChar_y - 15, gameChar_x - 10, gameChar_y - 15);
			//right_Track
		rect(gameChar_x + 12.5, gameChar_y - 20, 6, 14); //left
		line(gameChar_x + 15, gameChar_y - 24, gameChar_x + 10, gameChar_y - 24);
		line(gameChar_x + 15, gameChar_y - 21, gameChar_x + 10, gameChar_y - 21);
		line(gameChar_x + 15, gameChar_y - 18, gameChar_x + 10, gameChar_y - 18);
		line(gameChar_x + 15, gameChar_y - 15, gameChar_x + 10, gameChar_y - 15);

		//Arms
			//left
		fill(220);
		line(gameChar_x - 17, gameChar_y - 48, gameChar_x - 10, gameChar_y - 37);
			//right
		line(gameChar_x + 17, gameChar_y - 48, gameChar_x + 10, gameChar_y - 37);
		
		//eyes
		fill(5);
		rect(gameChar_x, gameChar_y - 51, 17, 6, 10);
			//left
		noStroke();
		ellipseMode(CENTER);
		fill(18, 30, 255);
		ellipse(gameChar_x - 4, gameChar_y - 50.5, 6, 6);
		fill(255);	
		ellipse(gameChar_x - 5.6, gameChar_y - 51.5, 2, 2);
			//right
		noStroke();
		ellipseMode(CENTER);
		fill(18, 30, 255);
		ellipse(gameChar_x + 5, gameChar_y - 50.5, 6, 6);
		fill(255);	
		ellipse(gameChar_x + 3.6, gameChar_y - 51.5, 2, 2);
		strokeWeight(1); //To revert strokeWeight for the frames to the default value 
		rectMode(CORNER); //To undo the change in rectMode I made for my character drawing purposes	
	}

	else { //Draws the character when it is on the ground and facing forward
		//head
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		fill(220);
		rect(gameChar_x, gameChar_y - 50, 20, 21, 50);
		
		//torso
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		fill(220);
		rect(gameChar_x, gameChar_y - 30, 19, 21, 4);

		//Tracks
			//left_Track
		fill(100);
		rect(gameChar_x - 12.5, gameChar_y - 20, 6, 14); //left
		line(gameChar_x - 15, gameChar_y - 24, gameChar_x - 10, gameChar_y - 24);
		line(gameChar_x - 15, gameChar_y - 21, gameChar_x - 10, gameChar_y - 21);
		line(gameChar_x - 15, gameChar_y - 18, gameChar_x - 10, gameChar_y - 18);
		line(gameChar_x - 15, gameChar_y - 15, gameChar_x - 10, gameChar_y - 15);
			//right_Track
		rect(gameChar_x + 12.5, gameChar_y - 20, 6, 14); //left
		line(gameChar_x + 15, gameChar_y - 24, gameChar_x + 10, gameChar_y - 24);
		line(gameChar_x + 15, gameChar_y - 21, gameChar_x + 10, gameChar_y - 21);
		line(gameChar_x + 15, gameChar_y - 18, gameChar_x + 10, gameChar_y - 18);
		line(gameChar_x + 15, gameChar_y - 15, gameChar_x + 10, gameChar_y - 15);

		//Arms
			//left
		line(gameChar_x - 17, gameChar_y - 30, gameChar_x - 10, gameChar_y - 37);
			//right
		line(gameChar_x + 17, gameChar_y - 30, gameChar_x + 10, gameChar_y - 37);
		
		//eyes
		fill(5);
		rect(gameChar_x, gameChar_y - 51, 17, 6, 10);
			//left
		noStroke();
		ellipseMode(CENTER);
		fill(18, 30, 255);
		ellipse(gameChar_x - 4, gameChar_y - 50.5, 6, 6);
		fill(255);	
		ellipse(gameChar_x - 5.6, gameChar_y - 51.5, 2, 2);
			//right
		noStroke();
		ellipseMode(CENTER);
		fill(18, 30, 255);
		ellipse(gameChar_x + 5, gameChar_y - 50.5, 6, 6);
		fill(255);	
		ellipse(gameChar_x + 3.6, gameChar_y - 51.5, 2, 2);

		strokeWeight(1); //To revert strokeWeight for the frames to the default value 
		rectMode(CORNER); //To undo the change in rectMode I made for my character drawing purposes
	}
    gameCharBottom_y = gameChar_y -14;
    gameCharTop_y = gameCharBottom_y - 46;
        
}

// Draws clouds
function drawClouds() {
	for (var i = 0; i < clouds.length; i++) {
			fill(255);
			rect(clouds[i].x_pos, clouds[i].y_pos, 140, 30);
			ellipse(clouds[i].x_pos + 1, clouds[i].y_pos + 14, 30, 32);
			ellipse(clouds[i].x_pos + 138, clouds[i].y_pos + 14, 30, 32);
			ellipse(clouds[i].x_pos + 48, clouds[i].y_pos - 27, 50, 50);
			ellipse(clouds[i].x_pos + 17, clouds[i].y_pos - 10, 40, 40);
			ellipse(clouds[i].x_pos + 53, clouds[i].y_pos - 10, 45, 45);
			ellipse(clouds[i].x_pos + 83, clouds[i].y_pos - 10, 50, 50);
			ellipse(clouds[i].x_pos + 113, clouds[i].y_pos + 5, 40, 40);
	}
}

// Draws mountain
function drawMountains() {
	for (var i = 0; i < mountains.length; i++) {
		fill(90);
		triangle(mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos - 220, mountains[i].y_pos + 350, mountains[i].x_pos + 220, mountains[i].y_pos + 350);
		fill(255);
		triangle(mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos - 32, mountains[i].y_pos + 50, mountains[i].x_pos + 32, mountains[i].y_pos + 50);
		stroke(255,155,255);
		strokeWeight(20);
		line(mountains[i].x_pos, mountains[i].y_pos+ 2, mountains[i].x_pos - 8, mountains[i].y_pos + 5);
		noStroke();
	}
}

// Draws trees
function drawTrees() {
	for (var i = 0; i < trees_x.length; i++) {
		noStroke();
		fill(6, 102, 14);
		ellipse(trees_x[i], trees_y, 150, 200);
		ellipse(trees_x[i] - 9, trees_y -  100, 60, 60);
		ellipse(trees_x[i] - 45, trees_y - 77, 60, 60);
		ellipse(trees_x[i] - 71, trees_y - 47, 60, 60);
		ellipse(trees_x[i] - 68, trees_y + 5, 80, 80);
		ellipse(trees_x[i] - 44, trees_y + 63, 60, 60);
		ellipse(trees_x[i] + 36, trees_y - 83, 60, 60);
		ellipse(trees_x[i] + 60, trees_y - 40, 70, 70);
		ellipse(trees_x[i] + 67, trees_y + 5,  80, 80);
		ellipse(trees_x[i] + 36, trees_y + 50, 80, 80);
		fill(99, 36, 5);
		beginShape();
		vertex(trees_x[i] - 24, trees_y + 167);
		vertex(trees_x[i] - 20, trees_y + 158);
		vertex(trees_x[i] - 14, trees_y + 140);
		vertex(trees_x[i] - 12, trees_y + 66);
		vertex(trees_x[i] - 34, trees_y + 45);
		vertex(trees_x[i] - 31, trees_y + 41);
		vertex(trees_x[i] - 10, trees_y + 55);
		vertex(trees_x[i] + 2, trees_y + 36);
		vertex(trees_x[i] - 4, trees_y + 45);
		vertex(trees_x[i] + 6, trees_y + 35);
		vertex(trees_x[i] + 6, trees_y + 58);
		vertex(trees_x[i] + 16, trees_y + 48);
		vertex(trees_x[i] + 25, trees_y + 38);
		vertex(trees_x[i] + 28, trees_y + 41);
		vertex(trees_x[i] + 16, trees_y + 58);
		vertex(trees_x[i] + 11, trees_y + 68);
		vertex(trees_x[i] + 8, trees_y + 138);
		vertex(trees_x[i] + 13, trees_y + 156);
		vertex(trees_x[i] + 18, trees_y + 167);
		endShape(CLOSE);
	}
}

// Draws canyon
function drawCanyon(t_canyon) {
    image(canyonImage, t_canyon.x_pos, floorPos_y, t_canyon.width, 150);
}

// Manages canyon interaction
function checkCanyon(t_canyon) {
    if (gameChar_world_x > t_canyon.x_pos  && gameChar_world_x < (t_canyon.x_pos + t_canyon.width)) {
        betweenCanyon = true;
    }

	if (betweenCanyon && !abovePlatform) {
		isPlummeting = true;
	}
	else {
		isPlummeting = false;
	}

    if (betweenCanyon && gameCharBottom_y > 450) {
        inCanyon = true; 
    } else {
        inCanyon = false;
    }
}

// Draws collectable
function drawCollectable(t_collectable) {
		if (!t_collectable.isFound) {
            fill(252, 197, 18);
            stroke(0);
            strokeWeight(0);
            ellipse(t_collectable.x_pos, t_collectable.y_pos, 35, 35);
            noStroke();
            noFill();
            strokeWeight(1);
            stroke(0);
            ellipse(t_collectable.x_pos, t_collectable.y_pos, 30, 30)
            noStroke();
            fill(255);
            textSize(25);
            text('B', t_collectable.x_pos - 7.5, t_collectable.y_pos - (397 - 406));
            rect(t_collectable.x_pos - 3, t_collectable.y_pos - 12, 2, 3);
            rect(t_collectable.x_pos + 1, t_collectable.y_pos - 12, 2, 3);
            rect(t_collectable.x_pos - 3, t_collectable.y_pos - 11, 2, 3);
            rect(t_collectable.x_pos + 1, t_collectable.y_pos - 11, 2, 3);
		}
}

// Manges collectable interaction
function checkCollectable(t_collectable) {
    if (dist(t_collectable.x_pos - 7.5, t_collectable.y_pos + 9, gameChar_world_x,
        gameChar_y - 30) < 30) {
        if (!t_collectable.isFound) {game_score += 1;
            coinSound.play();
            t_collectable.isFound = true;
        }
    }
}

// Draws flagpople
function renderFlagpole() {
    fill(120);
    rect(flagpole.x_pos, 150, 10, 282);
    fill(255,0,0);
    rect(flagpole.x_pos + 10, flagpole.flag_height, 70, 50);

    if (flagpole.isReached) {
        if (flagpole.flag_height > 150) flagpole.flag_height -= 6
    }
}

// Manages flagpole interaction
function checkFlagpole() {
    if (abs(gameChar_world_x - flagpole.x_pos) < 20) flagpole.isReached = true;
}

// Excecutes the necessary chain of events to occur after the character dies
function checkPlayerDie() {
    if ( enemyContact || touchedCanyonEdge) {
        lives -= 1;
        lifeToken_x.pop();
        enemyContact = false;
        startGame();
    }
}

// Reinitializes all values to the start of the level
function startGame() {
    game_score = 0;
	gameChar_x = 152;
	gameChar_y = floorPos_y;
    gameCharBottom_y = gameChar_y -14;
    gameCharTop_y = gameCharBottom_y - 46;
    gameCharLength = gameCharBottom_y - gameCharTop_y;

	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    touchedCanyonEdge = false;
    jumpRange = gameChar_y - 150;
	scrollPos = 0;

	mountains = [
        {x_pos: 901, y_pos: 82},
        {x_pos: 2155, y_pos: 82},
        {x_pos: 3837, y_pos: 82},
    ]

    for (let i = 0; i < mountainArray.length; i++) {
        mountains.push({x_pos: mountainArray[i][0], y_pos: 83});
    }
    

	trees_x = [158, 1854, 1022, 3078];
	trees_y = floorPos_y - 167;

	clouds = [
		{x_pos: 250, y_pos: 100},
		{x_pos: 500, y_pos: 200},
		{x_pos: 750, y_pos: 40},
		{x_pos: 100, y_pos: 150},
		{x_pos: 1220, y_pos: 155},
		{x_pos: 1565, y_pos: 219},
		{x_pos: 1974, y_pos: 95},
		{x_pos: 2331, y_pos: 195},
		{x_pos: 2602, y_pos: 82},
		{x_pos: 2853, y_pos: 240},
		{x_pos: 3101, y_pos: 229},
		{x_pos: 2958, y_pos: 98},
		{x_pos: 3521, y_pos: 184},
	]

	collectables = [
		{x_pos: 100, y_pos: 400, isFound: false},
		{x_pos: 300, y_pos: 250, isFound: false},
		{x_pos: 560, y_pos: 266, isFound: false},
		{x_pos: 668, y_pos: 266, isFound: false},
		{x_pos: 800, y_pos: 400, isFound: false},
		{x_pos: 900, y_pos: 400, isFound: false},
		{x_pos: 1000, y_pos: 400, isFound: false},
		{x_pos: 1125, y_pos: 400, isFound: false},
        {x_pos: 1389, y_pos: 324, isFound: false},
        {x_pos: 1687, y_pos: 400, isFound: false},
        {x_pos: 1987, y_pos: 400, isFound: false},
        {x_pos: 2388, y_pos: 400, isFound: false},
        {x_pos: 2631, y_pos: 400, isFound: false},
        {x_pos: 2791, y_pos: 322, isFound: false},
        {x_pos: 3100, y_pos: 400, isFound: false},
        {x_pos: 3405, y_pos: 400, isFound: false},
        {x_pos: 3651, y_pos: 400, isFound: false},
        
	]


	canyons = [
		{x_pos: 400, width: 300},
		{x_pos: 1215, width: 400},
		{x_pos: 2000, width: 100},
		{x_pos: 2684, width: 300},
        {x_pos: 3168, width: 100},
	]

    for (let i = 0; i < canyonArray.length; i++) {
        canyons.push({x_pos: canyonArray[i][0], width: 100});
    }

    flagpole = {
        x_pos: 4000,
        isReached: false,
        flag_height:  360
    }

    platforms = [
        createPlatform(300, 350, 174), 
        createPlatform(518, 294, 174),
        createPlatform(1300, 350, 175),
        createPlatform(2700, 360, 175),
        createPlatform(3008, 357, 174),
        createPlatform(3308, 300, 174),
    ]

    enemies = [new Enemy(680, 500), new Enemy(1646, 300),new Enemy(2122, 200), new Enemy(2322, 150), new Enemy(3500, 400)];
}

// Draws the remaining lives left for the player 
function drawLifeTokens() {
    for (let i = 0; i < lifeToken_x.length; i++) {
        push();
        scale(0.8)
    //head
        rectMode(CENTER);
        strokeWeight(1);
        stroke(0);
        fill(220);
        rect(lifeToken_x[i], lifeToken_y - 50, 20, 21, 50);
    //eyes
        fill(5);
        rect(lifeToken_x[i], lifeToken_y - 51, 17, 6, 10);
            //left
        noStroke();
        ellipseMode(CENTER);
        fill(18, 30, 255);
        ellipse(lifeToken_x[i] - 4, lifeToken_y - 50.5, 6, 6);
        fill(255);	
        ellipse(lifeToken_x[i] - 5.6, lifeToken_y - 51.5, 2, 2);
            //right
        noStroke();
        ellipseMode(CENTER);
        fill(18, 30, 255);
        ellipse(lifeToken_x[i] + 5, lifeToken_y - 50.5, 6, 6);
        fill(255);	
        ellipse(lifeToken_x[i] + 3.6, lifeToken_y - 51.5, 2, 2);

        strokeWeight(1); //To revert strokeWeight for the frames to the default value 
        rectMode(CORNER); //To undo the change in rectMode I made for my character drawing purposes
        pop();
    }
}

// Platform factory
function createPlatform(x, y, width) {
    let plat = {
        x : x,
        y : y,
        width: 180,
        height: (5/18) * width,
        draw: function() {
            fill(255, 0, 255);
            image(platformImage, this.x, this.y, this.width, this.height);
        },
        checkIfOnTop: function() {
            return this.x < gameChar_world_x && gameChar_world_x < (this.x + this.width) && gameCharBottom_y < this.y && (this.y - gameCharLength-12) < gameCharTop_y
        },
        checkIfAbove: function() {
            return this.x < gameChar_world_x && gameChar_world_x < (this.x + this.width) && gameCharBottom_y < this.y
        }
    }
    return plat;
}

// Enemy constructor
function Enemy(x, movementRange) {
    this.duck = forwardDuck;
    this.x = x;
    this.y = floorPos_y;
    this.movementRange = movementRange;
    this.speed = 1;
    this.currentX = x;
    this.facingForward = true;

    // Animates enemy movement
    this.update = function() {
        this.currentX += this.speed;
        if (this.currentX > this.x + this.movementRange || this.currentX < this.x) {
            this.speed = -this.speed;
            this.facingForward = !this.facingForward;
        }   
        if (!this.facingForward) {
            if (this.currentX % 18 == 0) {
                if (this.duck == backwardDuck) {
                   this.duck = backwardDuckStep; 
                } else {
                    this.duck = backwardDuck;
                }
            } 
        } else {
            if (this.currentX % 18 == 0) {
                if (this.duck == forwardDuck) {
                   this.duck = forwardDuckStep; 
                } else {
                    this.duck = forwardDuck;
                }
            }
        }
    }

    // Draws enemy 
    this.draw = function() {
        this.update();
        this.checkContact();
        fill(255, 150, 0);
        image(this.duck, this.currentX, this.y - 50, 60, 60);
        stroke(0)
        strokeWeight(1);
    }

    // Checks if game character has touched enemy
    this.checkContact = function() {
        // The 24 here is added because the center of the the game character's body is at gameCharTop_y + 24
        if (dist(this.currentX + 33, this.y, gameChar_world_x, gameCharTop_y+24) < 33) {
            enemyContact = true;
            quackSound.play();
        }
    }
}

