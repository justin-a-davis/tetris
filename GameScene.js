class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });

        this.score = 0;

        // Empty for now; will hold Phaser cursor keys
        this.cursors = null;
        
        // Step is how fast the tetrominos move down
        this.lastStep = 0;
        // Default step is 1 sec
        this.stepDelay = 1000;

        // Time since last move of tetromino by player, fluid movement in tetris is undesireable
        this.lastMove = 0;
        this.moveDelay = 300;

        // This board will hold the unmoving blocks
        this.staticBoard = new Board();

        // This board is just for the current tetromino
        this.tetBoard = new Board();

        // This board will be combined from the other 2 and rendered
        this.gameBoard = new Board();

        // Current player controlled tetromino
        this.currentTet = null;


        this.hasRotated = false;
    }

    preload() {
        // Load the images
        this.load.image('gray_block', 'assets/images/gray.png');
        this.load.image('red_block', 'assets/images/red2.png');
        this.load.image('blue_block', 'assets/images/blue.png');
        this.load.image('green_block', 'assets/images/green.png');
        this.load.image('orange_block', 'assets/images/orange.png');
        this.load.image('purple_block', 'assets/images/purple.png');
        this.load.image('pink_block', 'assets/images/pink.png');
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.text(400, 20, 'Tetris', { font: '48px Arial', fill: '#fff' });

        this.drawBoard(this.gameBoard);
    }

    update() {
        this.handleInput();
        this.stepGame();
        this.gameBoard.merge(this.tetBoard, this.staticBoard);
        this.drawBoard(this.gameBoard);
    }

    drawBoard(board) {
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 10; x++) {
                switch (board.boardArray[y][x]) {
                    case 0:
                        this.add.sprite(x * 32, y * 32, 'gray_block').setScale(.5).setOrigin(0);
                        break;
                    case 1:
                        this.add.sprite(x * 32, y * 32, 'red_block').setScale(.5).setOrigin(0);
                        break;
                    case 2:
                        this.add.sprite(x * 32, y * 32, 'blue_block').setScale(.5).setOrigin(0);
                        break;
                    case 3:
                        this.add.sprite(x * 32, y * 32, 'green_block').setScale(.5).setOrigin(0);
                        break;
                    case 4:
                        this.add.sprite(x * 32, y * 32, 'orange_block').setScale(.5).setOrigin(0);
                        break;
                    case 5:
                        this.add.sprite(x * 32, y * 32, 'purple_block').setScale(.5).setOrigin(0);
                        break;
                    case 6:
                        this.add.sprite(x * 32, y * 32, 'pink_block').setScale(.5).setOrigin(0);
                        break;
                }
            }
        }
    }

    pickRandomTet() {
        const pick = Math.floor(Math.random() * 7);

        switch (pick) {
            case 0:
                return 'straightBlock';
            case 1:
                return 'leftLBlock';
            case 2:
                return 'rightLBlock';
            case 3:
                return 'leftZBlock';
            case 4:
                return 'rightZBlock';
            case 5:
                return 'tBlock';
            case 6:
                return 'squareBlock';
        }
    }

    handleInput() {
        if (this.time.now - this.lastMove > this.moveDelay) {
            if (this.cursors.up.isUp) {
                this.hasRotated = false;
            }
            if (this.cursors.left.isDown && this.currentTet.x > 0) {
                this.tetBoard.moveTetromino(this.currentTet, 'left');
                if (this.tetBoard.boardIntersects(this.staticBoard)) {
                    this.tetBoard.moveTetromino(this.currentTet, 'right');
                }
                this.lastMove = this.time.now;

            } else if (this.cursors.right.isDown && this.currentTet.x !== this.currentTet.maxX) {
                this.tetBoard.moveTetromino(this.currentTet, 'right');
                if (this.tetBoard.boardIntersects(this.staticBoard)) {
                    this.tetBoard.moveTetromino(this.currentTet, 'left');
                }
                this.lastMove = this.time.now;

            } else if (this.cursors.down.isDown && this.currentTet.y !== this.currentTet.maxY) {
                this.tetBoard.moveTetromino(this.currentTet, 'down');
                if (this.tetBoard.boardIntersects(this.staticBoard)) {
                    this.tetBoard.moveTetromino(this.currentTet, 'up');
                }
                this.lastMove = this.time.now;
            }
        }
        if (this.cursors.up.isDown && this.hasRotated === false &&
            this.currentTet.x !== this.currentTet.maxX && this.currentTet.y !== this.currentTet.maxY) {
            this.tetBoard.moveTetromino(this.currentTet, 'rotateRight');
            if (this.tetBoard.boardIntersects(this.staticBoard)) {
                this.tetBoard.moveTetromino(this.currentTet, 'rotateLeft');
            }
            this.hasRotated = true;
            this.lastRotate = this.time.now;
            }
    }

    handleCurrentTet() {
        if (this.currentTet !== null && this.currentTet.y !== this.currentTet.maxY) {
            if (this.tetBoard.boardIntersects(this.staticBoard) === false) {
                this.tetBoard.moveTetromino(this.currentTet, 'down');
            } 
            if (this.tetBoard.boardIntersects(this.staticBoard)) {
                this.tetBoard.moveTetromino(this.currentTet, 'up');
                this.staticBoard.merge(this.staticBoard, this.tetBoard);
                this.currentTet = null
                this.tetBoard.clear();
                this.currentTet = this.tetBoard.spawnTetromino(this.pickRandomTet());
                // Check for game over
                if (this.staticBoard.boardIntersects(this.tetBoard)) {
                    this.scene.stop('GameScene');
                    //this.scene.start('GameOver');
                    console.log('Game Over');
                }

            }
        }  else {
            this.staticBoard.merge(this.tetBoard, this.staticBoard);
            this.tetBoard.clear();
            this.currentTet = this.tetBoard.spawnTetromino(this.pickRandomTet());
            }
    }

    // Check if a horizontal line is full
    handleStaticBoard() {
        for (let y = 0; y < 20; y++) {
            let full = true;
            for (let x = 0; x < 10; x++) {
                if (this.staticBoard.boardArray[y][x] === 0) {
                    full = false;
                }
            }
            if (full) {
                this.staticBoard.clearRow(y);
                this.score += 10;
                console.log(this.score);
                if (this.score % 100 === 0)  {
                    if (this.stepDelay > 100) {
                        console.log('stepDelay: ' + this.stepDelay);
                        this.stepDelay -= 100;
                    }
                }
            }
        }
    }


    stepGame() {
        if (this.time.now - this.lastStep > this.stepDelay) {

            this.handleCurrentTet();
            this.handleStaticBoard();

            this.lastStep = this.time.now;
        }
    }
};