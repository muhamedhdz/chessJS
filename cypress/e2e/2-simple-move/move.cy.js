const { game } = require('../../support/e2e.js');

describe('Move a piece on the chessboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/web/');
  });

  it('move a white pawn from c7 to c6', function () {
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(3)').click();

    cy.get('#chessboard .rank:nth-child(7) div:nth-child(3)').should(
      'have.class',
      'active'
    );

    cy.get('#chessboard .rank:nth-child(6) div:nth-child(3)').click();

    cy.get('#chessboard .rank:nth-child(7) div:nth-child(3)').should(
      'not.have.class',
      'active'
    );
  });

  it('player turn change', function () {
    cy.get('#turn figure img').should('have.attr', 'src').should('include','rook_white');

    cy.get('#chessboard .rank:nth-child(7) div:nth-child(3)').click();
    cy.get('#chessboard .rank:nth-child(6) div:nth-child(3)').click();

    cy.get('#turn figure img').should('have.attr', 'src').should('include','rook_black');
  });

  it('move a balck pawn after a white pawn moves', function () {
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(3)').click();
    cy.get('#chessboard .rank:nth-child(6) div:nth-child(3)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(3)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(3)').click();
  });
});

describe('Reinitialize player scores', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/web/');
  });

  it('Set scores to zero', function () {
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(3)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(3)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(4)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(4)').click();

    cy.get('#chessboard .rank:nth-child(5) div:nth-child(3)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(4)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(5)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(5)').click();

    cy.get('#chessboard .rank:nth-child(7) div:nth-child(4)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(4)').click();

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(5)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(4)').click();

    cy.get('#white-score div.score span.score').contains(1)

    cy.get('#black-score div.score span.score').contains(1);

    cy.get('#reset-btn').click();

    cy.get('#white-score div.score span.score').contains(0);

    cy.get('#black-score div.score span.score').contains(0);
  });

  it('Reset pieces captured', function () {
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(3)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(3)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(4)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(4)').click();

    cy.get('#chessboard .rank:nth-child(5) div:nth-child(3)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(4)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(5)').click();
    cy.get('#chessboard .rank:nth-child(3) div:nth-child(5)').click();

    cy.get('#chessboard .rank:nth-child(7) div:nth-child(4)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(4)').click();

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(5)').click();
    cy.get('#chessboard .rank:nth-child(4) div:nth-child(4)').click();

    cy.get('#white-score div.pieces')
      .find('img')
      .should('have.length', 1);
      
    cy.get('#black-score div.pieces')
      .find('img')
      .should('have.length', 1);

    cy.get('#reset-btn').click();

    cy.get('#white-score div.pieces')
      .find('img')
      .should('have.length', 0);

    cy.get('#black-score div.pieces')
      .find('img')
      .should('have.length', 0);
  });

  it('Reset player turn', function () {
    cy.get('#turn figure img').should('have.attr', 'src').should('include','rook_white');

    cy.get('#chessboard .rank:nth-child(7) div:nth-child(3)').click();
    cy.get('#chessboard .rank:nth-child(5) div:nth-child(3)').click();

    cy.get('#turn figure img').should('have.attr', 'src').should('include','rook_black');

    cy.get('#reset-btn').click();

    cy.get('#turn figure img').should('have.attr', 'src').should('include','rook_white');
  });
});