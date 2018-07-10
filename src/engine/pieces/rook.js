import Piece from './piece';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);
        let moves = [];
        for (let x = 0; x < GameSettings.BOARD_SIZE; ++x) {
            if (x !== square.row) {
                moves.push(Square.at(x, square.col));
            }
            if (x !== square.col) {
                moves.push(Square.at(square.row, x));
            }
        }
        return moves;
    }
}
