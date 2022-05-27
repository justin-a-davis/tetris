class Board {
    constructor() {
        this.boardArray = [];

        // 10 by 20, 2d array. Each number is a block color
        for (let y = 0; y < 20; y++) {
            this.boardArray[y] = [];
            for (let x = 0; x < 10; x++) {
                this.boardArray[y][x] = 0;
            }
        }
    }


    // Returns true if other passed boardArray intersects with this board
    boardIntersects(otherBoard) {
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 10; x++) {
                if (this.boardArray[y][x] && otherBoard.boardArray[y][x] !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    spawnTetromino(type) {
        const tetromino = new Tetromino(type, 4, 0);
        const ori = tetromino.orientation;
        for (let y = 0; y < tetromino.shape[ori].length; y++) {
            for (let x = 0; x < tetromino.shape[ori][y].length; x++) {
                if (tetromino.shape[ori][y][x] !== 0) {
                    this.boardArray[tetromino.y + y][tetromino.x + x] =
                    tetromino.color;
                }
            }
        }
        return tetromino;
    }

    moveTetromino(tetromino, direction) {
        const tet = tetromino.shape[tetromino.orientation];

        // Erase tetromino
        this.clear();

        // Update location
        switch (direction) {
            case 'down':
                tetromino.y++;
                break;
            case 'up':
                tetromino.y--;
                break;
            case 'right':
                tetromino.x++;
                break;
            case 'left':
                tetromino.x--;
                break;
            case 'rotateRight':
                tetromino.rotate('right');
                break;
            case 'rotateLeft':
                tetromino.rotate('left');
                break;
        }

        // Draw in new position
        for (let y = 0; y < tet.length; y++) {
            for (let x = 0; x < tet[y].length; x++) {
                if (tet[y][x] !== 0) {
                    this.boardArray[tetromino.y + y][tetromino.x + x] = 
                    tetromino.color;
                }
            }
        }
    }

    merge(firstBoard, secondBoard) {
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 10; x++) {
                if (firstBoard.boardArray[y][x] !== 0) {
                    this.boardArray[y][x] = firstBoard.boardArray[y][x];
                } else if (secondBoard.boardArray[y][x] !== 0) {
                    this.boardArray[y][x] = secondBoard.boardArray[y][x];
                } else {
                    this.boardArray[y][x] = 0;
                }
            }
        }
    }

    clear() {
        for (let y = 0; y < 20; y++) {
            this.boardArray[y] = [];
            for (let x = 0; x < 10; x++) {
                this.boardArray[y][x] = 0;
            }
        }
    }

    clearRow(row) {
        for (let x = 0; x < 10; x++) {
            this.boardArray[row][x] = 0;
        }
        this.shiftRowsDown(row);
    }

    shiftRowsDown(row) {
        for (let y = row; y > 0; y--) {
            for (let x = 0; x < 10; x++) {
                this.boardArray[y][x] = this.boardArray[y - 1][x];
            }
        }
    }
};