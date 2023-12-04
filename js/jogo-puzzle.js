const imageUrl = 'url("../images/jogo-puzzle/foto-puzzle.jpg")';
const pieces = 3;
const pieceSize = 100;
let emptyPiece = { row: pieces - 1, col: pieces - 1 };

function createPuzzlePiece(row, col) {
    const piece = document.createElement('div');
    piece.classList.add('puzzle-piece');
    piece.style.backgroundImage = imageUrl;
    piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
    piece.dataset.row = row;
    piece.dataset.col = col;
    piece.addEventListener('click', () => movePiece(row, col));
    return piece;
}

function shufflePuzzle() {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    puzzlePieces.forEach(piece => {
        const randomRow = Math.floor(Math.random() * pieces);
        const randomCol = Math.floor(Math.random() * pieces);
        piece.style.gridRow = randomRow + 1;
        piece.style.gridColumn = randomCol + 1;
        piece.dataset.row = randomRow;
        piece.dataset.col = randomCol;
    });
}

function movePiece(row, col) {
    if (isAdjacent(row, col, emptyPiece.row, emptyPiece.col)) {
        swapPieces(row, col, emptyPiece.row, emptyPiece.col);
        emptyPiece = { row, col };
        checkWin();
    }
}

function isAdjacent(row1, col1, row2, col2) {
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}

function swapPieces(row1, col1, row2, col2) {
    const piece1 = document.querySelector(`[data-row="${row1}"][data-col="${col1}"]`);
    const piece2 = document.querySelector(`[data-row="${row2}"][data-col="${col2}"]`);

    const tempRow = piece1.style.gridRow;
    const tempCol = piece1.style.gridColumn;

    piece1.style.gridRow = piece2.style.gridRow;
    piece1.style.gridColumn = piece2.style.gridColumn;
    piece2.style.gridRow = tempRow;
    piece2.style.gridColumn = tempCol;

    [piece1.dataset.row, piece2.dataset.row] = [piece2.dataset.row, piece1.dataset.row];
    [piece1.dataset.col, piece2.dataset.col] = [piece2.dataset.col, piece1.dataset.col];
}

function checkWin() {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    const isSolved = Array.from(puzzlePieces).every(piece => {
        const correctRow = parseInt(piece.dataset.row);
        const correctCol = parseInt(piece.dataset.col);
        return piece.style.gridRow === `${correctRow + 1}` && piece.style.gridColumn === `${correctCol + 1}`;
    });

    if (isSolved) {
        alert('Parabéns! Você venceu!');
        shufflePuzzle(); // Embaralha o quebra-cabeça novamente após resolvido
    }
}

function createPuzzle() {
    const puzzleContainer = document.getElementById('puzzle-container');

    for (let row = 0; row < pieces; row++) {
        for (let col = 0; col < pieces; col++) {
            const piece = createPuzzlePiece(row, col);
            puzzleContainer.appendChild(piece);
        }
    }

    shufflePuzzle();
}

window.onload = createPuzzle;
