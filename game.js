
const game = {
    grid: null, // Grid matrix
    input: [[3, 2], [4, 3], [2, 4], [3, 4], [4, 4]], // Input data
    // Create and display the initial grid
    init: function () {
        this.grid = this.createGridValues(this.input) // Create grid matrix
        this.createHtmlGrid(this.grid) // Display grid matrix
    },
    // Update and display the new grid matrix after applying the rules every 1s
    startGame: function () {
        setInterval(() => {
            this.grid = this.changeGridByRules(this.grid) // Update grid matrix
            this.createHtmlGrid(this.grid) // Display grid matrix
        }, 1000)
    },
    // Create square matrix with all values = 0
    createZeroMatrix: function (rows) {
        let array = [], row = [], cols = rows // Square grid => cols = rows
        while (cols--) row.push(0)
        while (rows--) array.push(row.slice())
        return array
    },
    // Display grid matrix
    createHtmlGrid: function (grid) {
        // Remove old game grid html if exists
        let prevGame = document.getElementsByClassName('game')[0]
        if (prevGame) {
            prevGame.remove()
        }
        // Create new html for displaying the grid
        let body = document.getElementById('body')
        let game = document.createElement('div')
        game.className = 'game';
        body.appendChild(game)
        grid.forEach(row => {
            let domRow = document.createElement('div');
            domRow.className = 'row';
            row.forEach(element => {
                let domElement = document.createElement('div')
                domElement.className = element ? 'life' : 'death'
                domRow.appendChild(domElement)
            })
            game.appendChild(domRow)
        })
    },
    // Create grid matrix
    createGridValues: function (input) {
        // Max grid dimesion
        const gridDimension = input.map(coord => coord[0] > coord[1] ? coord[0] : coord[1]).reduce((a, b) => Math.max(a, b)) + 10
        const grid = this.createZeroMatrix(gridDimension)
        input.forEach(element => {
            grid[element[0] - 1][element[1] - 1] = 1
        })
        return grid
    },
    // Update grid matrix
    changeGridByRules: function (grid) {
        return grid.map((row, rowIndex) => {
            return row.map((element, colIndex) => {
                const numberOfNeighbours = this.countAliveNeighbours(rowIndex, colIndex, grid)
                // Rules for alive element
                if (element && (numberOfNeighbours === 2 || numberOfNeighbours === 3) || !element && numberOfNeighbours === 3) {
                    return 1
                }
                return 0
            })
        })
    },
    // Return number of alive neightbours
    countAliveNeighbours: function (rowIndex, colIndex, grid) {
        const element = grid[rowIndex][colIndex]
        return [
            grid[rowIndex - 1] === undefined ? undefined : grid[rowIndex - 1][colIndex - 1],
            grid[rowIndex - 1] === undefined ? undefined : grid[rowIndex - 1][colIndex],
            grid[rowIndex - 1] === undefined ? undefined : grid[rowIndex - 1][colIndex + 1],
            grid[rowIndex] === undefined ? undefined : grid[rowIndex][colIndex - 1],
            grid[rowIndex] === undefined ? undefined : grid[rowIndex][colIndex + 1],
            grid[rowIndex + 1] === undefined ? undefined : grid[rowIndex + 1][colIndex - 1],
            grid[rowIndex + 1] === undefined ? undefined : grid[rowIndex + 1][colIndex],
            grid[rowIndex + 1] === undefined ? undefined : grid[rowIndex + 1][colIndex + 1]
        ].filter(neighbour => neighbour === 1).length
    }
}
// Initialize the game
game.init()
