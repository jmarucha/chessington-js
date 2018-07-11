import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import King from './pieces/king'

export default class Board {
    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    setPiece(square, piece) {
        this.board[square.row][square.col] = piece;
    }

    getPiece(square) {
        return this.board[square.row][square.col];
    }

    findPiece(pieceToFind) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    movePiece(fromSquare, toSquare) {
        const movingPiece = this.getPiece(fromSquare);
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
    }

    isSquareFree(square) {
        return square.isOnBoard() && typeof this.board[square.row][square.col] === "undefined";
    }

    isCapturable(square, player) {
        return square.isOnBoard() && (this.isSquareFree(square)
            ? false
            : (this.getPiece(square).player !== player && !(this.getPiece(square) instanceof King)));
    }

    clearEnPassantFlags(player) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                let fig = this.board[row][col];
                if (fig && fig.enPassant && fig.player === player) {
                    fig.enPassant = false;
                }
            }
        }
    }

    findAllPieces() {
        let pieces = [];
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                let currentPiece = this.board[row][col];
                if (!!currentPiece) {
                    pieces.push(currentPiece);
                }
            }
        }
        return pieces;
    }

    isAttacked(square, player) {
        let pieces = this.findAllPieces().filter(piece => piece.player !== player);
        for (let piece of pieces) {
            for (let attackedSquare of piece.getAttackableSquares(this)) {
                if (square.equals(attackedSquare)) {
                    return true;
                }
            }
        }
        return false;
    }

    findKing(player) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] instanceof King && this.board[row][col].player === player) {
                    return Square.at(row, col);
                }
            }
        }

    }

    checkCheck() {
        let location = this.findKing(this.currentPlayer);
        let king = this.getPiece(location);
        this.setPiece(location, undefined);
        let check = this.isAttacked(location, this.currentPlayer);
        this.setPiece(location, king);
        return check;
    }

    checkMoveAvoidsCheck(fromSquare, toSquare) {
        if (!this.checkCheck()) {
            return true;
        }
        let wasOnToSquare = this.getPiece(toSquare);
        let wasOnFromSquare = this.getPiece(fromSquare);
        this.setPiece(toSquare, wasOnFromSquare);
        this.setPiece(fromSquare, undefined);

        let checkPersists = this.checkCheck();
        this.setPiece(fromSquare, wasOnFromSquare);
        this.setPiece(toSquare, wasOnToSquare);

        return !checkPersists;
    }

    canMakeMove() {
        let pieces = this.findAllPieces().filter(piece => piece.player === this.currentPlayer);
        for (let piece of pieces) {
            let moves = piece.getAvailableMoves(this);
            for (let move of moves) {
                if (this.checkMoveAvoidsCheck(this.findPiece(piece), move))
                    return true;
            }
        }
        return false;
    }

    checkCheckmate() {
        return this.checkCheck() && !this.canMakeMove();
    }

    checkStalemate() {
        return !this.checkCheck() && !this.canMakeMove();
    }
}
