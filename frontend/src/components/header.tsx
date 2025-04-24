import React from 'react';

const Header = (props: any) => {

    // let lastFlippedDate = props.lastFlippedDate;
    // let totalFlips = props.totalFlips;

    return (
        <div>
            <h2>Last Coin Flip Date: {props.lastFlippedDate}</h2>
            <h1>Header Component</h1>
            <h2>Total Flipped Coins: {props.totalFlips}</h2>
        </div>
    );
};

export default Header;