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
        

        if (this.player === Player.WHITE) {
            if (square.row === 1) {
                moves.push(Square.at(square.row + 2, square.col));
            }
            moves.push(Square.at(square.row + 1, square.col));
        }
        if (this.player === Player.BLACK) {
            if (square.row === GameSettings.BOARD_SIZE-2) {
                moves.push(Square.at(square.row - 2, square.col));
            }
            moves.push(Square.at(square.row - 1, square.col));
        }

        return moves;
    }
}
