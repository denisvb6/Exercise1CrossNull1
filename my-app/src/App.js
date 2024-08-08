import './App.css';
import Board from './components/Board';
import { useState } from 'react';
import {calculateWinner} from './calculate';
import PropTypes from 'prop-types';


const AppLayout = ({board, next, draw, setBoard, setNext, setDraw, winner, handleClick}) => (
    <div className="wrapper">
        <p className='info'>
            { (draw === 9) ? 'Ничья' : '' }
        </p>
        <p className='info'>
            { winner && (draw !== 9) ? 'Победитель: ' + winner : 'Ход: ' + (next ? 'X' : 'O') }
        </p>
        <Board squares={board} onClick={handleClick}/>
        { <button className='start_btn' onClick={() => (setBoard(Array(9).fill(null)) + setNext(true) + setDraw(0))}>Начать заново</button> }
    </div>
);

AppLayout.propTypes = {
	board: PropTypes.array,
	next: PropTypes.bool,
	draw: PropTypes.number,
	setBoard: PropTypes.func,
	setNext: PropTypes.func,
	setDraw: PropTypes.func,
	winner: PropTypes.array,
	handleClick: PropTypes.func
};


export const App = () => {

    const [board, setBoard] = useState(Array(9).fill(null));
    const [next, setNext] = useState(true);
    const [draw, setDraw] = useState(0);

    const winner = calculateWinner(board);

    //Клик на ячейке
    const handleClick = (index) => {
        const boardCopy = [...board];

        //Определить был ли клик по ячейке или игра закончена
        if(winner || boardCopy[index]){
            return;
        }

        //Определить чей ход Х или О
        boardCopy[index] = next ? 'X' : 'O';

        setDraw((draw) => draw + 1);


        //Обновить наши состояния
        setBoard(boardCopy);
        setNext(!next);
    }

	return <AppLayout board={board} next={next} draw={draw} setBoard={setBoard} setNext={setNext} setDraw={setDraw}
            winner={winner} handleClick={handleClick} />;
}
