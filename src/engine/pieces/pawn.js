import Piece from './piece';
import Player from '../player';
import Square from '../square';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
        this.enPassant = false;
        this.dir = (this.player === Player.WHITE) ? 1 : -1;
    }

    getAvailableMoves(board) {
        let square = board.findPiece(this);

        let moves = [];
        let squareInFront = Square.at(square.row + this.dir, square.col);
        if (board.isSquareFree(squareInFront)) {
            moves.push(Square.at(square.row + this.dir, square.col));
            let square2InFront = Square.at(squareInFront.row + this.dir, squareInFront.col);
            if (!this.hasMoved && board.isSquareFree(square2InFront)) {
                moves.push(Square.at(square2InFront.row, square2InFront.col));
            }
        }

        [1, -1].forEach(dCol => {
            let checkCapture = Square.at(square.row + this.dir, square.col + dCol);
            if(board.isCapturable(checkCapture, this.player)) {
                moves.push(checkCapture);
            }
        });

        [1, -1].forEach(dCol => {
            let checkEnPassant = Square.at(square.row, square.col + dCol);
            if (board.getPiece(checkEnPassant) && board.getPiece(checkEnPassant).enPassant) {
                moves.push(Square.at(checkEnPassant.row+this.dir, checkEnPassant.col));
            }
        });
        return moves.filter(sq => sq.isOnBoard());
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);

        if (newSquare.row - currentSquare.row === 2*this.dir) {
            this.enPassant = true;
        }

        this.clearEnPassantPawn(board, newSquare);
        
        super.moveTo(board, newSquare);
    }

    clearEnPassantPawn(board, newSquare) {
        let square = Square.at(newSquare.row - this.dir, newSquare.col);
        let piece = board.getPiece(square)
        if (piece && piece.enPassant && this.player !== piece.player) {
            board.setPiece(square, undefined);
        }
    }
}
