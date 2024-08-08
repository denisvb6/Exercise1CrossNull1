import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

export default function Board({ squares, onClick }) {
	return (
		<div className="board">
			{ squares.map((square, index) => (
			    <Square key={index} value={square} onClick={() => onClick(index)} />
			)) }
		</div>
	);
}

Board.propTypes = {
	squares: PropTypes.array,
	onClick: PropTypes.func
};
