import React, { useEffect, useState } from "react"
import NewProposal from "../../components/NewProposal"
import ProfileEdit from "../../components/ProfileEdit";
import { useNavigate } from "react-router-dom"


function User({setModal, setModalMsg, setFileLoader, kisses, profile, setIsLoading, isLoading, caller,reLoad }) {

  const navigate = useNavigate()

  useEffect(()=>{
    if(profile && profile.admin){
      navigate("/admin")
    }
  },[profile])
  return (
    <div className="addCards">
      {!isLoading && (<NewProposal setModal={setModal} setModalMsg={setModalMsg} kisses={kisses} caller={caller} profile={profile} setIsLoading={setIsLoading} loading={isLoading} setFileLoader={setFileLoader} />)}
      {!isLoading && (<ProfileEdit reLoad={reLoad} profile={profile} setIsLoading={setIsLoading}  setModalMsg={setModalMsg} setModal={setModal} />)}
    </div>
  )
}

export default User
