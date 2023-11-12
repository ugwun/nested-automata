// rule 30 cellular automaton
const rule30 = {
    '000': 0,
    '001': 1,
    '010': 1,
    '011': 1,
    '100': 1,
    '101': 0,
    '110': 0,
    '111': 0
};

const ruleHigher4 = {
    '0000': 0,
    '0001': 1,
    '0010': 1,
    '0011': 1,
    '0100': 1,
    '0101': 0,
    '0110': 0,
    '0111': 0,
    '1000': 0,
    '1001': 1,
    '1010': 0,
    '1011': 1,
    '1100': 1,
    '1101': 0,
    '1110': 0,
    '1111': 0
};

// Declare gridElement in the global scope
const gridRule30Element = document.getElementById('gridRule30');
const gridHigherRuleset4Element = document.getElementById('gridHigherRuleset4');

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

        let gridRule30 = createGrid(gridWidth, generations);
        let gridHigher4 = createGrid(gridWidth, generations);

        // Clear previous automaton display
        gridRule30Element.innerHTML = '';
        gridHigherRuleset4Element.innerHTML = '';

        // Initialize the middle cell of the first generation for both grids
        gridRule30[0][Math.floor(gridWidth / 2)] = 1;
        gridHigher4[0][Math.floor(gridWidth / 2)] = 1;

        runAutomaton(gridRule30, gridWidth, generations, delay, rule30, gridRule30Element);
        runAutomaton(gridHigher4, gridWidth, generations, delay, ruleHigher4, gridHigherRuleset4Element);
    });
});


function createGrid(width, generations) {
    let grid = [];
    for (let i = 0; i < generations; i++) {
        grid[i] = new Array(width).fill(0);
    }
    return grid;
}

function runAutomaton(grid, width, generations, delay, ruleSet, gridElement) {
    let gen = 1; // Start at the first generation
    function nextGeneration() {
        // Apply the rule to each cell, except the first and last
        for (let i = 2; i < width - 1; i++) {
            grid[gen][i] = rule(grid[gen - 1][i - 2], grid[gen - 1][i - 1], grid[gen - 1][i], grid[gen - 1][i + 1], ruleSet);
        }
        displayGeneration(grid[gen], gridElement);
        gen++;
        if (gen < generations) {
            setTimeout(nextGeneration, delay); // Set timeout for next generation
        }
    }
    nextGeneration(); // Start the loop
}

function rule(left2, left1, center, right, rules) {
    let key;
    if (Object.keys(rules)[0].length === 3) {
        key = '' + left1 + center + right;
    } else if (Object.keys(rules)[0].length === 4) {
        key = '' + left2 + left1 + center + right;
        if (key !== '0000') {
            console.log(key);
        }
    }
    return rules[key];
}

function displayGeneration(generation, gridElement) {
    const row = document.createElement('div');
    for (let i = 0; i < generation.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell ' + (generation[i] ? 'alive' : 'dead');
        row.appendChild(cell);
    }
    gridElement.appendChild(row);
}