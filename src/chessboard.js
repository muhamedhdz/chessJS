const Color = require('./color.js');
const Queen = require('./queen.js');
const King = require('./king.js');
const Pawn = require('./pawn.js');
const Bishop = require('./bishop.js');
const Knight = require('./knight.js');
const Rook = require('./rook.js');

/**
 * Chessboard constructor.
 * @constructor
 */
const Chessboard = function () {
  /**
   * An array containing the different pieces that have not been captured yet.
   * @type {Array.<Piece>}
   * @public
   */
  this.pieces = [];
};

/**
 * Initialize the chessboard.
 * This function will create the pieces and put them to their corresponding positions.
 * White pieces are located at the lowest ranks.
 * Black pieces are located at the uppest ranks.
 * The queen always starts on a cell corresponding to its color.
 */
Chessboard.prototype.init = function () {
  // Empty the array from previous games.
  this.pieces = [];

  // The current player is white by default.
  this.currentPlayer = Color.WHITE;

  this.players = {
    [Color.WHITE]: {
      piecesCaptured: [],
      points: 0
    },
    [Color.BLACK]: {
      piecesCaptured: [],
      points: 0
    }
  };

  const chessPackage = {
    Queen,
    King,
    Bishop,
    Rook,
    Knight,
    Pawn
  };

  // Each piece has a uniq numerical id.
  let id = 0;

  // Initialize the board.
  for (let i = 1; i <= 8; i++) {
    // Put the black pawns on the 7th rank
    const blackPawn = new Pawn({
      rank: 7,
      file: i,
      id: ++id,
      chessboard: this,
      color: Color.BLACK
    });

    this.pieces.push(blackPawn);

    // Put the white pawns on the 2nd rank
    const whitePawn = new Pawn({
      rank: 2,
      file: i,
      id: ++id,
      chessboard: this,
      color: Color.WHITE
    });

    this.pieces.push(whitePawn);
  }

  // Put the other pieces
  [
    { rank: 1, color: Color.WHITE },
    { rank: 8, color: Color.BLACK }
  ].forEach((data) => {
    const { rank, color } = data;

    [
      'Rook',
      'Knight',
      'Bishop',
      'Queen',
      'King',
      'Bishop',
      'Knight',
      'Rook'
    ].forEach((Piece, file) => {
      this.pieces.push(
        new chessPackage[Piece]({
          chessboard: this,
          rank,
          id: ++id,
          file: file + 1,
          color
        })
      );
    });
  });
};

/**
 * Retrieve a piece at a given rank and file.
 * @param {number} rank - the rank of the piece.
 * @param {number} file - the file of the piece.
 * @return {?Piece} Returns the piece (if any) or <code>null</code> if
 * no piece is located at the given rank and file.
 *
 * @example
 * // After initializing the board, returns the white rook located at (1, a)
 * let chessboard = new Chessboard();
 * chessboard.init();
 * let piece = this.getPiece(1, 1);
 */
Chessboard.prototype.getPiece = function (rank, file) {
  for (let i = 0; i < this.pieces.length; i++) {
    const p = this.pieces[i];
    if (p.rank === rank && p.file === file) {
      return p;
    }
  }
  return null;
};

/**
 * Choose which pawn to promote
 * @param rank - the rank of the piece.
 * @param file - the file of the piece.
 * @param color - the color of the pawn.
 * @param promotion - the pawn chosen to promote
 * @param id - the pawn chosen to promote
 * @returns {Rook|Knight|Bishop|Queen}
 */
Chessboard.prototype.getNewPiece = function (rank, file, color, promotion, id) {
  switch (promotion) {
    case 'promotionQueen':
      return new Queen({
        chessboard: this,
        color,
        rank,
        file,
        id
      })
    case 'promotionRook':
      return new Rook({
        chessboard: this,
        color,
        rank,
        file,
        id
      })
    case 'promotionBishop':
      return new Bishop({
        chessboard: this,
        color,
        rank,
        file,
        id
      })
    case 'promotionKnight':
      return new Knight({
        chessboard: this,
        color,
        rank,
        file,
        id
      })
  }
};

/**
 * Retrieve the color of the player to move.
 * @return {?Color} Returns the color
 *
 * @example After initializing the board, returns WHITE as whites plays first.
 * let chessboard = new Chessboard();
 * chessboard.init();
 * let color = this.getCurrentPlayer();
 */
Chessboard.prototype.getCurrentPlayer = function () {
  return this.currentPlayer;
}

/**
 * Update the score of the player.
 * @param {Color} color - the color of the player.
 * @param {Piece} piece - the piece that has been captured.
 *
 * @return {number} Returns the score of the player.
 *
 * @example
 * After initializing the board, returns the score of the player playing whites
 * let chessboard = new Chessboard();
 * chessboard.init();
 * let color = this.getCurrentPlayer();
 * let piece = this.getPiece(1, 1);
 * this.updateScore(color, piece);
 */
Chessboard.prototype.updateScore = function (color, piece) {
  this.players[color].piecesCaptured.push(piece);
  this.players[color].points += piece.points;

  return this.players[color].points;
}
/**
 * Update the current player.
 *
 * @example
 * // After initializing the board, and after the WHITE moves, should update the current player to BLACK
 * let chessboard = new Chessboard();
 * chessboard.init();
 * let pieceToMove = chessboard.getPiece(2, 1);
 * pieceToMove.move(3, 1);
 * chessboard.getCurrentPlayer() -> Should return BLACK as updateCurrentPlayer is called inside the move method
 */
Chessboard.prototype.updateCurrentPlayer = function () {
  this.currentPlayer === Color.WHITE ? this.currentPlayer = Color.BLACK : this.currentPlayer = Color.WHITE;
  // TODO: Update l'image
}

/**
 * get the score of the player.
 * @param {Color} color - the color of the player.
 *
 * @return {number} Returns the score of the player.
 *
 * @example
 * // After initializing the board, returns the score of the player playing whites
 * let chessboard = new Chessboard();
 * chessboard.init();
 * let color = this.getCurrentPlayer();
 * let score = this.getScore(color);
 */
Chessboard.prototype.getScore = function (color) {
  return this.players[color].points;
}

module.exports = Chessboard;
