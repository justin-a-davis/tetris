class Tetromino {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.color = Math.floor(Math.random() * 6) + 1;

        this.orientation = 0;
        
        this.shape = [];
        switch (this.type) {
            case 'straightBlock':
                this.shape = [[
                    [1, 1, 1, 1]
                ], [
                    [1],
                    [1],
                    [1],
                    [1]
                ]];
                break;

            case 'leftLBlock':
                this.shape = [[
                    [1, 1],
                    [0, 1],
                    [0, 1]
                ], [
                    [0, 0, 1],
                    [1, 1, 1]
                ], [
                    [1, 0],
                    [1, 0],
                    [1, 1]
                ], [
                    [1, 1, 1],
                    [1, 0, 0]
                ]];
                break;

            case 'rightLBlock':
                this.shape = [[
                    [1, 1],
                    [1, 0],
                    [1, 0]
                ], [
                    [1, 1, 1],
                    [0, 0, 1]
                ], [
                    [0, 1],
                    [0, 1],
                    [1, 1]
                ], [
                    [1, 0, 0],
                    [1, 1, 1]
                ]];
                break;

            case 'leftZBlock':
                this.shape = [[
                    [1, 1, 0],
                    [0, 1, 1]
                ], [
                    [0, 1],
                    [1, 1],
                    [1, 0]
                ]];
                break;

            case 'rightZBlock':
                this.shape = [[
                    [0, 1, 1],
                    [1, 1, 0]
                ], [
                    [1, 0],
                    [1, 1],
                    [0, 1]
                ]];
                break;

            case 'tBlock':
                this.shape = [[
                    [0, 1, 0],
                    [1, 1, 1]
                ], [
                    [1, 0],
                    [1, 1],
                    [1, 0]
                ], [
                    [1, 1, 1],
                    [0, 1, 0]
                ], [
                    [0, 1],
                    [1, 1],
                    [0, 1]
                ]];
                break;

            case 'squareBlock':
                this.shape = [[
                    [1, 1],
                    [1, 1]
                ]];
                break;
        }

        this.maxY = 20 - this.shape[this.orientation].length;
        this.maxX = 10 - this.shape[this.orientation][this.shape[this.orientation].length - 1].length;
    }

    rotate(direction) {
        if (direction === 'right') {
            if (this.shape.length === this.orientation + 1) {
                this.orientation = 0;
                this.maxY = 20 - this.shape[this.orientation].length;
                this.maxX = 10 - this.shape[this.orientation][this.shape[this.orientation].length - 1].length;
            } else {
                this.orientation++;
                this.maxY = 20 - this.shape[this.orientation].length;
                this.maxX = 10 - this.shape[this.orientation][this.shape[this.orientation].length - 1].length;
            }
        } else if (direction === 'left') {
            if (this.orientation === 0) {
                this.orientation =  this.shape.length - 1;
                this.maxY = 20 - this.shape[this.orientation].length;
                this.maxX = 10 - this.shape[this.orientation][this.shape[this.orientation].length - 1].length;
            } else {
                this.orientation--;
                this.maxY = 20 - this.shape[this.orientation].length;
                this.maxX = 10 - this.shape[this.orientation][this.shape[this.orientation].length - 1].length;
            }
        }
        
    }
};