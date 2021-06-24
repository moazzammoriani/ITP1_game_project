var gameChar_x;
var gameChar_y;
var floorPos_y;
var trees_x, trees_y;
var canyon;
var isLeft, isRight, isJumping, isFalling, isPlummeting;
var scrollPos;
var betweenCanyon;

function setup() {
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
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
}

function draw() {
	background(100,155,255); 

	//Ground
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); 
	
	push(); //Scrolling implementaton
	translate(scrollPos, 0);

	//Clouds
	for (var i = 0; i < clouds.length; i++) {
			fill(255);
			rect(clouds[i].x_pos, clouds[i].y_pos, 140, 30);
			ellipse(clouds[i].x_pos - (157 - 158), clouds[i].y_pos - (75 - 89), 30, 32);
			ellipse(clouds[i].x_pos - (157 - 295), clouds[i].y_pos - (75 - 89), 30, 32);
			ellipse(clouds[i].x_pos - (157 - 205), clouds[i].y_pos - (75 - 48), 50, 50);
			ellipse(clouds[i].x_pos - (157 - 174), clouds[i].y_pos - (75 - 65), 40, 40);
			ellipse(clouds[i].x_pos - (157 - 210), clouds[i].y_pos - (75 - 65), 45, 45);
			ellipse(clouds[i].x_pos - (157 - 240), clouds[i].y_pos - (75 - 65), 50, 50);
			ellipse(clouds[i].x_pos - (157 - 270), clouds[i].y_pos - (75 - 80), 40, 40);
	}

	//Mountains
	for (var i = 0; i < mountains.length; i++) {
		fill(46, 40, 40);
		triangle(mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos - 220, mountains[i].y_pos + 350, mountains[i].x_pos + 220, mountains[i].y_pos + 350);
		fill(255);
		triangle(mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos - 32, mountains[i].y_pos + 50, mountains[i].x_pos + 32, mountains[i].y_pos + 50);
		stroke(100, 155, 255);
		strokeWeight(20);
		line(mountains[i].x_pos, mountains[i].y_pos+ 2, mountains[i].x_pos - 8, mountains[i].y_pos + 5);
		noStroke();
	}


	//Trees
	for (var i = 0; i < trees_x.length; i++) {
		noStroke();
		fill(6, 102, 14);
		ellipse(trees_x[i], trees_y, 150, 200);
		ellipse(trees_x[i] - (804 - 795), trees_y -  (265 - 165), 60, 60);
		ellipse(trees_x[i] - (804 -759), trees_y - (265 - 188), 60, 60);
		ellipse(trees_x[i] - (804 - 733), trees_y - (265 - 218), 60, 60);
		ellipse(trees_x[i] - (804 - 736), trees_y - (265 - 270), 80, 80);
		ellipse(trees_x[i] -  (804 - 760), trees_y - (265 - 328), 60, 60);
		ellipse(trees_x[i] - (804 - 840), trees_y - (265 - 182), 60, 60);
		ellipse(trees_x[i] - (804 - 864), trees_y - (265 - 225), 70, 70);
		ellipse(trees_x[i] - (804 - 871), trees_y - (265 - 270), 80, 80);
		ellipse(trees_x[i] - (804 - 840), trees_y - (265 - 315), 80, 80);
		fill(99, 36, 5);
		beginShape();
		vertex(trees_x[i] - (804 - 780), trees_y - (265 - 432));
		vertex(trees_x[i] - (804 - 784), trees_y - (265 - 423));
		vertex(trees_x[i] - (804 - 790), trees_y - (265 - 405));
		vertex(trees_x[i] - (804 - 792), trees_y - (265 - 331));
		vertex(trees_x[i] - (804 - 770), trees_y - (265 - 310));
		vertex(trees_x[i] - (804 - 773), trees_y - (265 - 306));
		vertex(trees_x[i] - (804 - 794), trees_y - (265 - 320));
		vertex(trees_x[i] - (804 - 806), trees_y - (265 - 301));
		vertex(trees_x[i] - (804 - 800), trees_y - (265 - 310));
		vertex(trees_x[i] - (804 - 810), trees_y - (265 - 300));
		vertex(trees_x[i] - (804 - 810), trees_y - (265 - 323));
		vertex(trees_x[i] - (804 - 820), trees_y - (265 - 313));
		vertex(trees_x[i] - (804 - 829), trees_y - (265 - 303));
		vertex(trees_x[i] - (804 - 832), trees_y - (265 - 306));
		vertex(trees_x[i] - (804 - 820), trees_y - (265 - 326));
		vertex(trees_x[i] - (804 - 815), trees_y - (265 - 333));
		vertex(trees_x[i] - (804 - 812), trees_y - (265 - 403));
		vertex(trees_x[i] - (804 - 817), trees_y - (265 - 421));
		vertex(trees_x[i] - (804 - 822), trees_y - (265 - 432));
		endShape(CLOSE);
	}

	//Canyons
	for (var i = 0; i < canyons.length; i++) {
		fill(100, 155, 255);
		noStroke();
		rect(canyons[i].x_pos, 429, canyons[i].width, 150);
		fill(100, 155, 255);
	}
	

	//Collectables
	for (var i = 0; i < collectables.length; i++) {
		if (!collectables[i].isFound){
		fill(252, 197, 18);
		stroke(0);
		strokeWeight(0);
		ellipse(collectables[i].x_pos, collectables[i].y_pos, 35, 35);
		noStroke();
		noFill();
		strokeWeight(1);
		stroke(0);
		ellipse(collectables[i].x_pos - (434 - 434), collectables[i].y_pos - (397 - 397), 30, 30)
		noStroke();
		fill(255);
		textSize(25);
		text('B', collectables[i].x_pos - (434 - 426.5), collectables[i].y_pos - (397 - 406));
		rect(collectables[i].x_pos - (434 - 431), collectables[i].y_pos - (397 - 385), 2, 3);
		rect(collectables[i].x_pos - (434 - 435), collectables[i].y_pos - (397 - 385), 2, 3);
		rect(collectables[i].x_pos - (434 - 431), collectables[i].y_pos - (397 - 406), 2, 3);
		rect(collectables[i].x_pos - (434 - 435), collectables[i].y_pos - (397 - 406), 2, 3);
		}

		if (dist(collectables[i].x_pos - (434 - 426.5), collectables[i].y_pos - (397 - 406), gameChar_x - scrollPos,
			gameChar_y - 30) < 30) {
			collectables[i].isFound = true;
		}
	}

	pop();

	if (gameChar_y < floorPos_y + 18) { //Detects if character is mid-air 
		isFalling = true;
	}

	else { //Detects if the character is on the ground
		isFalling = false;
	}
		
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
			scrollPos -=4;
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

	if (isJumping && gameChar_y > 300) { //Jumping-action implementation
		gameChar_y -= 10;
	}

	if (isFalling || isPlummeting) { //Gravity implementation
		gameChar_y += 5;
	}

	//The remaining code below in the draw function enables the canyon interaction 
	betweenCanyon = false; 

	for (var i = 0; i < canyons.length; i++) { 
		if (gameChar_x - scrollPos > canyons[i].x_pos  && gameChar_x - scrollPos < (canyons[i].x_pos + canyons[i].width)){
			betweenCanyon = true;
		}
	}

	if (betweenCanyon) {
		isPlummeting = true;
	}

	else {
		isPlummeting = false;
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