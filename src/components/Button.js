export default function Button(props) {
    return(
    <button className="roll-dice" onClick={props.rollDice}> {props.tenzies ? "New Game" : "Roll Dice"} </button>
    )
}