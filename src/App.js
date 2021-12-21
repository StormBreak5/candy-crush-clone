import { useEffect, useState } from "react";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";

import BlueCandy from './images/blue-candy.png';
import GreenCandy from './images/green-candy.png';
import OrangeCandy from './images/orange-candy.png';
import PurpleCandy from './images/purple-candy.png';
import RedCandy from './images/red-candy.png';
import YellowCandy from './images/yellow-candy.png';
import blank from './images/blank.png';

const width = 10;
const candyColors = [
  BlueCandy,
  GreenCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy
];

function App() {
  const [currentColorArrengement, setCurrentColorArrengement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 69; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrengement[i];
      const isBlank = currentColorArrengement[i] === blank;

      if (columnOfFour.every(square => currentColorArrengement[square] === decidedColor) && !isBlank) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(square => currentColorArrengement[square] = blank);
        return true;
      }
    }
  }

  const checkForRowOfFour = () => {
    for (let i = 0; i < 99; i++) {
      const rowOfFour = [i, i + 1, i + 2];
      const decidedColor = currentColorArrengement[i];
      const notValid = [7, 8, 9, 17, 18, 19, 27, 28, 29, 37, 38, 39, 47, 48, 49, 57, 58, 59, 67, 68, 69, 77, 78, 79, 87, 88, 89, 97, 98, 99];
      const isBlank = currentColorArrengement[i] === blank;

      if (notValid.includes(i)) continue;

      if (rowOfFour.every(square => currentColorArrengement[square] === decidedColor) && !isBlank) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach(square => currentColorArrengement[square] = blank);
        return true;
      }
    }
  }

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 79; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrengement[i];
      const isBlank = currentColorArrengement[i] === blank;

      if (columnOfThree.every(square => currentColorArrengement[square] === decidedColor) && !isBlank) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(square => currentColorArrengement[square] = blank);
        return true;
      }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 99; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrengement[i];
      const notValid = [8, 9, 18, 19, 28, 29, 38, 39, 48, 49, 58, 59, 68, 69, 78, 79, 88, 89, 98, 99];
      const isBlank = currentColorArrengement[i] === blank;

      if (notValid.includes(i)) continue;

      if (rowOfThree.every(square => currentColorArrengement[square] === decidedColor) && !isBlank) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(square => currentColorArrengement[square] = blank);
        return true;
      }
    }
  }

  const moveToSquareBellow = () => {
    for (let i = 0; i <= 89; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrengement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrengement[i] = candyColors[randomNumber];
      }

      if (currentColorArrengement[i + width] === blank) {
        currentColorArrengement[i + width] = currentColorArrengement[i];
        currentColorArrengement[i] = blank;
      }
    }
  }

  const dragStart = (e) => {
    setSquareBeingDragged(e.target)
  }

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
  }

  const dragEnd = () => {

    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

    currentColorArrengement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');
    currentColorArrengement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src');

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (squareBeingReplacedId &&
      validMove &&
      (isARowOfFour || isARowOfThree || isAColumnOfFour || isAColumnOfThree)) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrengement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
      currentColorArrengement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
      setCurrentColorArrengement([...currentColorArrengement]);
    }
  }

  const createBoard = () => {
    const randomColorArrangement = [];

    for (let i = 0; i < width * width; i++) {
      const randomNum0to5 = Math.floor(Math.random() * candyColors.length);
      const randomColor = candyColors[randomNum0to5];

      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrengement(randomColorArrangement);
  }

  useEffect(() => {
    createBoard();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveToSquareBellow();

      setCurrentColorArrengement([...currentColorArrengement])
    }, 100);

    return () => clearInterval(timer)

  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveToSquareBellow, currentColorArrengement])

  return (
    <div className='app'>
      <div className='candy-crush'>
        {currentColorArrengement.map((candyColor, index: number) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <ScoreBoard score={scoreDisplay} />
    </div>
  );
}

export default App;
