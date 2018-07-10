import Piece from './piece';
import Square from '../square';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);
        let movesDeltas =
            [[2,1],[2,-1],[-2,1],[-2,-1],
            [1,2],[-1,2],[1,-2],[-1,-2]]
        return movesDeltas
            .map(d => Square.at(square.row+d[0], square.col+d[1]))
            .filter(sq => sq.isOnBoard());
    }
}
