import React, { useEffect, useState } from "react"
import CountDownTimer from "../../components/CountdownTimer"
import ProposalWall from "../../components/wall"
import { useAuth } from "../../auth";
import "./index.css";

function Home({ isLoading }) {
  const { backendActor } = useAuth();
  const [targetDate, setTargetDate] = useState(null)
  const [voteLock,setVoteLock] = useState(false)
  const [winner, setWinner] = useState(null)

  useEffect(()=>{

  },[winner])

  useEffect(()=>{
    if(!targetDate){
      getCompEnd()
    }
  },[backendActor])

  const getCompEnd = async () =>{
    if(backendActor){
      let response = await backendActor.getActiveContest();
      console.log("get contest",response)
      if(response.ok && response.ok.end > 0){
        let contestEnd = new Date(Number(response.ok.end))
       let now = new Date().getTime()
       if(contestEnd<=now){
        setTargetDate(new Date(0))
        setVoteLock(true)
        await getWinner()
       }else{
        setTargetDate(new Date(Number(response.ok.end)))
        await getWinner()
       }
      }else {
        setTargetDate(new Date(0))
        setVoteLock(true)
      }
    }
  }

  const lockVotes = () =>{
    setVoteLock(true)

  }

  const getWinner = async () =>{
    try{
      let winnerResponse = await backendActor.getWinner();
      setWinner(winnerResponse)
    }catch(err){

    }

  }


  return (
    <>
    <div className="title-counter">COMPETITION ROUND 001</div>
    <div className="title-counter2">Current Round Timer</div>
      { targetDate &&  <CountDownTimer winner={winner} targetDate={targetDate} getWinner={getWinner} lockVotes={lockVotes} voteLock={voteLock} />}
      {targetDate && <ProposalWall voteLock={voteLock} /> }
    </>
  )
}

export default Home
