import { useEffect, useState } from "react";

const width = 10;
const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
];

function App() {
  const [currentColorArrengement, setCurrentColorArrengement] = useState([])

  const checkForColumnOfFour = () => {
    for (let i = 0; i < 69; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrengement[i]

      if (columnOfFour.every(square => currentColorArrengement[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColorArrengement[square] = '')
      }
    }
  }

  const checkForRowOfFour = () => {
    for (let i = 0; i < 99; i++) {
      const rowOfFour = [i, i + 1, i + 2];
      const decidedColor = currentColorArrengement[i];
      const notValid = [7, 8, 9, 17, 18, 19, 27, 28, 29, 37, 38, 39, 47, 48, 49, 57, 58, 59, 67, 68, 69, 77, 78, 79, 87, 88, 89, 97, 98, 99];

      if (notValid.includes(i)) continue;

      if (rowOfFour.every(square => currentColorArrengement[square] === decidedColor)) {
        rowOfFour.forEach(square => currentColorArrengement[square] = '')
      }
    }
  }

  const checkForColumnOfThree = () => {
    for (let i = 0; i < 79; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrengement[i]

      if (columnOfThree.every(square => currentColorArrengement[square] === decidedColor)) {
        columnOfThree.forEach(square => currentColorArrengement[square] = '')
      }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 99; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrengement[i];
      const notValid = [8, 9, 18, 19, 28, 29, 38, 39, 48, 49, 58, 59, 68, 69, 78, 79, 88, 89, 98, 99];

      if (notValid.includes(i)) continue;

      if (rowOfThree.every(square => currentColorArrengement[square] === decidedColor)) {
        rowOfThree.forEach(square => currentColorArrengement[square] = '')
      }
    }
  }

  const moveToSquareBellow = () => {
    for (let i = 0; i < 99; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrengement[i] === '') {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrengement[i] = candyColors[randomNumber];
      }

      if (currentColorArrengement[i + width] === '') {
        currentColorArrengement[i + width] = currentColorArrengement[i];
        currentColorArrengement[i] = '';
      }
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

  console.log(currentColorArrengement);

  return (
    <div className='app'>
      <div className='candy-crush'>
        {currentColorArrengement.map((candyColor, index: number) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
            alt={candyColor}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
