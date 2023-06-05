import React, { useEffect, useState } from "react"
import CountDownTimer from "../../components/CountdownTimer"
import ProposalWall from "../../components/wall"
import { useAuth } from "../../auth";

function Home({ isLoading }) {
  const { backendActor } = useAuth();
  const THREE_DAYS_IN_MS = 1 * 24 * 60 * 60 * 1000
  const NOW_IN_MS = new Date().getTime()
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS
  const [targetDate, setTargetDate] = useState(null)
  const [voteLock, setVoteLock] = useState(false)

  useEffect(() => {
    if (!targetDate) {
      getCompEnd()
    }
  }, [backendActor])

  const getCompEnd = async () => {
    if (backendActor) {
      let response = await backendActor.getActiveContest();
      if (response > 0) {
        console.log("new targte date", response)
        setTargetDate(new Date(Number(response)))
      } else {
        setTargetDate(new Date(0))
        setVoteLock(true)
      }
    }
  }

//      {targetDate && <ProposalWall voteLock={voteLock} />}
      
  return (
    <>

      {targetDate && <ProposalWall />}


    </>
  )
}

export default Home