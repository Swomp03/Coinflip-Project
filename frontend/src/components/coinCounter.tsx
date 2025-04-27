import React from "react";
import './styles/coinCounter.css'

import headsCoin from '../assets/Heads.png'
import tailsCoin from '../assets/Tails.png'

const CoinCounter = (props:any) => {
    return(
        <>
            <div className={props.coinSide}>
                {props.coinSide == "Heads" && <div className="totalHeader"><h2>Total </h2><img src={headsCoin} alt="headsCoin" className="counterCoin headsCounterCoin" /></div>}
                {props.coinSide == "Tails" && <div className="totalHeader"><h2>Total </h2><img src={tailsCoin} alt="tailsCoin" className="counterCoin tailsCounterCoin" /></div>}
                <h2>{props.count}</h2>
            </div>
        </>
    );
}

export default CoinCounter;