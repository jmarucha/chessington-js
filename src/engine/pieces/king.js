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

            let position = board.findPiece(this)
            if (this.shortCastlingAvialable(board)) {
                moves.push(Square.at(position.row,6));
            }
            if (this.longCastlingAvialable(board)) {
                moves.push(Square.at(position.row,2));
            }

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

    shortCastlingAvialable(board) {
        return this.castlingUnobstructed(board, [5,6], 7)
    }

    longCastlingAvialable(board) {
        return this.castlingUnobstructed(board, [1,2,3], 0)
    }

    castlingUnobstructed(board, cols, rookCol){
        let kingPosition = board.findPiece(this);
        let rook = board.getPiece(Square.at(kingPosition.row, rookCol));

        if (!rook || rook.hasMoved || this.hasMoved) {
            return false;
        }
        for (let col of cols) {
            let square = Square.at(kingPosition.row, col);

            //squares are empty and unattacked
            if (board.isAttacked(square, this.player) || board.getPiece(square)) {
                return false;
            }
        }
        //king is unattacked

        console.log("king unat")
        return !board.checkCheck();
    }
    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);


        let row = board.findPiece(this).row;
        //castlings
        if (!this.hasMoved) {
            if (newSquare.col === 2) {
                let rook = board.getPiece(Square.at(row, 0))
                board.setPiece(Square.at(row, 3), rook);
                board.setPiece(Square.at(row, 0), undefined);
            }
            if (newSquare.col === 6) {
                let rook = board.getPiece(Square.at(row,7))
                board.setPiece(Square.at(row, 5), rook);
                board.setPiece(Square.at(row, 7), undefined);
            }
        }
        super.moveTo(board, newSquare);
    }

}
