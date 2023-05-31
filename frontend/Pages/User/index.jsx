import React, { useState } from "react"
import CountDownTimer from "../../components/CountdownTimer"
import NewProposal from "../../components/NewProposal"
import ProposalWall from "../../components/wall"

function Home({
  setModal,
  setModalMsg,
  setFileLoader,
  pawCoin,
  profile,
  setIsLoading,
  isLoading,
  caller,
}) {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000
  const NOW_IN_MS = new Date().getTime()
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS
  const [targetDate, setTargetDate] = useState(new Date(dateTimeAfterThreeDays))
  return (
    <>
      <CountDownTimer targetDate={targetDate} />
      {!isLoading && (
        <NewProposal
          setModal={setModal}
          setModalMsg={setModalMsg}
          pawCoins={pawCoin}
          caller={caller}
          profile={profile}
          setIsLoading={setIsLoading}
          loading={isLoading}
          setFileLoader={setFileLoader}
        />
      )}

      {!isLoading && <ProposalWall />}
    </>
  )
}

export default Home
