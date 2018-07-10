import Piece from './piece';
import Player from '../player';
import Square from '../square';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);
        let dir = (this.player === Player.WHITE) ? 1 : -1;

        let moves = [];
        let squareInFront = Square.at(square.row + dir, square.col);
        if (board.isSquareFree(squareInFront)) {
            moves.push(Square.at(square.row + dir, square.col));
            let square2InFront = Square.at(squareInFront.row + dir, squareInFront.col);
            if (!this.hasMoved && board.isSquareFree(square2InFront)) {
                moves.push(Square.at(square2InFront.row, square2InFront.col));
            }
        }

        [1, -1].forEach(dCol => {
            let checkCapture = Square.at(square.row + dir, square.col + dCol);
            if(board.isCapturable(checkCapture, this.player)) {
                moves.push(checkCapture);
            }
        });

        return moves.filter(sq => sq.isOnBoard());
    }
}
