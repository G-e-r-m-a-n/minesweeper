const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');

const tilesImage = new Image();
tilesImage.src = "img/tiles.jpg"

var C_S = 32;
var M = 10;
var N = 10;

var mines = [];
var grid = [];
var grid_open = [];
var close_cells = 0;
var first_click = true;

function gameOver() {
	for (var i = 0; i < M; i++) {
		for (var j = 0; j < N; j++) {
			ctx.drawImage(tilesImage, C_S*grid[i][j], 0, C_S, C_S, j*C_S, i*C_S, C_S, C_S);
		}
	}

	ctx.fillStyle = "red"
	ctx.font = "40px Arial";
	ctx.fillText("GAME OVER", (N-7.5)*C_S/2, M*C_S/2);	
}

function youWin() {
	for (var i = 0; i < M; i++) {
		for (var j = 0; j < N; j++) {
			ctx.drawImage(tilesImage, C_S*grid[i][j], 0, C_S, C_S, j*C_S, i*C_S, C_S, C_S);
		}
	}
	ctx.fillStyle = "red"
	ctx.font = "40px Arial";
	ctx.fillText("You Win", (N-4.4)*C_S/2, M*C_S/2);
}

function putMines(click_i, click_j) {
	for (var i = 0; i < M; i++) {
		grid.push([]);
		grid_open.push([]);
		for (var j = 0; j < N; j++) {
			if ((Math.random()*100 < 10) && ((i != click_i) || (j != click_j))){
				grid[i].push(9);
				mines.push({i: i,j: j});
			} else {
				grid[i].push(0);
			}
			grid_open[i].push(0);
			close_cells++;
		}
	}

	for(var k = 0; k < mines.length; k++) {
		if(mines[k].i != 0) {
			if(mines[k].j != 0) {
				if(grid[mines[k].i - 1][mines[k].j - 1] != 9) grid[mines[k].i - 1][mines[k].j - 1] += 1;
			}
			if(grid[mines[k].i - 1][mines[k].j] != 9) grid[mines[k].i - 1][mines[k].j] += 1;
			if(mines[k].j != N-1) {
				if(grid[mines[k].i - 1][mines[k].j + 1] != 9) grid[mines[k].i - 1][mines[k].j + 1] += 1;
			}
		}

		if(mines[k].j != 0) {
			if(grid[mines[k].i][mines[k].j - 1] != 9) grid[mines[k].i][mines[k].j - 1] += 1;
		}
		if(mines[k].j != N-1) {
			if(grid[mines[k].i][mines[k].j + 1] != 9) grid[mines[k].i][mines[k].j + 1] += 1;
		}

		if(mines[k].i != M-1) {
			if(mines[k].j != 0) {
				if(grid[mines[k].i + 1][mines[k].j - 1] != 9) grid[mines[k].i + 1][mines[k].j - 1] += 1;
			}
			if(grid[mines[k].i + 1][mines[k].j] != 9) grid[mines[k].i + 1][mines[k].j] += 1;
			if(mines[k].j != N-1) {
				if(grid[mines[k].i + 1][mines[k].j + 1] != 9) grid[mines[k].i + 1][mines[k].j + 1] += 1;
			}
		}
	}
}

function init() {
	for (var i = 0; i < M; i++) {
		for (var j = 0; j < N; j++) {
			ctx.drawImage(tilesImage, 10*C_S, 0, C_S, C_S, j*C_S, i*C_S, C_S, C_S);
		}
	}
}

function zero(i, j) {
	ctx.drawImage(tilesImage, C_S*grid[i][j], 0, C_S, C_S, j*C_S, i*C_S, C_S, C_S);
	grid_open[i][j] = 1;
	close_cells--;

	if(i != 0) {
		if(j != 0) {
			if (grid_open[i-1][j-1] == 0) {
				if (grid[i-1][j-1] == 0) {
					zero(i-1, j-1);
				} else {
					ctx.drawImage(tilesImage, C_S*grid[i-1][j-1], 0, C_S, C_S, (j-1)*C_S, (i-1)*C_S, C_S, C_S);
					grid_open[i-1][j-1] = 1;
					close_cells--;
				}
			}
		}
		if (grid_open[i-1][j] == 0) {
			if (grid[i-1][j] == 0) {
				zero(i-1, j);
			} else {
				ctx.drawImage(tilesImage, C_S*grid[i-1][j], 0, C_S, C_S, j*C_S, (i-1)*C_S, C_S, C_S);
				grid_open[i-1][j] = 1;
				close_cells--;
			}
		}
		if(j != N-1) {
			if (grid_open[i-1][j+1] == 0) {
				if (grid[i-1][j+1] == 0) {
					zero(i-1, j+1);
				} else {
					ctx.drawImage(tilesImage, C_S*grid[i-1][j+1], 0, C_S, C_S, (j+1)*C_S, (i-1)*C_S, C_S, C_S);
					grid_open[i-1][j+1] = 1;
					close_cells--;
				}
			}
		}
	}

	if(j != 0) {
		if (grid_open[i][j-1] == 0) {
			if (grid[i][j-1] == 0) {
				zero(i, j-1);
			} else {
				ctx.drawImage(tilesImage, C_S*grid[i][j-1], 0, C_S, C_S, (j-1)*C_S, i*C_S, C_S, C_S);
				grid_open[i][j-1] = 1;
				close_cells--;
			}
		}
	}
	if(j != N-1) {
		if (grid_open[i][j+1] == 0) {
			if (grid[i][j+1] == 0) {
				zero(i, j+1);
			} else {
				ctx.drawImage(tilesImage, C_S*grid[i][j+1], 0, C_S, C_S, (j+1)*C_S, i*C_S, C_S, C_S);
				grid_open[i][j+1] = 1;
				close_cells--;
			}
		}
	}

	if(i != M-1) {
		if(j != 0) {
			if (grid_open[i+1][j-1] == 0) {
				if (grid[i+1][j-1] == 0) {
					zero(i+1, j-1);
				} else {
					ctx.drawImage(tilesImage, C_S*grid[i+1][j-1], 0, C_S, C_S, (j-1)*C_S, (i+1)*C_S, C_S, C_S);
					grid_open[i+1][j-1] = 1;
					close_cells--;
				}
			}
		}
		if (grid_open[i+1][j] == 0) {
			if (grid[i+1][j] == 0) {
				zero(i+1, j);
			} else {
				ctx.drawImage(tilesImage, C_S*grid[i+1][j], 0, C_S, C_S, j*C_S, (i+1)*C_S, C_S, C_S);
				grid_open[i+1][j] = 1;
				close_cells--;
			}
		}
		if(j != N-1) {
			if (grid_open[i+1][j+1] == 0) {
				if (grid[i+1][j+1] == 0) {
					zero(i+1, j+1);
				} else {
					ctx.drawImage(tilesImage, C_S*grid[i+1][j+1], 0, C_S, C_S, (j+1)*C_S, (i+1)*C_S, C_S, C_S);
					grid_open[i+1][j+1] = 1;
					close_cells--;
				}
			}
		}
	}

}

function check(newY, newX) {
//	var rect = canvas.getBoundingClientRect();
//	var newX = Math.floor((event.clientX - rect.left) / C_S);
//	var newY = Math.floor((event.clientY - rect.top) / C_S);

	if(grid_open[newY][newX] == 0) {
		if(grid[newY][newX] == 9) gameOver();
		else if(grid[newY][newX] == 0) zero(newY, newX);
		else {
			ctx.drawImage(tilesImage, C_S*grid[newY][newX], 0, C_S, C_S, newX*C_S, newY*C_S, C_S, C_S);
			grid_open[newY][newX] = 1;
			close_cells--;
		}

		if(close_cells == mines.length) {
			youWin();
		}
	}
}

function flag(event) {
	var rect = canvas.getBoundingClientRect();
	var newX = Math.floor((event.clientX - rect.left) / C_S);
	var newY = Math.floor((event.clientY - rect.top) / C_S);

	if(grid_open[newY][newX] == 0) {
		ctx.drawImage(tilesImage, C_S*11, 0, C_S, C_S, newX*C_S, newY*C_S, C_S, C_S);
		grid_open[newY][newX] = 2;
	} else if(grid_open[newY][newX] == 2) {
		ctx.drawImage(tilesImage, C_S*10, 0, C_S, C_S, newX*C_S, newY*C_S, C_S, C_S);
		grid_open[newY][newX] = 0;
	}

}

function main() {
	setTimeout(init, 200);
}

canvas.addEventListener("mouseup", function temp(event) {
	var rect = canvas.getBoundingClientRect();
	var newX = Math.floor((event.clientX - rect.left) / C_S);
	var newY = Math.floor((event.clientY - rect.top) / C_S);

	if((event.ctrlKey)&&(event.which == 1) || (event.which == 3)) {
		flag(event);
	} else if (event.which == 1){
		if (first_click) {
			putMines(newY, newX);
			first_click = false;
		}
		check(newY, newX);
	}
})

//canvas.addEventListener("contextmenu", function temp(event) {
//	flag(event);
//})

main()