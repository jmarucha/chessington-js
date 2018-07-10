import Piece from './piece';
import Square from '../square';

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {

            let moves = this.getAttackableSquares(board)
            .filter(sq => board.isSquareFree(sq) || board.isCapturable(sq, this.player));
            let square = board.findPiece(this);
            board.setPiece(square, undefined); // Temporarily remove the King cause it can't hide behind itself
            moves = moves.filter(sq => !board.isAttacked(sq, this.player));
            board.setPiece(square, this); // Put it back
            return moves;
    }

    getAttackableSquares(board) {
        let square = board.findPiece(this);
        let movesDeltas =
            [[0,1],[1,1],[1,0],[1,-1],
            [0,-1],[-1,-1],[-1,0],[-1,1]];
        return movesDeltas
            .map(d => Square.at(square.row+d[0], square.col+d[1]))
            .filter(sq => sq.isOnBoard());
    }
}
