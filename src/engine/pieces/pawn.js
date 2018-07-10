import Piece from './piece';
import Player from '../player';
import Square from '../square';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);

        if (this.player === Player.WHITE) {
            return [Square.at(square.row + 1, square.col)];
        }
        if (this.player === Player.BLACK) {
            return [Square.at(square.row - 1, square.col)];
        }

        return new Array(0);
    }
}
