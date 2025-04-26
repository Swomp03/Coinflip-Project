import React from "react";
import './styles/coinCounter.css'

const CoinCounter = (props:any) => {
    return(
        <>
            <div className={props.coinSide}>
                <h2>Total {props.coinSide}:</h2>
                <h2>{props.count}</h2>
            </div>
        </>
    );
}

export default CoinCounter;