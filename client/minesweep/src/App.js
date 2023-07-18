import './App.css';
import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import { Select, MenuItem, List, ListItem, ListItemText } from '@mui/material';

const difficulties = {
  easy: { height: 10, width: 10, mines: 10 },
  medium: { height: 20, width: 20, mines: 40 },
  hard: { height: 30, width: 30, mines: 90 },
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [difficulty, setDifficulty] = useState('easy');
  const [board, setBoard ] = useState(createBoard(difficulties[difficulty]));
  const [timer, setTimer] = useState(0);
  const [started, SetStarted] = useState(false);
  const [recentGames, setRecentGames] = useState([]);


  useEffect (() => {
    if(started) {
      const id = setInterval(() => setTimer(time => time + 1), 1000);
      return () => clearInterval(id);
    }
  }, [started])

const handleDifficultlyChange = (event) => {
  setDifficulty(event.target.value);
  setBoard(createBoard(difficulties[event.target.value]));
}

  const handleCellClick = (x, y) => {
    if (!started){
      SetStarted(true);
    }
    if (board[x][y].status !== 'hidden') return;
    if (board[x][y].mine) {
      alert ('Game Over!');
      setRecentGames(prevGames => [...prevGames, {difficulty, time: timer}]);
      setBoard(createBoard(difficulties[difficulty]));
      return;
    }

    revealCells(x, y);
    setBoard([...board]);
  };

  const handleCellRightClick = (e, x, y) => {
    e.preventDefault();
    if  (board[x][y].status !== 'hidden')return;
    board[x][y].flagged = !board[x][y].flagged;
    setBoard([...board]);
  };

  const revealCells = (x, y) => {
    const {height, width} = difficulties[difficulty];
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
    const checkWinCondition = () => {
      return board.every(row => row.every(cell => cell.status !== 'hidden' || cell.mine));
    };
    if (board[x][y].status !== 'hidden' || board[x][y].mine) return;
    board[x][y].status = 'revealed';

    if (board[x][y].adjacentMines === 0) {
      for (let dir of dirs) {
        const newX = x + dir[0];
        const newY = y + dir[1];
        if (newX >= 0 && newX < height && newY >= 0 && newY < width) {
          revealCells(newX, newY);
        }
      }
    }

    if (checkWinCondition()) {
      alert ('You Win!');
    }
  };

  function createBoard({height, width, mines=10}) {
    let board = Array.from({length: height}, () => Array.from({length: width}, () => ({ mine:false, status: 'hidden', adjacentMines: 0})));

    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const x = Math.floor(Math.random() * height);
      const y = Math.floor(Math.random() * width);

      if (!board[x][y].mine) {
        board[x][y].mine = true;
        minesPlaced++;
      }
    }

    for (let x = 0; x < height; x++){
      for (let y = 0; y < width; y++) {
        if(board[x][y].mine) {
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              if(
                x + dx >= 0 && x + dx < height &&
                y + dy >= 0 && y +dy < width &&
                !board[x + dx][y + dy].mine
              ) {
                board[x + dx][y + dy].adjacentMines++;
              }
            }
          }
        }
      }
    }
    return board;
  }

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`App ${theme}`} style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{marginRight: '50px'}}>
        <button onClick={toggleTheme}> Toggle theme</button>
        Time: {timer}
        <Select value={difficulty} onChange={handleDifficultlyChange}
        sx={{color: theme === 'dark' ? '#fff' : '#000'}}>
          {Object.keys(difficulties).map(difficulty => (
            <MenuItem key={difficulty} value={difficulty}>
              {difficulty}
            </MenuItem>
          ))}
        </Select>
        <List>
          {recentGames.map((game, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Difficulty: ${game.difficulty}, Time: ${game.time}`} />
            </ListItem>
          ))}
        </List>
      </div>
      <Board board={board} onCellClick={handleCellClick} onCellRightClick={handleCellRightClick} />
    </div>
  );
}

export default App;