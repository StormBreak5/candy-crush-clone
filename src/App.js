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

  const createBoard = () => {
    const randomColorArrangement =[];

    for(let i = 0; i < width*width; i++) {
      const randomNum0to5 = Math.floor(Math.random() * candyColors.length);
      const randomColor = candyColors[randomNum0to5];

      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrengement(randomColorArrangement);
  }

  useEffect(() => {
    createBoard();
  }, [])

  console.log(currentColorArrengement);

  return (
    <div className='app'>
      <div className='candy-crush'>
        {currentColorArrengement.map((candyColor, index : number) => (
          <img 
            key={index}
            style={{backgroundColor: candyColor}}  
          />
        ))}
      </div>
    </div>
  );
}

export default App;
