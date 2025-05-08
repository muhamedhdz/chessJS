const assert = require('assert');
const Color = require('../src/color.js');
const Chessboard = require('../src/chessboard.js');
const Pawn = require('../src/pawn.js');
const Rook = require('../src/rook.js');
const Knight = require('../src/knight.js');
const Bishop = require('../src/bishop.js');
const Queen = require('../src/queen.js');
const King = require('../src/king.js');

describe('Player turn', function () {
    let chessboard;

    beforeEach(function () {
        chessboard = new Chessboard();
        chessboard.init();
    });

    it("White pawn must be able to move only once", function () {
        const whitePiece = chessboard.getPiece(2, 1);

        const oracle = whitePiece;

        whitePiece.move(3, 1);
        whitePiece.move(4, 1);

        assert.equal(oracle, chessboard.getPiece(3, 1));
    });

    it("Black pawn must not be able to move first", function () {
        const blackPiece = chessboard.getPiece(7, 2);

        const oracle = blackPiece;

        blackPiece.move(6, 2);

        assert.equal(oracle, chessboard.getPiece(7, 2));
    });

    it("Black pawn must be able to move only once after white moves", function () {
        const whitePiece = chessboard.getPiece(2, 1);
        const blackPiece = chessboard.getPiece(7, 2);

        const oracle = blackPiece;

        whitePiece.move(3, 1);
        blackPiece.move(6, 2);
        blackPiece.move(5, 2);

        assert.equal(oracle, chessboard.getPiece(6, 2));
    });

    it("White pawn must be able to move only once after black moves", function () {
        const whitePiece = chessboard.getPiece(2, 1);
        const blackPiece = chessboard.getPiece(7, 2);

        const oracle = whitePiece;

        
        whitePiece.move(3, 1);
        blackPiece.move(6, 2);
        whitePiece.move(4, 1);
        whitePiece.move(5, 1);

        assert.equal(oracle, chessboard.getPiece(4, 1));
    });


    describe('Whites must play after blacks', function () {
        // TODO
    });
});


describe('Point management', function () {
    let chessboard;

    beforeEach(function () {
        chessboard = new Chessboard();
        chessboard.init();
    });

    it('should add 1 point for Basic pawn captured', function () {
        const whitePawn = chessboard.getPiece(2, 1);
        const blackPawn = chessboard.getPiece(7, 2);

        //Faire avancer blanc de 2
        whitePawn.move(whitePawn.rank + 2, whitePawn.file);
        //Faire avancer noir de 2
        blackPawn.move(blackPawn.rank - 2, blackPawn.file);

        whitePawn.move(whitePawn.rank + 1, whitePawn.file + 1);

        const oracle = 1;

        assert.equal(chessboard.players[Color.WHITE].points, oracle);
    });

    it('should add 3 point for Knight captured', function () {
        const whiteKnight = chessboard.getPiece(1, 2);
        const blackPawn = chessboard.getPiece(7, 1);

        whiteKnight.move(3, 3);

        blackPawn.move(6, 1);

        whiteKnight.move(5, 2);

        blackPawn.move(5, 2);

        const oracle = 3;

        assert.equal(chessboard.players[Color.BLACK].points, oracle);
    });

    it('should add 3 points for Bishop pawn captured', function () {
        const whitePawn = chessboard.getPiece(2, 2); // White pawn at b2
        const blackPawn = chessboard.getPiece(7, 2); // Black pawn at b7
        const blackBishop = chessboard.getPiece(8, 3); // Black bishop at c8
      
        // White pawn moved from b2 to b4
        whitePawn.move(4, 2);
        // Black pawn moved from b7 to b6
        blackPawn.move(6, 2);
        // White pawn moved from b4 to b5
        whitePawn.move(5, 2);
        // Black bishop moved from c8 to a6
        blackBishop.move(6, 1);
        // Black bishop at a6 has been captured by White pawn
        whitePawn.move(6, 1);

        const oracle = 3;
        assert.equal(chessboard.players[Color.WHITE].points, oracle);
      });

      it('should add 5 points for Rook pawn captured', function () {
        const whitePawn = chessboard.getPiece(2, 1); // White pawn at a2
        const blackPawn = chessboard.getPiece(7, 2); // Black pawn at b7
        const whiteRook = chessboard.getPiece(1, 1); // White rook at a1
      
        // Mouvements for White pawn, Black pawn and White rook
        whitePawn.move(4, 1);
        blackPawn.move(5, 2);
        whiteRook.move(3, 1);
        blackPawn.move(4, 2);
        whitePawn.move(5, 1);
      
        // White rook at a3 has been captured by Black pawn
        blackPawn.move(3, 1);
      
        const oracle = 5;
      
        assert.equal(chessboard.players[Color.BLACK].points, oracle);
      });
      

      it('should add 9 points for Queen pawn captured', function () {
        const whitePawn = chessboard.getPiece(2, 4); // White pawn at d2
        const blackPawn = chessboard.getPiece(7, 5); // Black pawn at e7
        const whiteQueen = chessboard.getPiece(1, 4); // White queen at d1
      
        whitePawn.move(4, 4);
        blackPawn.move(5, 5);
        whiteQueen.move(3, 4);
        blackPawn.move(4, 5);
        whitePawn.move(5, 4);
      
        // White queen at d3 has been captured by Black pawn
        blackPawn.move(3, 4);
        
        const oracle = 9;
        assert.equal(chessboard.players[Color.BLACK].points, oracle);
      });
      

});