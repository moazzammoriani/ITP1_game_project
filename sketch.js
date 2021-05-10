

var gameChar_x;
var gameChar_y;
var floorPos_y;
var canyon;
var isLeft, isRight, isJumping, isFalling, isPlummeting;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y + 25;

	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	canyon = {
		x_pos: 100,
		width: 100
	}
}

function draw()
{

	

	background(100,155,255); 


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyon
	fill(100, 155, 255);
	noStroke();
	rect(canyon.x_pos, 429, canyon.width, 150);





	if (gameChar_y < floorPos_y + 25){
		isFalling = true;
	}

	else{
		isFalling = false;
	}



	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
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
			//left_Track
			
			//right_Track
			fill(120);
			triangle(gameChar_x, gameChar_y - 26, gameChar_x - 13, gameChar_y - 16, gameChar_x +13, gameChar_y - 16);
			fill(220);
			ellipse(gameChar_x, gameChar_y - 22.2, 5, 5);
			ellipse(gameChar_x - 5, gameChar_y - 18.5, 5, 5);
			ellipse(gameChar_x + 5, gameChar_y - 18.5, 5, 5);
			//Arms
			
			//left
			
			line(gameChar_x - 17, gameChar_y - 40, gameChar_x - 10, gameChar_y - 37);
			//ellipse(gameChar_x - 16, gameChar_y - 30, 4, 4);
			
			//right
			line(gameChar_x + 11, gameChar_y - 42, gameChar_x + 1 , gameChar_y - 37);
			//ellipse(gameChar_x + 16, gameChar_y - 30, 4, 4);
			
			
			//eyes
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
		
		gameChar_x -= 4;

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
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
	//left_Track
	
	//right_Track
	fill(120);
	triangle(gameChar_x, gameChar_y - 26, gameChar_x - 13, gameChar_y - 16, gameChar_x +13, gameChar_y - 16);
	fill(220);
	ellipse(gameChar_x, gameChar_y - 22.2, 5, 5);
	ellipse(gameChar_x - 5, gameChar_y - 18.5, 5, 5);
	ellipse(gameChar_x + 5, gameChar_y - 18.5, 5, 5);
	//Arms
	
	//left
	
	line(gameChar_x + 17, gameChar_y - 40, gameChar_x + 10, gameChar_y - 37);
	//ellipse(gameChar_x - 16, gameChar_y - 30, 4, 4);
	
	//right
	line(gameChar_x - 11, gameChar_y - 42, gameChar_x - 1 , gameChar_y - 37);
	//ellipse(gameChar_x + 16, gameChar_y - 30, 4, 4);
	
	
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

	gameChar_x += 4;

	}
	else if(isLeft)
	{
		//head
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		fill(220);
		rect(gameChar_x, gameChar_y - 50, 20, 21, 50);

		//left_Track
		
		
		//torso
		rectMode(CENTER);
		strokeWeight(1);
		stroke(0);
		fill(220);
		rect(gameChar_x, gameChar_y - 30, 19, 21, 4);

		//Tracks
		//left_Track
		
		//right_Track
		fill(120);
		triangle(gameChar_x, gameChar_y - 26, gameChar_x - 13, gameChar_y - 16, gameChar_x +13, gameChar_y - 16);
		fill(220);
		ellipse(gameChar_x, gameChar_y - 22.2, 5, 5);
		ellipse(gameChar_x - 5, gameChar_y - 18.5, 5, 5);
		ellipse(gameChar_x + 5, gameChar_y - 18.5, 5, 5);
		//Arms
		
		//left
		//fill(220);
		line(gameChar_x - 17, gameChar_y - 40, gameChar_x - 10, gameChar_y - 37);
		//ellipse(gameChar_x - 16, gameChar_y - 30, 4, 4);
		
		//right
		line(gameChar_x + 17 - 10, gameChar_y - 30, gameChar_x , gameChar_y - 37);
		//ellipse(gameChar_x + 16, gameChar_y - 30, 4, 4);
		
		
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

		gameChar_x -= 4;

	}
	else if(isRight)
	{
		// add your walking right code
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
		
		//right_Track
		fill(120);
		triangle(gameChar_x, gameChar_y - 26, gameChar_x - 13, gameChar_y - 16, gameChar_x +13, gameChar_y - 16);
		fill(220);
		ellipse(gameChar_x, gameChar_y - 22.2, 5, 5);
		ellipse(gameChar_x - 5, gameChar_y - 18.5, 5, 5);
		ellipse(gameChar_x + 5, gameChar_y - 18.5, 5, 5);
		//Arms
		
		//left
		//fill(220);
		line(gameChar_x + 17, gameChar_y - 40, gameChar_x + 10, gameChar_y - 37);
		//ellipse(gameChar_x - 16, gameChar_y - 30, 4, 4);
		
		//right
		line(gameChar_x - 7, gameChar_y - 30, gameChar_x , gameChar_y - 37);
		//ellipse(gameChar_x + 16, gameChar_y - 30, 4, 4);
		
		
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

		gameChar_x += 4;

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code

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
	//ellipse(gameChar_x - 16.5, gameChar_y - 48, 4, 4);
	
	//right
	line(gameChar_x + 17, gameChar_y - 48, gameChar_x + 10, gameChar_y - 37);
	//ellipse(gameChar_x + 17.5, gameChar_y - 48, 4, 4);
	
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
	else
	{
		// add your standing front facing code
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
		//fill(220);
		line(gameChar_x - 17, gameChar_y - 30, gameChar_x - 10, gameChar_y - 37);
		//ellipse(gameChar_x - 16, gameChar_y - 30, 4, 4);
		
		//right
		line(gameChar_x + 17, gameChar_y - 30, gameChar_x + 10, gameChar_y - 37);
		//ellipse(gameChar_x + 16, gameChar_y - 30, 4, 4);
		
		
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

	if (isJumping && gameChar_y > 300){
	
		gameChar_y -= 10;
	}

	if(isFalling || isPlummeting)
	{
		
	gameChar_y += 5;

	}


	
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here

}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	if (keyCode ==  37){
		isLeft = true;
	}

	else if (keyCode == 32){
		isJumping = true;
	}

	else if (keyCode == 39){
		isRight = true;
	}




}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	if (keyCode ==  37){
		isLeft = false;
	}

	else if (keyCode == 32){
		isJumping = false;
	}

	else if (keyCode == 39){
		isRight = false;
	}



}
