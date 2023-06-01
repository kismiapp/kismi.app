import React, { useState } from "react"
import NewContest from "../../components/NewContest"
import NewProposal from "../../components/NewProposal"
import ProfileEdit from "../../components/ProfileEdit";


function User({setModal, setModalMsg, setFileLoader, pawCoin, profile, setIsLoading, isLoading, caller, reLoad }) {
    if(!profile.admin){
        return null;
    }
  return (
    <div className="addCards">
      {!isLoading && (<NewContest setModal={setModal} setModalMsg={setModalMsg} pawCoins={pawCoin} caller={caller} profile={profile} setIsLoading={setIsLoading} loading={isLoading} setFileLoader={setFileLoader} />)}
      {!isLoading && (<NewProposal setModal={setModal} setModalMsg={setModalMsg} pawCoins={pawCoin} caller={caller} profile={profile} setIsLoading={setIsLoading} loading={isLoading} setFileLoader={setFileLoader} />)}
      {!isLoading && (<ProfileEdit reLoad={reLoad} profile={profile} setIsLoading={setIsLoading}  setModalMsg={setModalMsg} setModal={setModal} />)}
    </div>
  )
}

export default User
