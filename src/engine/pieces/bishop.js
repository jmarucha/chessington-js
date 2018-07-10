import Piece from './piece';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);
        let moves = [];
        for (let x = -GameSettings.BOARD_SIZE + 1; x < GameSettings.BOARD_SIZE; ++x) {
            if (x === 0) {
                continue;
            }
            moves.push(Square.at(square.row+x, square.col+x));
            moves.push(Square.at(square.row-x, square.col+x));
        }
        return moves.filter(sq => sq.isOnBoard());
    }
}
