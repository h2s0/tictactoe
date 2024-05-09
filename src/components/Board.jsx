import { useState } from 'react';
import Square from './Square';
import { useEffect } from 'react';

function Board() {

  // 게임 보드판 상태 관리
  const [squares, setSquares] = useState(Array(9).fill(null));
  // 현재 차례 상태 관리
  const [currentPlayer, setCurrentPlayer] = useState('X');
  // 승리자 관리
  const [winner, setWinner] = useState('');
  // 점수 상태 관리
  const [score, setScore] = useState(0);


  // square 클릭함수, 승패구별함수, 게임리셋함수, score 업데이트

  // 컴퓨터가 맨 처음 수를 놓게 함
  useEffect(() => {
    if (currentPlayer === 'X') {
      const timer = setTimeout(computerMove, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, squares]);

  // square 클릭 함수
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
      // 배열 구조분해
      const [a,b,c] = line;
      // 값이 있는지, 세 칸이 모두 같은 값을 가지고 있는지 확인
      if ( squares[a]
          && squares[a] === squares[b] && squares[a] === squares[c]
      ) {
        setWinner(squares[a]);
        return squares[a];
      }
    }
    return null;
  }

  useEffect(() => {
    if (winner === 'O') {
      setScore(+1);
    } else if (winner === 'X') {
      setScore(-1);
    } else {
      setScore(score)
    }
  }, [winner])

  return(
    <>
      <div className='text-center'>
        <h3>Score : {score}</h3>
        {score === 9999 && <h2>Congratulations!</h2>}
        <h2>current player : {currentPlayer}</h2>
        <h2>winner : {winner}</h2>
      </div>
      <section>
        <div className='board-row'> {[0,1,2].map( i => <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />)} </div>
        <div className='board-row'> {[3,4,5].map( i => <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />)} </div>
        <div className='board-row'> {[6,7,8].map( i => <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />)} </div>
      </section>
    </>
  )
}

export default Board