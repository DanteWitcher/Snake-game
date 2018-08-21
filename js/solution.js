(function(root) {

	var EMPTY = root.grid.EMPTY;  //0
    var WALL = root.grid.WALL;	  //-1
    var SNAKE = root.grid.SNAKE;  //-2	
    var APPLE = root.grid.APPLE;  //-3
    var grid = root.grid.GRID_20;
    var getCoord = root.grid.getCoord; //map
    var direction = '';


		function random(min, max) {
		    var rand = min - 0.5 + Math.random() * (max - min + 1);
		    rand = Math.round(rand);
		    return rand;
		}

		function createSnake() {
			var x = random(3, 15), 
				y = random(3, 15);

			var coordSnake = [x, y];
			
			//return coordSnake;
			return function(length, coord) {

				if (!length) {
					return coordSnake;
				}
				else {
					var i = 1;

					while (i <= (length - 1)) {

						coord.push([x + i, y]);

						i++;
					}
					return coord;
				}	
			}
		}
		

		function createApple() {

		   return [random(3, 15), random(3, 15)];
		}


		function start() {
			var coord = [];
			    createSnake = createSnake();

			
			coord.push(createSnake());


			coord.concat(createSnake(3, coord));

			coord.push(createApple());
		 	return coord;
		}

		function addTail(coord) {
			var addArr = [];
			
			switch(direction) {
				case "left": addArr.push((coord[coord.length - 2][0] - 1), coord[coord.length - 2][1]);
				break;
				case "right": addArr.push((coord[coord.length - 2][0] + 1), coord[coord.length - 2][1]);
				break;
				case "up": addArr.push((coord[coord.length - 2][0]), coord[coord.length - 2][1]  + 1);
				break;
				case "down": addArr.push((coord[coord.length - 2][0]), coord[coord.length - 2][1]  - 1);
				break;
			}
			coord.splice(coord.length - 1, 0, addArr);
			coord[coord.length - 1] = createApple();
		}

		function gameOver(coord) {
			var score = coord.length - 1;
			clearInterval(root.grid.loop);
			document.querySelector('.grid').remove();
			document.querySelector('.outer').innerHTML = `GAME OVER, your score: ${score}`;
			document.querySelector('.outer').insertAdjacentHTML("afterEnd", '<input type="button" value="Start Again" onClick="window.location.reload()">');
			return;
		}

		function checkObstacle(coord) {

			var coordOfSnake = 1,
				isApple = coord[0][0] === coord[coord.length - 1][0] && coord[0][1] === coord[coord.length - 1][1],
				isWall = coord[0][0] === 0 || coord[0][0] == 19 || coord[0][1] === 0 || coord[0][1] === 19 || coord[1][0] === 0 || coord[1][0] == 19 || coord[1][1] === 0 || coord[1][1] === 19;
			
			if (isWall) { //left or right
				alert('you lose, it was the wall');
				gameOver(coord);
			}

			if (isApple) {
				//alert('it\'s apple');
				addTail(coord);
			}

			while(coordOfSnake < coord.length - 1) {
				if (coord[0][0] === coord[coordOfSnake][0] && coord[0][1] === coord[coordOfSnake][1]) {
			        alert('you\'ve crashed in tail');
					gameOver(coord);
				}
				coordOfSnake++;
			}
		}

		function goLeft(coord) {

			root.grid.going = 'horizontal';

			coord[0][0] = coord[0][0] - 1;

			checkObstacle(coord);
			
		}

		function goDown(coord) {
			root.grid.going = 'vertical';
			coord[0][1] = coord[0][1] + 1;
			checkObstacle(coord);
		}

		function goUp(coord) {
			root.grid.going = 'vertical';
			coord[0][1] = coord[0][1] - 1;
			checkObstacle(coord);
		}
		function goRight(coord) {
			root.grid.going = 'horizontal';
			coord[0][0] = coord[0][0] + 1;
			checkObstacle(coord);
		}

		function frontMoving(map, coord, direction) {
			var save;

				for (var i = coord.length - 2; i > 0; i--) {
					save = coord[i - 1].slice();
					coord[i] = save;
				}
			//go left
			switch(direction) {
				case "left": goLeft(coord);
				break;
				case "right": goRight(coord);
				break;
				case "up": goUp(coord);
				break;
				case "down": goDown(coord);
				break;
			}

			return coord;
		}


		var solutionStart = function (map) {
			direction = 'left';
			var coord = start();

			return coord
		}

		

		var solution = function (coord) {
			
			coord = frontMoving(null, coord, direction);
			return coord;
		}

		var moving = function (e) {
			var upCode = 38,
				downCode = 40,
				leftCode = 37,
				rightCode = 39;

			if (root.grid.going === "horizontal") {
				switch(e.keyCode) {
					case upCode: { direction = "up"; };
					break;
					case downCode: { direction = "down"; };
					break;
				}
			}
			if (root.grid.going === "vertical") {
				switch(e.keyCode) {
					case leftCode: { direction = "left"; };
					break;
					case rightCode: { direction = "right"; };
					break;
				}
			}
		}

 	root.grid.solutionStart = solutionStart;
 	root.grid.solution = solution;
 	root.grid.moving = moving;
 	root.grid.direction = direction;

})(this);