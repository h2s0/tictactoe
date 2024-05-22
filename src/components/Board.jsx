import { useState, useEffect } from 'react';
import Square from './Square';
import Title from './Title';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState('');
  const [c, setComputerScore] = useState(0);
  const [p, setPlayerScore] = useState(0);
  const [textColor, setTextColor] = useState('text-gray-300');

  useEffect(() => {
    if (referee(squares)) {
      setWinner(referee(squares));
    }
    if (currentPlayer === 'X') {
      const timer = setTimeout(computerMove, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, squares]);

  const handleClick = (i) => {
    if (squares[i] || referee(squares) || currentPlayer !== 'O') {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = 'O';
    setSquares(nextSquares);
    setCurrentPlayer('X');
  }

  const computerMove = () => {
    if (referee(squares) || currentPlayer !== 'X') {
      return;
    }
    const emptySquare = squares.map((square,i) => square === null ? i : null).filter(i => i !== null);
    if (emptySquare.length === 0) return;
    const randomSquare = emptySquare[Math.floor(Math.random() * emptySquare.length)];
    const newSquares = squares.slice();
    newSquares[randomSquare] = 'X';
    setSquares(newSquares);
    setCurrentPlayer('O');
  }

  const referee = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for ( let line of lines ) {
      const [a,b,c] = line;
      if ( squares[a]
          && squares[a] === squares[b] && squares[a] === squares[c]
      ) {
        setWinner(squares[a]);
        setTextColor('text-black');
        return squares[a];
      }
    }
    const isFull = squares.every(square => square !== null);
    if (isFull ) {
      setWinner('Draw');
      setTextColor('text-black');
    }
    return null;
  }

  useEffect(() => {
    if (winner === 'O') {
      setPlayerScore(prevScore => prevScore + 1);
    } else if (winner === 'X') {
      setComputerScore(prevScore => prevScore + 1);
    } else if (winner === 'Draw') {
      setPlayerScore(prevScore => prevScore);
      setComputerScore(prevScore => prevScore);
    }
  }, [winner])

  const nextGameClick = () => {
    if (!winner) {
      return;
    }
    setWinner('');
    setSquares(Array(9).fill(null));
    setCurrentPlayer('X');
    setTextColor('text-gray-300');
  };

  return(
    <div className='flex flex-col gap-2 items-center w-72 bg-orange-200 rounded-3xl p-5'>
      <h5>{p} : {c}</h5>
      <h5>current player : {currentPlayer}</h5>
      <Title p={p} c={c} />
      <div>
        <div className='board-row'> {[0,1,2].map( i => <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />)} </div>
        <div className='board-row'> {[3,4,5].map( i => <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />)} </div>
        <div className='board-row'> {[6,7,8].map( i => <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />)} </div>
      </div>
      <h5>winner : {winner}</h5>
      <button className={`bg-white px-4 py-2 rounded-lg ${textColor}`} onClick={nextGameClick}>Play Again</button>
    </div>
  )
}

export default Board;