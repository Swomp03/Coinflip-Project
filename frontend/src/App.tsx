import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header'

function App() {

  const API_URL = "http://localhost:8000"

  // let lastFlippedDate;
  const [lastFlippedDate, setLastFlippedDate] = useState<string | null>(null);
  const [totalFlips, setTotalFlips] = useState<number | null>(null);
  const [totalHeads, setTotalHeads] = useState<number | null>(null);
  const [totalTails, setTotalTails] = useState<number | null>(null);

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

  useEffect(() => {
    const APICalls = async() => {
      const lastFlippedDateResponse: { dateFlipped: string }[] = await callAPI("/lastFlip");
      setLastFlippedDate(lastFlippedDateResponse[0].dateFlipped.substring(0, 10));
      console.log("Last Flipped Date", lastFlippedDate);

      const totalFlipsResponse: { count: number }[] = await callAPI("/totalCount");
      setTotalFlips(totalFlipsResponse[0].count);
      console.log("Total Flips:", totalFlips);

      const totalHeadsResponse: { count: number }[] = await callAPI("/headCount");
      setTotalHeads(totalHeadsResponse[0].count);
      console.log("Total Heads:", totalHeads);
      
      const totalTailsResponse: { count: number }[] = await callAPI("/tailCount");
      setTotalTails(totalTailsResponse[0].count);
      console.log("Total Tails:", totalTails);
    }

    APICalls();
  }, []);

  

  return (
    <>
      <Header lastFlippedDate={lastFlippedDate} totalFlips={totalFlips}/>
      {/* <h1>List of coin flips: {}</h1> */}
    </>
  )
}

export default App
