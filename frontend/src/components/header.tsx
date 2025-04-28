// import React from 'react';
import "./styles/header.css"
import {motion} from "framer-motion"

const Header = (props: any) => {

    const headerContainer = {
        hidden: { opacity: 1, scale: 1 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 0.05,
            staggerChildren: 0.05
          }
        }
    };

    const headerItem = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <>
            <motion.ul
                className='header'
                variants={headerContainer}
                initial="hidden"
                whileInView="visible"
            >
                <motion.div
                    className='headerItem'
                    variants={headerItem}
                >
                    <h3 id='flipDate'>Last Flip:<br />{props.lastFlippedDate} {props.lastFlippedTime} GMT</h3>
                </motion.div>
                <motion.div
                    className='headerItem'
                    variants={headerItem}
                >
                    <h1 id='title'>Coin Flipper</h1>
                </motion.div>
                <motion.div
                    className='headerItem'
                    variants={headerItem}
                >
                    <h2 id='totalFlippedCoins'>Total Flipped Coins: <br /> {props.totalFlips}</h2>
                </motion.div>
            </motion.ul>
        </>
    );
};

export default Header;