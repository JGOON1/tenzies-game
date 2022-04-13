import { useState } from 'react';
import './App.css';
import Die from './components/Die';

function App() {
  const[dice, setDice] = useState(newDiceRoll);

  function generateRandomNumber() {
     const number = Math.ceil(Math.random() * 6)
     return number;
  }

  function newDiceRoll() {
    const diceArray = [];
    for(let i = 0; i < 10; i++) {
      diceArray.push({
        value: generateRandomNumber()
      })
    }
    return diceArray;
  }

  console.log(newDiceRoll())

  const diceElements = dice.map(die => {
    return <Die value={die.value} />
  })


  

  return (
    <main className="app-container">
      <div className='dice-container'>
        {diceElements}
      </div>
    </main>
  );
}

export default App;
