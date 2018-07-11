import 'chai/register-should';
import Board from '../../src/engine/board';
import Pawn from '../../src/engine/pieces/pawn';
import Queen from '../../src/engine/pieces/queen';
import Rook from '../../src/engine/pieces/rook';
import King from '../../src/engine/pieces/king';
import Player from '../../src/engine/player';
import Square from '../../src/engine/square';

describe('Board', () => {

    describe('pawns', () => {

        let board;
        beforeEach(() => { // Common code executed before each test.
            board = new Board();
        });

        it('can be added to the board', () => {
            // Arrange
            const pawn = new Pawn(Player.WHITE);
            const square = Square.at(0, 0);

            // Act
            board.setPiece(square, pawn);

            // Assert
            board.getPiece(square).should.equal(pawn); // Object equality: same object reference
        });

        it('can be found on the board', () => {
            // Arrange
            const pawn = new Pawn(Player.WHITE);
            const square = Square.at(6, 4);

            // Act
            board.setPiece(square, pawn);

            // Assert
            board.findPiece(pawn).should.eql(square); // Object equivalence: different objects, same data
        });

    });

    describe('checkmate', () => {

        let board;
        beforeEach(() => {
            board = new Board(Player.WHITE);
        });

        it('is identified correctly for queen check', () => {
            const blackKing = new King(Player.BLACK);
            const whiteKing = new King(Player.WHITE);
            const blackQueen = new Queen(Player.BLACK)

            board.setPiece(Square.at(1,1), blackQueen);
            board.setPiece(Square.at(2,2), blackKing);
            board.setPiece(Square.at(0,0), whiteKing);

            board.checkCheckmate().should.eql(true)
        });

        it('should not be confused with stalemate', () => {
            const blackKing = new King(Player.BLACK);
            const whiteKing = new King(Player.WHITE);
            const blackQueen = new Rook(Player.BLACK)

            board.setPiece(Square.at(1,1), blackQueen);
            board.setPiece(Square.at(2,2), blackKing);
            board.setPiece(Square.at(0,0), whiteKing);

            board.checkCheckmate().should.eql(false)
        });
    });
});
