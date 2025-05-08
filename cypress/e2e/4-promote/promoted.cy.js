const { game } = require('../../support/e2e.js');

describe('Capture pieces on the chessboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/web/');
  });
  it('Should appear the div to choose the piece to promote', function () {
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(6)').click();

    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7)').click();

    // Check if the div with this ID is in the html : choose_promotion
    cy.get('#choose_promotion').should('exist').and('be.visible');
  });

  it('Should not apear', function () {
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();

    // Check if the div with this ID is in the html : choose_promotion
    cy.get('#choose_promotion').should('exist').and('not.be.visible');
  });

  it('Should be a bishop that appears instead of the coin that can be promoted', function () {
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(6)').click();

    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7)').click();

    // cliquer sur tour
    cy.get('#promotionBishop').click();
    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7) img').should('have.attr', 'src', 'assets/img/icons/bishop_white.png');

    cy.get('#chessboard .rank:nth-child(4) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(2) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(8) img').should('have.attr', 'src', 'assets/img/icons/bishop_white.png');
  });

  it('It should be a queen that appears instead of the coin that can be promoted', function () {
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(6)').click();

    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7)').click();

    // cliquer sur tour
    cy.get('#promotionQueen').click();
    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7) img').should('have.attr', 'src', 'assets/img/icons/queen_white.png');

    cy.get('#chessboard .rank:nth-child(4) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(2) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(8) img').should('have.attr', 'src', 'assets/img/icons/queen_white.png');
  });

  it('It should be a rook that appears instead of the coin that can be promoted.', function () {
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(6)').click();

    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7)').click();

    // cliquer sur tour
    cy.get('#promotionRook').click();
    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7) img').should('have.attr', 'src', 'assets/img/icons/rook_white.png');

    cy.get('#chessboard .rank:nth-child(4) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7) img').should('have.attr', 'src', 'assets/img/icons/rook_white.png');
  });

  it('It should be a knight that appears instead of the coin that can be promoted.', function () {
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(6)').click();

    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7)').click();

    cy.get('#promotionKnight').click();
    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7) img').should('have.attr', 'src', 'assets/img/icons/knight_white.png');

    cy.get('#chessboard .rank:nth-child(4) div:nth-child(8)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(1) div:nth-child(7)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(8) img').should('have.attr', 'src', 'assets/img/icons/knight_white.png');
  });
});
