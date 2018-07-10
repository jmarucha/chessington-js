import GameSettings from './gameSettings';

export default class Square {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    static at(row, col) {
        return new Square(row, col);
    }

    equals(otherSquare) {
        return !!otherSquare && this.row === otherSquare.row && this.col === otherSquare.col;
    }

    toString() {
        return `Row ${this.row}, Col ${this.col}`;
    }
    isOnBoard() {
        return this.row < GameSettings.BOARD_SIZE
            && this.row >= 0
            && this.col < GameSettings.BOARD_SIZE
            && this.col >= 0;
    }
}
