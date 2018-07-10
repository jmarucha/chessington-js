import Piece from './piece';

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        return this.getLateralMoves(board).concat(this.getDiagonalMoves(board));
        // let square = board.findPiece(this);
        // let moves = [];
        // for (let x = -GameSettings.BOARD_SIZE + 1; x < GameSettings.BOARD_SIZE; ++x) {
        //     if (x === 0) {
        //         continue;
        //     }
        //     moves.push(Square.at(square.row+x, square.col+x));
        //     moves.push(Square.at(square.row-x, square.col+x));
        //     moves.push(Square.at(square.row, square.col+x));
        //     moves.push(Square.at(square.row+x, square.col));
        // }
        // return moves.filter(sq => sq.isOnBoard());
    }
}
