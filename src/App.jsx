import Die from "./components/die"
import React from "react";
import Confetti from "react-confetti";

function App() {

  const [arr, setArr] = React.useState(() => generateRandomNumber());
  const [gamewon, setGameWon] = React.useState(false);

  React.useEffect(() => {
    if (arr.every(die => die.isHeld && die.value === arr[0].value)) {
      setGameWon(true);
    } else {
      setGameWon(false);
    }
  }, [arr]);

  function generateRandomNumber() {

    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({value: (Math.floor(Math.random() * 6) + 1), isHeld:false});
    }
    return arr;
  };

  function hold(idx){
    setArr(prevArr => {
      return prevArr.map((die, i) => {
        if (i === idx) {
          return { ...die, isHeld: !die.isHeld };
        }
        return die;
      });
    });
  }

  function rollDice() {
    setArr(prevArr => {
      return prevArr.map(die => {
        if (!die.isHeld) {
          return { ...die, value: (Math.floor(Math.random() * 6) + 1) };
        }
        return die;
      });
    });
  }

  function rollFull() {
    setArr(generateRandomNumber());
    setGameWon(false);
  }

  const randomNumbers = generateRandomNumber();

  const newGameButtonRef = React.useRef(null);

  React.useEffect(() => {
    if (gamewon && newGameButtonRef.current) {
      newGameButtonRef.current.focus();
    }
  }, [gamewon]);

  return (
    <>
      <main className="tenzies">
      {gamewon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gamewon && <span className="win-message">You won! press "new game" to play again</span>}
      </div>
        <div className="tenzies-header">
          Tenzies
          <br /><span>
            Roll until all dice are the same. Click each die to freeze it at its current value between rolls
          </span>
        </div>
        <div className="dice-container">
          {arr.map((dieobj, idx) => (
            <Die
              key={idx}
              value={dieobj.value}
              isHeld={dieobj.isHeld}
              hold={hold}
              id={idx}
            />
          ))}
        </div>
        <div className="tenzies-title">
            {gamewon ? (
              <button
                className="roll-dice"
                onClick={rollFull}
                ref={newGameButtonRef}
              >
                New Game
              </button>
            ) : (
              <button className="roll-dice" onClick={rollDice}>
                Roll Dice
              </button>
            )}
        </div>
      </main>
      <footer className="app-footer">
        <p>Made by Abhijith Benny</p>
      </footer>
    </>
  )
};
export default App;