import React, { useState, useEffect } from "react"
import NewContest from "../../components/NewContest"
import ContestList from "../../components/ContestList";
import ActiveContest from "../../components/ActiveContest";
import { useAuth } from '../../auth';
import "./index.css";

function User({setModal, setModalMsg, setFileLoader, kisses, profile, setIsLoading, isLoading, caller, reLoad }) {
  const { backendActor, isAuthenticated } = useAuth();
  const [displayedContests, setDisplayedContests] = useState(null);
  const [activeContest, setActiveContest] = useState(null);
  const [lockStart,setLockStart] = useState(false);

  const getAllUnactiveContests = async () => {
    setIsLoading(true);
    if (backendActor) {
      let contests = await backendActor.getAllUnactiveContests();
      let response = await backendActor.getActiveContest();
      if(response &&  response.ok && response.ok.active){
        setLockStart(true);
      }
      if(contests && contests.ok && contests.ok[0]){
        setDisplayedContests(contests.ok);
      }
    }
    setIsLoading(false);
  }

  const getActiveContest = async () => {
    setIsLoading(true);
    if (backendActor) {
      let response = await backendActor.getActiveContest();
      if(response && response.ok){
        setActiveContest(response.ok);
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getAllUnactiveContests();
    getActiveContest();
  }, [isAuthenticated, backendActor])

  if(!profile.admin){
    return null;
  }

  return (
    <div className="addCards">
      {!isLoading && (
        <ActiveContest
          activeContest={activeContest}
          getActiveContest={getActiveContest}
        />
      )}
      {!isLoading && (
        <NewContest
          setModal={setModal}
          setModalMsg={setModalMsg}
          kisses={kisses}
          caller={caller}
          profile={profile}
          setIsLoading={setIsLoading}
          loading={isLoading}
          setFileLoader={setFileLoader}
          getAllUnactiveContests={getAllUnactiveContests}
        />
      )}
      {!isLoading && (
        <ContestList
          contests={displayedContests}
          lockStart={lockStart}
          getAllUnactiveContests={getAllUnactiveContests}
        />
      )}
    </div>
  )
}

export default User
