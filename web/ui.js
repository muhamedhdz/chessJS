(function () {
  const Chessboard = chess.Chessboard;
  const CaptureNotification = chess.notifications.CaptureNotification;
  const MoveNotification = chess.notifications.MoveNotification;

  /**
   * Dom element containing the messages to display to the history.
   * @type {HTMLDivElement}
   */
  const historyContainer = document
    .getElementById('history')
    .querySelector('div');

  /**
   * Dom element containing the players color images.
   * @type {HTMLDivElement}
   */
  const currentPlayerContainer = document
    .getElementById('turn')
    .querySelector('figure');

  /**
   * Chessboard instance.
   * @type {Chessboard}
   */
  const chessboard = new Chessboard();

  /**
   * Dom element representing the chessboard
   * @type {HTMLDivElement}
   */
  const dom = document.getElementById('chessboard');

  /**
   * Rows of the Chessboard.
   * A row represent a rank in a reversed order.
   * @type {Array.<HTMLDivElement>}
   */
  const rankElements = [...dom.querySelectorAll('.rank')];
  const promotionElements = document.querySelector('#choose_promotion');

  /**
   * Player scores.
   */
  const scoreWhite = document.querySelector('#white-score span.score');
  const scoreBlack = document.querySelector('#black-score span.score');

  /**
   * Div update captured pieces
   */
  const capturedPiecesWhite = document.querySelector('#white-score div.pieces');
  const capturedPiecesBlack = document.querySelector('#black-score div.pieces');

  /**
   * An object containing the icons of the pieces.
   * @type {Object.<number, HTMLImageElement>}
   */
  const icons = {};

  /**
   * The currently selected piece if any.
   * @type {Piece}
   */
  let current = null;

  let pawnToPromote = null;

  /**
   * From a file number, get the corresponding letter.
   * Rank are 1-indexed.
   * Letters are 97-indexed to get lower-alpha characters.
   * @param {string} file - the file in its number representation.
   * @return {string} returns the file in its string representation.
   */
  const convertFileToString = function (file) {
    return String.fromCharCode(97 - 1 + file);
  };

  /**
   * Clear the history panel.
   */
  const clearHistory = function () {
    historyContainer.innerHTML = '';
  };

  /**
   * Add a message to the history panel.
   * @param {string} msg - the message to add.
   */
  const addToHistory = function (msg) {
    historyContainer.innerHTML += `<p>${msg}</p>`;
  };

  /**
   * Clear the chessboard.
   * This function only clear the DOM element.
   * It does not affect the data model.
   */
  const clearChessboard = function () {
    let icons = dom.querySelectorAll('img');
    for (let i = 0; i < icons.length; i++) {
      const icon = icons[i];
      icon.remove();
    }
    icons = {};
  };

  /**
   * Update the icon of a piece on the chessboard.
   * If the piece has been captured, remove the icon.
   * Otherwise, update its position.
   * @param {Piece} piece - the piece graphically represented by the icon.
   */
  const updateIcon = function (piece) {
    const row = 8 - piece.rank,
      col = piece.file - 1;

    if (piece.isCaptured) {
      icons[piece.id].remove();
      return;
    }

    const rankElement = dom.querySelectorAll('.rank')[row],
      fileElement = rankElement.children[col];

    fileElement.append(icons[piece.id]);
    icons[piece.id].setAttribute('draggable', false);
  };

  /**
   * Observe any state update of a piece.
   * This function is called whenever a notification has been yield.
   * Depending on the notification kind, add a specific message
   * to the history panel.
   * @param {Piece} piece - the piece that yields the notification.
   * @param {Notification} notification - the yield notification.
   */
  const observe = function (piece, notification) {
    updateIcon(piece);
    const color = piece.color,
      name = piece.constructor.name;

    if (notification instanceof MoveNotification) {
      const { oldPosition, newPosition } = notification;

      oldPosition.file = convertFileToString(oldPosition.file);
      newPosition.file = convertFileToString(newPosition.file);

      addToHistory(`
      ${color} ${name} moved from
      ${oldPosition.file}${oldPosition.rank} to
      ${newPosition.file}${newPosition.rank}`);
    } else if (notification instanceof CaptureNotification) {
      const { pos } = notification;

      pos.file = convertFileToString(pos.file);
      addToHistory(`
      ${color} ${name} at ${pos.file}${pos.rank}
    has been captured`);
    }
  };

  /**
   * Init the chessboard and prepare the different pieces.
   */
  const init = function () {
    chessboard.init();
    chessboard.pieces.forEach((p) => {
      const img = new Image();
      img.src = `assets/img/icons/${p.constructor.name.toLowerCase()}_${
        p.color
      }.png`;
      icons[p.id] = img;
      updateIcon(p);
      p.subscribe({
        notify: observe
      });
    });
  };

  /**
   * Init the chessboard and prepare the different pieces.
   */
  const initPiece = function (rank, file) {
    const p = chessboard.getPiece(rank, file);

    const img = new Image();
    img.src = `assets/img/icons/${p.constructor.name.toLowerCase()}_${
      p.color
    }.png`;
    icons[p.id] = img;
    updateIcon(p);
    p.subscribe({
      notify: observe
    });
  };

  /**
   * A reset function that successively clear the history panel,
   * clear the chessboard, and prepare a new game.
   */
  const reset = function (e) {
    e.preventDefault();
    clearHistory();
    clearChessboard();
    resetPath();
    clearScore();
    init();
  };

  /**
   * Update the current player icon
   */
  const updateCurrentPlayerIcon = () => {
    currentPlayerContainer.children[0].src = `assets/img/rook_${chessboard.getCurrentPlayer()}.png`;
  }

  /**
   * Update player scores.
   */
  const updateScore = (oldPiece) => {
    scoreWhite.innerHTML = chessboard.getScore('white');
    scoreBlack.innerHTML = chessboard.getScore('black');

    if (oldPiece.src.includes('white')) {
      capturedPiecesBlack.appendChild(oldPiece);
    } else {
      capturedPiecesWhite.appendChild(oldPiece);
    }
  }

  /**
   * Clear score and pieces captured.
   * This function only affects the DOM elements. It does not affect the data model.
   */
  const clearScore = () => {
    scoreWhite.innerHTML = 0;
    scoreBlack.innerHTML = 0;
    capturedPiecesWhite.replaceChildren();
    capturedPiecesBlack.replaceChildren();
    currentPlayerContainer.children[0].src = 'assets/img/rook_white.png';
  }

  /**
   * Callback function when a cell on the chessboard has been clicked.
   * Depending on whether a piece has already been grabbed,
   * grab a piece, release a piece, or move/capture.
   * @param {MouseEvent} e - the mouse event.
   */
  const handleClick = function (e) {
    e.preventDefault();

    // Raz du pion à promouvoir
    pawnToPromote = null;

    // Retrieve the cell and its container.
    // The cell's container is the row representing the rank.
    const cell = e.currentTarget,
      container = cell.parentNode;

    // Retrieve the col and row numbers of the cell
    const col = [...container.children].indexOf(cell),
      row = [...container.parentNode.children].indexOf(container);

    // Convert the col and row into the rank and file.
    // Row and col are 0-indexed
    // Rank and files are 1-indexed. Rank is in reversed order.
    const rank = 8 - row,
      file = col + 1;

    // Retrieve a piece to a specific rank and file (if any).
    const piece = chessboard.getPiece(rank, file);

    // Grab a piece
    if (!current && piece) {
      current = piece;
      cell.classList.add('active');
    } else if (current && piece && current === piece) { // Release without moving
      cell.classList.remove('active');
      current = null;
    } else if (current) { // Move and possibly capture an opponent piece
      if (current.canMove(rank, file)) {
        // Before moving, remove the active state of the cell
        // where the piece currently lies in.
        const oldRow = 8 - current.rank,
          oldCol = current.file - 1;

        rankElements[oldRow].children[oldCol].classList.remove('active');

        const oldPieceDiv = document.querySelector(`#chessboard .rank:nth-child(${9 - rank}) div:nth-child(${file})`);

        let oldImage = null;
        if (oldPieceDiv.children.length > 0) {
          oldImage = oldPieceDiv.children[0];
        }

        // Move the piece
        current.move(rank, file);

        // Display the promotions choices
        if (current.canBePromoted()) {
          const div = document.getElementById('choose_promotion');
          div.classList.add('visible')
          pawnToPromote = current;
          const queen = document.getElementById('promotionQueen');
          queen.src = 'assets/img/queen_' + current.color.toString() + '.png';
          const rook = document.getElementById('promotionRook');
          rook.src = 'assets/img/rook_' + current.color.toString() + '.png';
          const bishop = document.getElementById('promotionBishop');
          bishop.src = 'assets/img/bishop_' + current.color.toString() + '.png';
          const knight = document.getElementById('promotionKnight');
          knight.src = 'assets/img/knight_' + current.color.toString() + '.png';
        }

        if (oldImage) {
          updateScore(oldImage);
        }

        // Update the current player image
        updateCurrentPlayerIcon()

        // Release (un-grab) the piece.
        current = null;
      }
    }
  };
  /**
   * Promotes the pawn
   * @param event
   */
  const promote = function (event) {
    const div = document.getElementById('choose_promotion');
    div.classList.remove('visible')
    const promotion = event.currentTarget.children[0].id;
    const rankPawnToPromote = pawnToPromote.rank;
    const filePawnToPromote = pawnToPromote.file;
    pawnToPromote.transform(promotion);
    initPiece(rankPawnToPromote, filePawnToPromote);
  }

  // Bind an event to the reset button
  document.getElementById('reset-btn').addEventListener('click', reset);

  // Iterate over the chessboard and bind an even to each cell.
  rankElements.forEach((rank) => {
    [...rank.children].forEach((cell) => {
      cell.addEventListener('click', handleClick);
    });
  });

  for (let i = 0; i < promotionElements.childElementCount; i++) {
    promotionElements.children[i].addEventListener('click', promote)
  }
  /**
   * Allows you to reset the image paths before promoting the pawn
   */
  const resetPath = function () {
    const queen = document.getElementById('promotionQueen');
    queen.src = '';
    const rook = document.getElementById('promotionRook');
    rook.src = '';
    const bishop = document.getElementById('promotionBishop');
    bishop.src = '';
    const knight = document.getElementById('promotionKnight');
    knight.src = '';
  }
  init();
})();
