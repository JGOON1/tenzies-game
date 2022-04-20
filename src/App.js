import { useState } from 'react';
import './App.css';
import Die from './components/Die';
import {nanoid} from 'nanoid'

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
        value: generateRandomNumber(),
        isHeld: false,
        id: nanoid()
      })
    }
    return diceArray;
  }

  function reRollDice() {
    setDice(newDiceRoll())
  }


  const diceElements = dice.map(die => {
    return <Die value={die.value} key={die.id} isHeld={die.isHeld} />
  })


  

  return (
    <main className="app-container">
      <div className='dice-container'>
        {diceElements}
      </div>
      <button onClick={reRollDice} className='roll-button'>Roll</button>
    </main>
  );
}

export default App;
