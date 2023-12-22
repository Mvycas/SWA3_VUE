export function create(generator, width, height, score, placeholder) {
    const tiles = createEmptyBoard(width, height, placeholder);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let tile;
            do {
                tile = generator.next();
            } while (isMatch(tiles, x, y, tile));
            tiles[y][x] = tile;
        }
    }

    return { w: width, h: height, tiles, score };
}

function isMatch(board, x, y, tile) {
    // Check horizontally
    if (x >= 2 && tile === board[y][x - 1] && tile === board[y][x - 2]) {
        return true;
    }

    // Check vertically
    if (y >= 2 && tile === board[y - 1][x] && tile === board[y - 2][x]) {
        return true;
    }

    return false;
}

function createEmptyBoard(width, height, placeholder) {
    return Array.from({ length: height }, () => Array.from({ length: width }, () => placeholder));
}

export function piece(board, p) {
    return (p.row >= 0 && p.row < board.h && p.col >= 0 && p.col < board.w) ? board.tiles[p.row][p.col] : undefined;
}

export function canMove(board, first, second) {

    if (!isWithinBounds(board, first) || !isWithinBounds(board, second)) {
        return false;
    }

    const isHorizontalNeighbor = first.row === second.row && Math.abs(first.col - second.col) === 1;
    const isVerticalNeighbor = first.col === second.col && Math.abs(first.row - second.row) === 1;

    return isHorizontalNeighbor || isVerticalNeighbor;
}

export function canMove(generator, board, first, second) {
    
    let newBoard = swapTiles(board.tiles, first, second);
    
    let gameScore = board.score;
        
    let matches = findMatches(newBoard);
    console.log("s",matches);
    // If no matches found, "swap back" the tiles
    if (matches.length === 0) {
        newBoard = swapTiles(newBoard, first, second);
    } else {
        while (matches.length > 0) {

            gameScore+=100;

            newBoard = clearMatches(newBoard, matches);
            
            newBoard = refill(newBoard, generator);
            
            matches = findMatches(newBoard);
        }
    }
    
    return {
        board: {
            w: board.w,
            h: board.h,
            tiles: newBoard,
            score: gameScore
        }
    };
}

const swapTiles = (board, first, second) => {
    const cloneBoard = [...board.map(row => [...row])];  // Deep copy
    const temp = cloneBoard[first.row][first.col];
    cloneBoard[first.row][first.col] = cloneBoard[second.row][second.col];
    cloneBoard[second.row][second.col] = temp;
    return cloneBoard;
}

const clearMatches = (board, matches) => {
    const cloneBoard = [...board.map(row => [...row])];  // Deep copy
    for (const match of matches) {
        for (const position of match.positions) {
            // cloneBoard[position.row][position.col] = null as any;  // Assuming a match will nullify the cell
            cloneBoard[position.row][position.col] = null;
        }
    }
    return cloneBoard;
}


const findMatches = (board) => {
    const matches = [];
    const height = board.length;
    const width = board[0].length;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const position = { row, col };
            const tile = board[row][col];

            // Check for horizontal matches
            const horizontalMatch = checkForMatch(board, position, 'horizontal');
            if (horizontalMatch.length >= 3) {
                matches.push({ matched: tile, positions: horizontalMatch });
            }

            // Check for vertical matches
            const verticalMatch = checkForMatch(board, position, 'vertical');
            if (verticalMatch.length >= 3) {
                matches.push({ matched: tile, positions: verticalMatch });
            }
        }
    }
    
    return matches;
}


// checkForMatch - helper for findMatches search horizontally or vertically for matching tiles
const checkForMatch = (board, start, direction) => {
    const positions = [start];
    const tile = board[start.row][start.col];
    let nextPosition;

    if (direction === 'horizontal') {
        nextPosition = { row: start.row, col: start.col + 1 };
        while (board[nextPosition.row]?.[nextPosition.col] === tile) {
            positions.push(nextPosition);
            nextPosition = { row: nextPosition.row, col: nextPosition.col + 1 };
        }
    } else { // vertical
        nextPosition = { row: start.row + 1, col: start.col };
        while (board[nextPosition.row]?.[nextPosition.col] === tile) {
            positions.push(nextPosition);
            nextPosition = { row: nextPosition.row + 1, col: nextPosition.col };
        }
    }
    return positions;
}

// refill - replace null values in the board with new tiles from the generator
const refill = (board, generator) => {
    const height = board.length;
    const width = board[0].length;
    const cloneBoard = [...board.map(row => [...row])];  // cloning the board // Still confusing but

    // shift down the tiles
    for (let col = 0; col < width; col++) {
        let emptySlots = 0;
        for (let row = height - 1; row >= 0; row--) {
            if (cloneBoard[row][col] === null) {
                emptySlots++;
            } else if (emptySlots > 0) {
                cloneBoard[row + emptySlots][col] = cloneBoard[row][col];
                // cloneBoard[row][col] = null as any;
                cloneBoard[row][col] = null;
            }
        }
    }

    for (let col = 0; col < width; col++) {
        for (let row = 0; row < height && cloneBoard[row][col] === null; row++) {
            cloneBoard[row][col] = generator.next();
        }
    }

    return cloneBoard;
}

function isWithinBounds(board, position) {
    return position.row >= 0 && position.row < board.h && position.col >= 0 && position.col < board.w;
}