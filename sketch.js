var lives
var game_score
var gameChar_x;
var gameChar_world_x;
var gameChar_y;
var floorPos_y;
var trees_x, trees_y;
var canyon;
var isLeft, isRight, isJumping, isFalling, isPlummeting;
var scrollPos;
var betweenCanyon;

function setup() {
	createCanvas(1024, 576);
    lives = 3;
	floorPos_y = height * 3/4;
    lifeToken_x = [50, 75, 100];
    lifeToken_y = 110;
    startGame();
}

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
	}
    
	

	//Collectables
	for (var i = 0; i < collectables.length; i++) {
        drawCollectable(collectables[i]);
        checkCollectable(collectables[i]);
	}

    renderFlagpole();
    checkFlagpole();

	pop();

	if (gameChar_y < floorPos_y + 18) { //Detects if character is mid-air 
		isFalling = true;
	}

	else { //Detects if the character is on the ground
		isFalling = false;
	}

    drawGameChar();

	if (isJumping && gameChar_y > 300) { //Jumping-action implementation
		gameChar_y -= 10;
	}

	if (isFalling || isPlummeting) { //Gravity implementation
		gameChar_y += 5;
	}

    fill(255);
    noStroke();
    textSize(24);
    text("Score: " + game_score, 30, 30);
    for (let i = 0; i < lives; i++) {
        drawLifeTokens();
    }

    if (lives < 1) {
        textSize(40);
        text("GAME OVER", 350, 320);
        textSize(30);
        text("Press space to continue", 350, 370);
        return 

    }

    if (flagpole.isReached) {
        textSize(40);
        text("LEVEL COMPLETE", 350, 320);
        textSize(30);
        text("Press space to continue", 350, 370);
        return

    }

}

//The code below deals with user-input interaction
function keyPressed() {
	if (keyCode ==  37) {
		isLeft = true;
	}

	else if (keyCode == 32) {
		isJumping = true;
	}

	else if (keyCode == 39) {
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
		if (gameChar_x > 30) {
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
		if (gameChar_x < 994) {
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
		if (gameChar_x > 30) {
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
		if (gameChar_x < 994) {
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
        
}

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

function drawMountains() {
	for (var i = 0; i < mountains.length; i++) {
		fill(46, 40, 40);
		triangle(mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos - 220, mountains[i].y_pos + 350, mountains[i].x_pos + 220, mountains[i].y_pos + 350);
		fill(255);
		triangle(mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos - 32, mountains[i].y_pos + 50, mountains[i].x_pos + 32, mountains[i].y_pos + 50);
		stroke(255,155,255);
		strokeWeight(20);
		line(mountains[i].x_pos, mountains[i].y_pos+ 2, mountains[i].x_pos - 8, mountains[i].y_pos + 5);
		noStroke();
	}
}

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

function drawCanyon(t_canyon) {
    fill(100, 155, 255);
    noStroke();
    rect(t_canyon.x_pos, 429, t_canyon.width, 150);
    fill(100, 155, 255);
}

function checkCanyon(t_canyon) {
    if (gameChar_world_x > t_canyon.x_pos  && gameChar_world_x < (t_canyon.x_pos + t_canyon.width)) {
        betweenCanyon = true;
    }

	if (betweenCanyon) {
		isPlummeting = true;
	}

	else {
		isPlummeting = false;
	}
}

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

function checkCollectable(t_collectable) {
    if (dist(t_collectable.x_pos - 7.5, t_collectable.y_pos + 9, gameChar_world_x,
        gameChar_y - 30) < 30) {
        if (!t_collectable.isFound) game_score += 1;
        t_collectable.isFound = true;
    }
}

function renderFlagpole() {
    fill(120);
    rect(flagpole.x_pos, 150, 10, 282);
    fill(255,0,0);
    rect(flagpole.x_pos + 10, flagpole.flag_height, 70, 50);

    if (flagpole.isReached) {
        if (flagpole.flag_height > 150) flagpole.flag_height -= 6
    }
}

function checkFlagpole() {
    if (abs(gameChar_world_x - flagpole.x_pos) < 20) flagpole.isReached = true;
}

function checkPlayerDie() {
    if (gameChar_y > 576) {
        lives -= 1;
        lifeToken_x.pop();
        startGame();
    }
}

function startGame() {
    game_score = 0;
	gameChar_x = width/2 + 20;
	gameChar_y = floorPos_y ;

	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	scrollPos = 0;

	mountains = [
		{x_pos: 50, y_pos: 82},
		{x_pos: 800, y_pos: 82},
		{x_pos: 1600, y_pos: 82},
		{x_pos: 2400, y_pos: 82}
	]

	trees_x = [50, 300, 700, 1100];
	trees_y = floorPos_y - 167;

	clouds = [
		{x_pos: 250, y_pos: 100},
		{x_pos: 500, y_pos: 200},
		{x_pos: 750, y_pos: 40},
		{x_pos: 100, y_pos: 150}
	]

	collectables = [
		{x_pos: 100, y_pos: 400, isFound: false},
		{x_pos: 800, y_pos: 400, isFound: false},
		{x_pos: 300, y_pos: 250, isFound: false},
		{x_pos: 900, y_pos: 400, isFound: false}
	]

	canyons = [
		{x_pos: 400, width: 100},
		{x_pos: 1215, width: 100},
		{x_pos: 2000, width: 100},
		{x_pos: 2684, width: 100}
	]

    flagpole = {
        x_pos: 900,
        isReached: false,
        flag_height:  360
    }
}

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
