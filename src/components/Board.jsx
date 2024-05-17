import { useState, useEffect } from 'react';
import Square from './Square';

function Board() {

  // 게임 보드판 상태 관리
  const [squares, setSquares] = useState(Array(9).fill(null));
  // 현재 차례 상태 관리
  const [currentPlayer, setCurrentPlayer] = useState('X');
  // 승리자 상태 관리
  const [winner, setWinner] = useState('');
  // 점수 상태 관리
  const [computerScore, setComputerScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(9999);
  // 버튼 글자 색깔 상태 관리
  const [textColor, setTextColor] = useState('text-gray-300');

  // 컴퓨터가 맨 처음 수를 놓게 함
  useEffect(() => {
    if (referee(squares)) {
      setWinner(referee(squares));
    }
    if (currentPlayer === 'X') {
      const timer = setTimeout(computerMove, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, squares]);

  // 사용자 차례
  const handleClick = (i) => {
    if (squares[i] || referee(squares) || currentPlayer !== 'O') {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = 'O';
    setSquares(nextSquares);
    setCurrentPlayer('X');
  }

  // 컴퓨터 차례
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

  // 승,패 구별
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

  // 게임 종료 후 점수 올리고 내리기
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

  // 다음 게임 버튼
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
      <h5>{playerScore} : {computerScore}</h5>
      <h5>current player : {currentPlayer}</h5>
      {playerScore === 9999 && <h5 className='underline'>winner winner ch1cken dinner</h5>}
      {computerScore === 9999 && <h5 className='underline'>loser loser drunken b00zer</h5>}
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

export default Board