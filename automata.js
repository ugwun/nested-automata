// Declare gridElement in the global scope
const gridElement = document.getElementById('grid');

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');

    startButton.addEventListener('click', () => {
        const gridWidth = parseInt(document.getElementById('gridWidth').value) || 101;
        const generations = parseInt(document.getElementById('generations').value) || 50;
        const delay = parseInt(document.getElementById('delay').value) || 100;

        // Ensure gridWidth is an odd number
        if (gridWidth % 2 === 0) {
            alert('Grid width must be an odd number.');
            return;
        }

        let grid = createGrid(gridWidth, generations);

        // Clear previous automaton display
        gridElement.innerHTML = '';

        // Initialize the middle cell of the first generation
        grid[0][Math.floor(gridWidth / 2)] = 1;

        runAutomaton(grid, gridWidth, generations, delay);
    });
});


function createGrid(width, generations) {
    let grid = [];
    for (let i = 0; i < generations; i++) {
        grid[i] = new Array(width).fill(0);
    }
    return grid;
}

function runAutomaton(grid, width, generations, delay) {
    let gen = 1; // Start at the first generation
    function nextGeneration() {
        // Apply the rule to each cell, except the first and last
        for (let i = 1; i < width - 1; i++) {
            grid[gen][i] = rule30(grid[gen - 1][i - 1], grid[gen - 1][i], grid[gen - 1][i + 1]);
        }
        displayGeneration(grid[gen]);
        gen++;
        if (gen < generations) {
            setTimeout(nextGeneration, delay); // Set timeout for next generation
        }
    }
    nextGeneration(); // Start the loop
}

function rule30(left, center, right) {
    return (left ^ (center || right)) & 1; // XOR operation for Rule 30
}

function displayGeneration(generation) {
    const row = document.createElement('div');
    for (let i = 0; i < generation.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell ' + (generation[i] ? 'alive' : 'dead');
        row.appendChild(cell);
    }
    gridElement.appendChild(row);
}
