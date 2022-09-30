import React from "react";
import Dice from "./components/Dice.js";
import Button from "./components/Button.js";
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

//setting state for all dice
  const [allDice, setAllDice] = React.useState(allNewDice)


//setting state for tenzies(to see if the game is complete or not)
  const [tenzies, setTenzies] = React.useState(false)  


//useEffect for Tenzies
  React.useEffect(() => {
    const isHeldCheck = allDice.every(item => item.isHeld)
    const valueCheck = allDice.every(item => item.value === allDice[0].value)

    if(isHeldCheck && valueCheck){
      setTenzies(true)
      console.log("You Won!")//!can remove this
    }
  }, [allDice])


//setting diceElements
  const diceElements = allDice.map(dice => <Dice key={dice.id} value={dice.value} isHeld={dice.isHeld} holdDice={() => holdDice(dice.id)}/>) 


//function to toggle isHeld
  function holdDice(id) {
    const newAllDice = allDice.map(item => {
      if(item.id === id) {
        return {...item, isHeld: !item.isHeld}
      }
      return item 
    })
    setAllDice(newAllDice)
  }

  
//function to generate dice numbers
  function allNewDice() {
    const diceArray = []
    while( diceArray.length < 10){
      diceArray.push({
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
      })
    }
    return(diceArray)
  }


//roll button functionality
  function rollDice() {
    const newDice = allDice.map(item => {
      if(!item.isHeld) { 
        return {
          value: Math.ceil(Math.random() * 6), 
          isHeld: false,
          id: nanoid()}
      }
      return item
    })

    tenzies ? startNewGame() : setAllDice(newDice)
  }

//start a new game
  function startNewGame() {
    setTenzies(false); 
    setAllDice(allNewDice);
  }


//rendering
  return (
    <main className="App">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <Button rollDice={rollDice} tenzies={tenzies}/>
      {tenzies && <Confetti />}
    </main>
  );
}
