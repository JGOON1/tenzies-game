import React, { useState } from 'react';
import './App.css';
import Die from './components/Die';
import {nanoid} from 'nanoid'

function App() {
  const[dice, setDice] = useState(newDiceRoll);
  const [tenzies, setTenzies] = useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const sameValue = dice.every(die => die.value === firstValue)
    if(allHeld && sameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function newDiceRoll() {
    const diceArray = [];
    for(let i = 0; i < 10; i++) {
      diceArray.push(generateNewDice())
    }
    return diceArray;
  }

  function holdDice(id) {
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      })
    })
  }

  function reRollDice() {
    if(!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDice()
      }))
    } else {
      setTenzies(false)
      setDice(newDiceRoll())
    }
  }


  const diceElements = dice.map(die => {
    return <Die 
    value={die.value} 
    key={die.id} 
    isHeld={die.isHeld}
    toggleDice={() => holdDice(die.id)}
     />
  })


  

  return (
    <main className="app-container">
                  <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button onClick={reRollDice} className='roll-button'>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
