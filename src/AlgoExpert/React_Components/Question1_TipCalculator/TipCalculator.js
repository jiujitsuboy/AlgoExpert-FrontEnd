import React, {useState, useEffect} from 'react';
import classes from "./TipCalculator.module.css"

export default function TipCalculator() {
  // Write your code here.
  const [bill, setBill] = useState(50)
  const [tip, setTip] = useState(18)
  const [numPeople, setNumPeople] = useState(1)
  const [totalTip, setTotalTip] = useState(0)
  const [tipPerPerson, setTipPerPerson] = useState(0)


  useEffect(()=>{console.log("tip: ",tip, " : ", isNaN("10"))
    if(!(bill && tip)){
      setTotalTip("-")
      return
    }
    setTotalTip(bill * (tip/100))    
  }, [bill, tip])

  useEffect(()=>{
    if(totalTip === "-"){
      setTipPerPerson("-")
      return
    }
    setTipPerPerson(totalTip / numPeople)    
  }, [totalTip, numPeople])
  return (
    <>
      <div id={classes.root}>
        <label>Bill</label>
        <input type="text" value={bill} onChange={(e)=>setBill(e.target.value)}/>
        <label>Tip Percentage</label>
        <input type="text" value={tip} onChange={(e)=>setTip(e.target.value)}/>
        <label>Number of People</label>
        <input type="text" value={numPeople} onChange={(e)=>setNumPeople(e.target.value)}/>
        <p>
        <label>Total Tip: {totalTip !== "-" ? `$${totalTip}`:"-"}</label>
        <label>Tip Per Person: {tipPerPerson !== "-" ? `$${tipPerPerson}`:"-"}</label>
        </p>        
      </div>
    </>
  );
}