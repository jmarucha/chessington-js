import Square from '../square';

export default class Piece {
    constructor(player) {
        this.player = player;
        this.hasMoved = false;
    }

    getAvailableMoves(board) { // eslint-disable-line no-unused-vars
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        this.hasMoved = true;

        board.clearEnPassantFlags(this.player)
    }

    getMovesInDirections(dirs, board) {
        let moves = [];
        const currentSquare = board.findPiece(this);
        dirs.forEach(dir => {
            let coord = Square.at(currentSquare.row + dir[0], currentSquare.col + dir[1]);
            while (coord.isOnBoard()) {
                if (!board.isSquareFree(coord)) {
                    if (board.isCapturable(coord, this.player)) {
                        moves.push(Square.at(coord.row, coord.col)); // deep copy
                    }
                    break;
                }

                moves.push(Square.at(coord.row, coord.col)); // deep copy
                coord = Square.at(coord.row + dir[0], coord.col + dir[1]);
            }
        });
        return moves;
    }

    getLateralMoves(board) {
        return this.getMovesInDirections([[1, 0], [0, 1], [-1, 0], [0, -1]], board);
    }

    getDiagonalMoves(board) {
        return this.getMovesInDirections([[1, 1], [-1, 1], [1, -1], [-1, -1]], board);
    }

    getAttackableSquares(board) {
        return this.getAvailableMoves(board);
    }
}
