export default function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391": "white"
    }

    return(
        <div className="dice" style={styles}>
            <h2 className="dice-value" onClick={props.holdDice}> {props.value} </h2>
        </div>
    )
}
