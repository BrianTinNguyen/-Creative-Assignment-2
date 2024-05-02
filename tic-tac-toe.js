window.addEventListener('DOMContentLoaded', () => { // Loading
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const display = document.querySelector('.display-player'); // Selecting DOM elements
    const resetBtn = document.querySelector('.reset');
    const announcer = document.querySelector('.announcer');

    // Game variables
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isActive = true;

    // Declaring the results
    const playerx_win = 'playerx_win';
    const Playero_win = 'Playero_win';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],      // All winning combos
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Main content functions below

    // Validation for results
    function results() {
        let roundWin = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWin = true;
                break;
            }
        }

    if (roundWin) {
            announce(currentPlayer === 'X' ? playerx_win : Playero_win); // Annnoucements
            isActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }
    // Display game results
    const announce = (type) => {
        switch(type){
            case Playero_win:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case playerx_win:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    // Checking if X and O is avaliable or not
    const isValid = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    };

    // Update
    const update =  (index) => {
        board[index] = currentPlayer;
    }

    // Switching players after click
    const switchPlayers = () => {
        display.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        display.innerText = currentPlayer;
        display.classList.add(`player${currentPlayer}`);
    }

    // Click action
    const usersAction = (tile, index) => {
        if(isValid(tile) && isActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            update(index);
            results();
            switchPlayers();
        }
    }
    // Reset all game function
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            switchPlayers();
        }
 
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');   // Reset tiles
        });
    }

    // Event listeners to tiles and reset buttons
    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => usersAction(tile, index));
    });

    resetBtn.addEventListener('click', resetBoard);
});