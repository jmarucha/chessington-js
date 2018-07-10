import Piece from './piece';
import Square from '../square';

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);
        let movesDeltas =
            [[0,1],[1,1],[1,0],[1,-1],
            [0,-1],[-1,-1],[-1,0],[-1,1]];
        return movesDeltas
            .map(d => Square.at(square.row+d[0], square.col+d[1]))
            .filter(sq => board.isSquareFree(sq) || board.isCapturable(sq, this.player));
    }
}
