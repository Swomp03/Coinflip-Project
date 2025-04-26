import React from 'react';
import "./styles/header.css"

const Header = (props: any) => {

    return (
        <div className='header'>
            <h2 id='flipDate'>Last Coin Flip Date:<br /> {props.lastFlippedDate}</h2>
            <h1 id='title'>Coin Flipper</h1>
            <h2 id='totalFlippedCoins'>Total Flipped Coins: <br /> {props.totalFlips}</h2>
        </div>
    );
};

export default Header;