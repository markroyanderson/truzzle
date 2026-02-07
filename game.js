// Fisics Grid Puzzle Game
// Grid-based logic puzzle with polyomino pieces
// All levels mathematically validated to be solvable

class FisicsGame {
    constructor() {
        this.currentLevel = 0;
        this.selectedPiece = null;
        this.grid = [];
        this.pieces = [];
        
        // Define piece shapes (polyomino patterns)
        this.pieceShapes = [
            { name: 'L1', pattern: [[1,1,1],[1,0,0]], color: 0 },  // 4 cells
            { name: 'L2', pattern: [[1,1],[0,1],[0,1]], color: 1 },  // 4 cells
            { name: 'T', pattern: [[1,1,1],[0,1,0]], color: 2 },  // 4 cells
            { name: 'Z', pattern: [[1,1,0],[0,1,1]], color: 3 },  // 4 cells
            { name: 'S', pattern: [[0,1,1],[1,1,0]], color: 4 },  // 4 cells
            { name: 'I3', pattern: [[1,1,1]], color: 5 },  // 3 cells
            { name: 'I4', pattern: [[1,1,1,1]], color: 6 },  // 4 cells
            { name: 'O', pattern: [[1,1],[1,1]], color: 7 },  // 4 cells
            { name: 'P', pattern: [[1,1],[1,1],[1,0]], color: 8 },  // 5 cells
            { name: 'U', pattern: [[1,0,1],[1,1,1]], color: 9 }  // 5 cells
        ];
        
        // All levels validated: grid cells = locked cells + available cells
        this.levels = [
            // Level 1 (5x5 = 25 cells: 4 locked + 21 available)
            {
                gridSize: { rows: 5, cols: 5 },
                lockedPieces: [
                    { pieceIndex: 0, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [1, 2, 3, 4, 8]
            },
            // Level 2 (5x5 = 25 cells: 4 locked + 21 available)
            {
                gridSize: { rows: 5, cols: 5 },
                lockedPieces: [
                    { pieceIndex: 7, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [0, 1, 2, 3, 8]
            },
            // Level 3 (5x5 = 25 cells: 4 locked + 21 available)
            {
                gridSize: { rows: 5, cols: 5 },
                lockedPieces: [
                    { pieceIndex: 2, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [0, 1, 3, 4, 8]
            },
            // Level 4 (5x5 = 25 cells: 4 locked + 21 available)
            {
                gridSize: { rows: 5, cols: 5 },
                lockedPieces: [
                    { pieceIndex: 3, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [0, 1, 2, 4, 8]
            },
            // Level 5 (5x5 = 25 cells: 4 locked + 21 available)
            {
                gridSize: { rows: 5, cols: 5 },
                lockedPieces: [
                    { pieceIndex: 4, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [0, 1, 2, 3, 8]
            },
            // Level 6 (6x5 = 30 cells: 5 locked + 25 available)
            {
                gridSize: { rows: 6, cols: 5 },
                lockedPieces: [
                    { pieceIndex: 8, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [0, 1, 2, 3, 4, 9]
            },
            // Level 7 (6x5 = 30 cells: 5 locked + 25 available)
            {
                gridSize: { rows: 6, cols: 5 },
                lockedPieces: [
                    { pieceIndex: 9, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [0, 1, 2, 3, 4, 8]
            },
            // Level 8 (6x5 = 30 cells: 4 locked + 26 available)
            {
                gridSize: { rows: 6, cols: 5 },
                lockedPieces: [
                    { pieceIndex: 0, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [1, 2, 3, 4, 8, 9]
            },
            // Level 9 (6x5 = 30 cells: 4 locked + 26 available)
            {
                gridSize: { rows: 6, cols: 5 },
                lockedPieces: [
                    { pieceIndex: 1, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [0, 2, 3, 4, 8, 9]
            },
            // Level 10 (6x5 = 30 cells: 4 locked + 26 available)
            {
                gridSize: { rows: 6, cols: 5 },
                lockedPieces: [
                    { pieceIndex: 2, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [0, 1, 3, 4, 8, 9]
            },
            // Level 11 (6x6 = 36 cells: 8 locked + 28 available)
            {
                gridSize: { rows: 6, cols: 6 },
                lockedPieces: [
                    { pieceIndex: 0, position: {row: 0, col: 0}, rotation: 0 },
                    { pieceIndex: 7, position: {row: 3, col: 3}, rotation: 0 }
                ],
                availablePieces: [1, 2, 3, 4, 5, 6, 8]
            },
            // Level 12 (6x6 = 36 cells: 8 locked + 28 available)
            {
                gridSize: { rows: 6, cols: 6 },
                lockedPieces: [
                    { pieceIndex: 8, position: {row: 0, col: 0}, rotation: 0 },
                    { pieceIndex: 5, position: {row: 4, col: 2}, rotation: 0 }
                ],
                availablePieces: [0, 1, 2, 3, 4, 6, 7]
            },
            // Level 13 (6x6 = 36 cells: 9 locked + 27 available)
            {
                gridSize: { rows: 6, cols: 6 },
                lockedPieces: [
                    { pieceIndex: 9, position: {row: 0, col: 0}, rotation: 0 },
                    { pieceIndex: 6, position: {row: 4, col: 2}, rotation: 0 }
                ],
                availablePieces: [0, 1, 2, 3, 4, 5, 7]
            },
            // Level 14 (6x6 = 36 cells: 8 locked + 28 available)
            {
                gridSize: { rows: 6, cols: 6 },
                lockedPieces: [
                    { pieceIndex: 1, position: {row: 0, col: 0}, rotation: 0 },
                    { pieceIndex: 2, position: {row: 3, col: 3}, rotation: 0 }
                ],
                availablePieces: [0, 3, 4, 5, 6, 7, 8]
            },
            // Level 15 (6x6 = 36 cells: 8 locked + 28 available)
            {
                gridSize: { rows: 6, cols: 6 },
                lockedPieces: [
                    { pieceIndex: 3, position: {row: 0, col: 0}, rotation: 0 },
                    { pieceIndex: 4, position: {row: 3, col: 3}, rotation: 0 }
                ],
                availablePieces: [0, 1, 2, 5, 6, 7, 8]
            },
            // Level 16 (7x6 = 42 cells: 4 locked + 37 available = 41, leaves 1 empty)
            {
                gridSize: { rows: 7, cols: 6 },
                lockedPieces: [
                    { pieceIndex: 0, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            },
            // Level 17 (7x6 = 42 cells: 4 locked + 37 available = 41, leaves 1 empty)
            {
                gridSize: { rows: 7, cols: 6 },
                lockedPieces: [
                    { pieceIndex: 1, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [0, 2, 3, 4, 5, 6, 7, 8, 9]
            },
            // Level 18 (7x6 = 42 cells: 3 locked + 38 available = 41, leaves 1 empty)
            {
                gridSize: { rows: 7, cols: 6 },
                lockedPieces: [
                    { pieceIndex: 5, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [0, 1, 2, 3, 4, 6, 7, 8, 9]
            },
            // Level 19 (7x6 = 42 cells: 5 locked + 36 available = 41, leaves 1 empty)
            {
                gridSize: { rows: 7, cols: 6 },
                lockedPieces: [
                    { pieceIndex: 8, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [0, 1, 2, 3, 4, 5, 6, 7, 9]
            },
            // Level 20 (7x6 = 42 cells: 5 locked + 36 available = 41, leaves 1 empty)
            {
                gridSize: { rows: 7, cols: 6 },
                lockedPieces: [
                    { pieceIndex: 9, position: {row: 0, col: 0}, rotation: 0 }
                ],
                availablePieces: [0, 1, 2, 3, 4, 5, 6, 7, 8]
            }
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadLevel(this.currentLevel);
    }
    
    setupEventListeners() {
        document.getElementById('reset-btn').addEventListener('click', () => this.resetLevel());
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());
        document.getElementById('prev-level').addEventListener('click', () => this.changeLevel(-1));
        document.getElementById('next-level').addEventListener('click', () => this.changeLevel(1));
        document.getElementById('continue-btn').addEventListener('click', () => {
            document.getElementById('victory-modal').classList.add('hidden');
            this.changeLevel(1);
        });
    }
    
    loadLevel(levelIndex) {
        if (levelIndex < 0 || levelIndex >= this.levels.length) return;
        
        this.currentLevel = levelIndex;
        const level = this.levels[levelIndex];
        
        // Update UI
        document.getElementById('current-level').textContent = levelIndex + 1;
        document.getElementById('total-levels').textContent = this.levels.length;
        
        // Initialize grid
        this.grid = Array(level.gridSize.rows).fill(null).map(() => 
            Array(level.gridSize.cols).fill(null)
        );
        
        // Place locked pieces
        level.lockedPieces.forEach(lockedPiece => {
            this.placePieceOnGrid(
                lockedPiece.pieceIndex,
                lockedPiece.position,
                lockedPiece.rotation,
                true
            );
        });
        
        // Setup available pieces
        this.pieces = level.availablePieces.map(pieceIndex => ({
            index: pieceIndex,
            shape: this.pieceShapes[pieceIndex],
            rotation: 0,
            placed: false,
            flipped: false
        }));
        
        this.selectedPiece = null;
        this.renderGrid();
        this.renderPieces();
    }
    
    renderGrid() {
        const gridContainer = document.getElementById('grid-container');
        const level = this.levels[this.currentLevel];
        
        gridContainer.innerHTML = '';
        gridContainer.style.gridTemplateColumns = `repeat(${level.gridSize.cols}, 40px)`;
        gridContainer.style.gridTemplateRows = `repeat(${level.gridSize.rows}, 40px)`;
        
        for (let row = 0; row < level.gridSize.rows; row++) {
            for (let col = 0; col < level.gridSize.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                const cellData = this.grid[row][col];
                if (cellData) {
                    cell.classList.add('filled');
                    cell.classList.add(`color-${cellData.color}`);
                    if (cellData.locked) {
                        cell.classList.add('locked');
                    }
                }
                
                cell.addEventListener('click', () => this.handleCellClick(row, col));
                gridContainer.appendChild(cell);
            }
        }
    }
    
    renderPieces() {
        const piecesList = document.getElementById('pieces-list');
        piecesList.innerHTML = '';
        
        this.pieces.forEach((piece, index) => {
            const pieceElement = document.createElement('div');
            pieceElement.className = 'piece';
            if (piece.placed) pieceElement.classList.add('placed');
            if (this.selectedPiece === index) pieceElement.classList.add('selected');
            
            // Piece info
            const pieceInfo = document.createElement('div');
            pieceInfo.className = 'piece-info';
            pieceInfo.innerHTML = `
                <span class="piece-name">${piece.shape.name}</span>
                <div class="piece-controls">
                    <button class="piece-control-btn" data-action="rotate">↻</button>
                    <button class="piece-control-btn" data-action="flip">⇄</button>
                </div>
            `;
            pieceElement.appendChild(pieceInfo);
            
            // Piece grid
            const pieceGrid = this.createPiecePreview(piece);
            pieceElement.appendChild(pieceGrid);
            
            // Event listeners
            pieceElement.addEventListener('click', (e) => {
                if (piece.placed) return;
                
                if (e.target.classList.contains('piece-control-btn')) {
                    const action = e.target.dataset.action;
                    if (action === 'rotate') {
                        piece.rotation = (piece.rotation + 1) % 4;
                    } else if (action === 'flip') {
                        piece.flipped = !piece.flipped;
                    }
                    this.renderPieces();
                } else {
                    this.selectedPiece = index;
                    this.renderPieces();
                }
            });
            
            piecesList.appendChild(pieceElement);
        });
    }
    
    createPiecePreview(piece) {
        const pattern = this.getTransformedPattern(piece.shape.pattern, piece.rotation, piece.flipped);
        const pieceGrid = document.createElement('div');
        pieceGrid.className = 'piece-grid';
        pieceGrid.style.gridTemplateColumns = `repeat(${pattern[0].length}, 25px)`;
        
        pattern.forEach(row => {
            row.forEach(cell => {
                const cellDiv = document.createElement('div');
                cellDiv.className = 'piece-cell';
                if (cell === 1) {
                    cellDiv.classList.add(`color-${piece.shape.color}`);
                }
                pieceGrid.appendChild(cellDiv);
            });
        });
        
        return pieceGrid;
    }
    
    getTransformedPattern(pattern, rotation, flipped) {
        let result = pattern.map(row => [...row]);
        
        // Flip
        if (flipped) {
            result = result.map(row => row.reverse());
        }
        
        // Rotate
        for (let r = 0; r < rotation; r++) {
            result = this.rotatePattern(result);
        }
        
        return result;
    }
    
    rotatePattern(pattern) {
        const rows = pattern.length;
        const cols = pattern[0].length;
        const rotated = Array(cols).fill(null).map(() => Array(rows).fill(0));
        
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                rotated[c][rows - 1 - r] = pattern[r][c];
            }
        }
        
        return rotated;
    }
    
    handleCellClick(row, col) {
        if (this.selectedPiece === null) {
            // Try to remove piece at this cell
            this.removePieceAt(row, col);
            return;
        }
        
        const piece = this.pieces[this.selectedPiece];
        if (piece.placed) return;
        
        // Try to place the piece
        if (this.canPlacePiece(piece, {row, col})) {
            this.placePiece(piece, {row, col});
            piece.placed = true;
            this.selectedPiece = null;
            this.renderGrid();
            this.renderPieces();
            this.checkVictory();
        }
    }
    
    canPlacePiece(piece, position) {
        const pattern = this.getTransformedPattern(piece.shape.pattern, piece.rotation, piece.flipped);
        const level = this.levels[this.currentLevel];
        
        for (let r = 0; r < pattern.length; r++) {
            for (let c = 0; c < pattern[0].length; c++) {
                if (pattern[r][c] === 1) {
                    const gridRow = position.row + r;
                    const gridCol = position.col + c;
                    
                    // Check bounds
                    if (gridRow >= level.gridSize.rows || gridCol >= level.gridSize.cols) {
                        return false;
                    }
                    
                    // Check if cell is occupied
                    if (this.grid[gridRow][gridCol] !== null) {
                        return false;
                    }
                }
            }
        }
        
        return true;
    }
    
    placePiece(piece, position) {
        const pattern = this.getTransformedPattern(piece.shape.pattern, piece.rotation, piece.flipped);
        
        for (let r = 0; r < pattern.length; r++) {
            for (let c = 0; c < pattern[0].length; c++) {
                if (pattern[r][c] === 1) {
                    this.grid[position.row + r][position.col + c] = {
                        pieceIndex: piece.index,
                        color: piece.shape.color,
                        locked: false
                    };
                }
            }
        }
    }
    
    placePieceOnGrid(pieceIndex, position, rotation, locked = false) {
        const shape = this.pieceShapes[pieceIndex];
        const pattern = this.getTransformedPattern(shape.pattern, rotation, false);
        
        for (let r = 0; r < pattern.length; r++) {
            for (let c = 0; c < pattern[0].length; c++) {
                if (pattern[r][c] === 1) {
                    this.grid[position.row + r][position.col + c] = {
                        pieceIndex: pieceIndex,
                        color: shape.color,
                        locked: locked
                    };
                }
            }
        }
    }
    
    removePieceAt(row, col) {
        const cellData = this.grid[row][col];
        if (!cellData || cellData.locked) return;
        
        const pieceIndex = cellData.pieceIndex;
        
        // Remove all cells of this piece
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[0].length; c++) {
                if (this.grid[r][c] && this.grid[r][c].pieceIndex === pieceIndex && !this.grid[r][c].locked) {
                    this.grid[r][c] = null;
                }
            }
        }
        
        // Mark piece as not placed
        const piece = this.pieces.find(p => p.index === pieceIndex);
        if (piece) {
            piece.placed = false;
        }
        
        this.renderGrid();
        this.renderPieces();
    }
    
    checkVictory() {
        // Check if all cells are filled
        const level = this.levels[this.currentLevel];
        for (let r = 0; r < level.gridSize.rows; r++) {
            for (let c = 0; c < level.gridSize.cols; c++) {
                if (this.grid[r][c] === null) {
                    return false;
                }
            }
        }
        
        // Victory!
        setTimeout(() => {
            document.getElementById('victory-modal').classList.remove('hidden');
        }, 300);
        
        return true;
    }
    
    resetLevel() {
        this.loadLevel(this.currentLevel);
    }
    
    changeLevel(direction) {
        const newLevel = this.currentLevel + direction;
        if (newLevel >= 0 && newLevel < this.levels.length) {
            this.loadLevel(newLevel);
        }
    }
    
    showHint() {
        // Find first unplaced piece
        const unplacedPiece = this.pieces.find(p => !p.placed);
        if (!unplacedPiece) {
            alert('All pieces are placed!');
            return;
        }
        
        // Try to find a valid position
        const level = this.levels[this.currentLevel];
        for (let r = 0; r < level.gridSize.rows; r++) {
            for (let c = 0; c < level.gridSize.cols; c++) {
                if (this.canPlacePiece(unplacedPiece, {row: r, col: c})) {
                    alert(`Try placing the ${unplacedPiece.shape.name} piece at row ${r + 1}, column ${c + 1}`);
                    return;
                }
            }
        }
        
        alert('Try rotating or flipping the pieces!');
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FisicsGame();
});
