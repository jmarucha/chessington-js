import Piece from './piece';
import Player from '../player';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);
        let moves = [];
        
        let dir = (this.player === Player.WHITE) ? 1 : -1;

        if (!this.hasMoved) {
            moves.push(Square.at(square.row + 2*dir, square.col));
        }
        moves.push(Square.at(square.row + dir, square.col));

        return moves;
    }
}
