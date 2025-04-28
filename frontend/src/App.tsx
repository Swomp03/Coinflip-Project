import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header'
import CoinCounter from './components/coinCounter'

import headsCoin from './assets/Heads.png'
import tailsCoin from './assets/Tails.png'
import { motion } from 'motion/react'

function App() {

  // const API_URL = "http://localhost:8000"
  const API_URL = "https://coinflipapi.robertliao.ca"

  const coinImages = {
    heads: headsCoin,
    tails: tailsCoin
  }

  let isCoinClickDisabled = false;

  const [lastFlippedDate, setLastFlippedDate] = useState<string | null>(null);
  const [lastFlippedTime, setLastFlippedTime] = useState<string | null>(null);
  const [totalFlips, setTotalFlips] = useState<number | null>(null);
  const [totalHeads, setTotalHeads] = useState<number | null>(null);
  const [totalTails, setTotalTails] = useState<number | null>(null);

  const [side, setSide] = useState<'heads' | 'tails'>('heads');
  const [flipping, setFlipping] = useState(false);

  const [highlightHeads, setHighlightHeads] = useState(false);
  const [highlightTails, setHighlightTails] = useState(false);

  const callAPI = async (apiEndpoint:string) => {
    try {
      const response = await fetch(`${API_URL}${apiEndpoint}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  const APICalls = async() => {
    const lastFlippedDateResponse: { dateFlipped: string }[] = await callAPI("/lastFlip");
    // setLastFlippedDate(lastFlippedDateResponse[0].dateFlipped.substring(0, 10));
    setLastFlippedDate(lastFlippedDateResponse[0].dateFlipped.substring(0, 10));
    setLastFlippedTime(lastFlippedDateResponse[0].dateFlipped.substring(11, 19));
    // console.log("Last Flipped Date", lastFlippedDate);

    const totalFlipsResponse: { count: number }[] = await callAPI("/totalCount");
    setTotalFlips(totalFlipsResponse[0].count);
    // console.log("Total Flips:", totalFlips);

    const totalHeadsResponse: { count: number }[] = await callAPI("/headCount");
    setTotalHeads(totalHeadsResponse[0].count);
    // console.log("Total Heads:", totalHeads);
    
    const totalTailsResponse: { count: number }[] = await callAPI("/tailCount");
    setTotalTails(totalTailsResponse[0].count);
    // console.log("Total Tails:", totalTails);
  }

  const [rotation, setRotation] = useState(0);

  const handleFlip = async () => {

    isCoinClickDisabled = true;
    setFlipping(true);

    console.log("Current Side:", side);

    const newSide = Math.random() < 0.5 ? 'heads' : 'tails';

    setRotation((prevRotation) =>
      newSide === 'heads' ? prevRotation + 1800 : prevRotation + 1980
    );

    if(side === "heads"){
      switch(newSide){
        case "heads":
          setRotation(rotation + 1800);
          break;
        case "tails":
          setRotation(rotation + 1980);
          break;
        default:
          console.log("Error in spinning")
      }
    }
    else{
      switch(newSide){
        case "heads":
          setRotation(rotation + 1980);
          break;
        case "tails":
          setRotation(rotation + 1800);
          break;
        default:
          console.log("Error in spinning")
      }
    }

    setTimeout(() => {
      setSide(newSide);
      setFlipping(false);

      // console.log("New Side", newSide);

      const confirmAPIInsert = async() => {
        switch(newSide){
          case "heads":
            const confirmHeads: { coinSide: string }[] = await callAPI("/headsFlipped");
            console.log("Confirm heads:", confirmHeads);
            break;
          case "tails":
            const confirmTails: { coinSide: string }[] = await callAPI("/tailsFlipped");
            console.log("Confirm tails:", confirmTails);
            break; 
          default:
            console.log("Error in inserting into DB");
        }
      }

      confirmAPIInsert();
      APICalls();
      
      switch(newSide){
        case "heads":
          setHighlightHeads(true);
          break;
        case "tails":
          setHighlightTails(true);
          break;
        default:
          console.log("Error in styling");
      }
      setTimeout(() => {
        setHighlightHeads(false);
        setHighlightTails(false);
      }, 1000);

      isCoinClickDisabled = false;
    }, 1000); // Match this with your animation duration
  };

  useEffect(() => {
    APICalls();
  }, []);


  const mainContainer = {
    hidden: { opacity: 1, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.05,
        staggerChildren: 0.25
      }
    }
  };

  const mainItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
  };
  

  return (
    <>
      
      <Header lastFlippedDate={lastFlippedDate} lastFlippedTime={lastFlippedTime} totalFlips={totalFlips}/>

      <motion.ul
        className="coin-container"
        variants={mainContainer}
        initial="hidden"
        whileInView="visible"
      >

        <div className='coin-section'>

          {/* For Mobile Devices */}
          <div className='mobileCoinCounter'>
            <motion.div
              className={`mobileHeadsCounter ${highlightHeads ? "highlightSide": "noHighlight"}`}
              variants={mainItem}
            >
              <CoinCounter
                coinSide="Heads"
                count={totalHeads}
              />
            </motion.div>

            <motion.div
              className={`mobileTailsCounter ${highlightTails ? "highlightSide": "noHighlight"}`}
              variants={mainItem}
            >
              <CoinCounter
                coinSide="Tails"
                count={totalTails}
              />
            </motion.div>
          </div>
          
          {/* For Desktop */}
          <motion.div
            className={`fullscreenCoinCounter ${highlightHeads ? "highlightSide": "noHighlight"}`}
            variants={mainItem}
          >
            <CoinCounter
              coinSide="Heads"
              count={totalHeads}
            />
          </motion.div>

          <motion.div
            onClick={!isCoinClickDisabled ? handleFlip : undefined}
            variants={mainItem}
          >
            <div
              className={`coin ${flipping ? 'flipping' : ''}`}
              style={{
                transform: `rotateY(${rotation}deg)`,
              }}
            >
              <div className="coin-side heads">
                <img src={headsCoin} alt="heads" />
              </div>
              <div className="coin-side tails">
                <img src={tailsCoin} alt="tails" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`fullscreenCoinCounter ${highlightTails ? "highlightSide": "noHighlight"}`}
            variants={mainItem}
          >
            <CoinCounter
              coinSide="Tails"
              count={totalTails}
            />
          </motion.div>
          
        </div>

        <motion.div
          variants={mainItem}
        >
          <motion.button
            className='coin-button'
            onClick={handleFlip}
            disabled={flipping}
          >
            Flip!
          </motion.button>
        </motion.div>
      </motion.ul>
      
    </>
  )
}

export default App
