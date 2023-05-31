import React, { useState } from "react"
import CountDownTimer from "../../components/CountdownTimer"
import ProposalWall from "../../components/wall"

function Home({ isLoading }) {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000
  const NOW_IN_MS = new Date().getTime()
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS
  const [targetDate, setTargetDate] = useState(new Date(dateTimeAfterThreeDays))

  return (
    <>
      <CountDownTimer targetDate={targetDate} />
       <ProposalWall />
    </>
  )
}

export default Home
