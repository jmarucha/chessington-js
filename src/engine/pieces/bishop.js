import Piece from './piece';

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        return this.getDiagonalMoves(board);
        // let square = board.findPiece(this);
        // let moves = [];
        // for (let x = -GameSettings.BOARD_SIZE + 1; x < GameSettings.BOARD_SIZE; ++x) {
        //     if (x === 0) {
        //         continue;
        //     }
        //     moves.push(Square.at(square.row+x, square.col+x));
        //     moves.push(Square.at(square.row-x, square.col+x));
        // }
        // return moves.filter(sq => sq.isOnBoard());
    }
}
