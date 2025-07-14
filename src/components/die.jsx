

function Die(props){
    return (
        <button className="die" style={props.isHeld ? { backgroundColor: "#59E391" } :{}} 
            aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
            aria-pressed={props.isHeld}
            onClick={()=>props.hold(props.id)}    
        >
            {props.value}
        </button>
    )
}
export default Die;