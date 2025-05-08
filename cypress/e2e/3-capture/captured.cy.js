const { game } = require('../../support/e2e.js');

describe('Capture pieces on the chessboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/web/');
  });

  it('should add 1 point for pawn captured', function () {
    // Move a white pawn to initiate the position
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(3)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(3)').click();

    // Move a black pawn to position
    cy.get('#chessboard .rank:nth-child(2) div:nth-child(4)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(4)').click();

    // Capture the black pawn
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(3)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(4)').click();

    // Check if points are updated
    cy.get('[id="Color.WHITE"]').should('have.text', '1');
  });

  it('should add 3 points for Knight captured', function () {
    cy.get('#chessboard .rank:nth-child(8) div:nth-child(2)').click();
    cy.get('#chessboard .rank:nth-child(6) div:nth-child(3)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(1)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(1)').click();

    cy.get('#chessboard .rank:nth-child(6) div:nth-child(3)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(2)').click();

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(1)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(2)').click();

    cy.get('[id="Color.BLACK"]').should('have.text', '3');
  });


  it('should add 3 points for Bishop captured', function () {
    // Move a white pawn to initiate the position
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(2)').click();
    cy.get('#chessboard .rank:nth-child(6) div:nth-child(2)').click();

    // Move a black pawn to position
    cy.get('#chessboard .rank:nth-child(2) div:nth-child(2)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(2)').click();

    // Move the black bishop to a6
    cy.get('#chessboard .rank:nth-child(8) div:nth-child(3)').click();
    cy.get('#chessboard .rank:nth-child(6) div:nth-child(1)').click();

    cy.get('#chessboard .rank:nth-child(4) div:nth-child(2)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(2)').click();

    cy.get('#chessboard .rank:nth-child(7) div:nth-child(3)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(3)').click();

    // Capture the black bishop
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(2)').click();
    cy.get('#chessboard .rank:nth-child(6) div:nth-child(1)').click();

    // Check if points are updated
    cy.get('[id="Color.BLACK"]').should('have.text', '3');
  });


  it('should add 5 points for Rook captured', function () {
    // Move a white pawn to initiate the position
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(1)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(1)').click();

    // Move a black pawn to position
    cy.get('#chessboard .rank:nth-child(2) div:nth-child(2)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(2)').click();

    // Move the white rook to initiate capture
    cy.get('#chessboard .rank:nth-child(8) div:nth-child(1)').click();
    cy.get('#chessboard .rank:nth-child(6) div:nth-child(1)').click();

    // Move the black pawn
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(2)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(2)').click();

    // Move the white rook 1 devant
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(1)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(1)').click();

    // Move the black pawn to capture the rook
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(2)').click();
    cy.get('#chessboard .rank:nth-child(6) div:nth-child(1)').click();

    // Check if points are updated
    cy.get('[id="Color.BLACK"]').should('have.text', '5');
});


  it('should add 9 points for Queen captured', function () {
      cy.get('#chessboard .rank:nth-child(7) div:nth-child(4)').click();
      cy.get('#chessboard .rank:nth-child(5) div:nth-child(4)').click();

      cy.get('#chessboard .rank:nth-child(2) div:nth-child(5)').click();
      cy.get('#chessboard .rank:nth-child(4) div:nth-child(5)').click();

      cy.get('#chessboard .rank:nth-child(8) div:nth-child(4)').click();
      cy.get('#chessboard .rank:nth-child(6) div:nth-child(4)').click();

      cy.get('#chessboard .rank:nth-child(4) div:nth-child(5)').click();
      cy.get('#chessboard .rank:nth-child(5) div:nth-child(5)').click();

      cy.get('#chessboard .rank:nth-child(5) div:nth-child(4)').click();
      cy.get('#chessboard .rank:nth-child(4) div:nth-child(4)').click();

      cy.get('#chessboard .rank:nth-child(5) div:nth-child(5)').click();
      cy.get('#chessboard .rank:nth-child(6) div:nth-child(4)').click();

      cy.get('[id="Color.BLACK"]').should('have.text', '9');
  });

});
