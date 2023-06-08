import React from 'react';
import "./index.css"
import { useAuth } from "../../auth"


const ContestList = ({ contests, lockStart, getAllUnactiveContests }) => {
    const{backendActor}= useAuth()

  const startContest = async (contestId) => {
    let response = await backendActor.startActiveContest(Number(contestId));
    console.log("response from starting the contest",response);
    getAllUnactiveContests(); // Refresh the list
  };

  if (!contests) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ContestList">
        <h1>Upcoming Contests</h1>
      {contests && contests.map(contest => (
        <div key={Number(contest.id)}>
          <h2>{contest.name}</h2>
          <p>{new Date(Number(contest.end)).toLocaleString()}</p>
          {!lockStart &&
          <button
            onClick={() => startContest(contest.id)}
            disabled={lockStart}
          >
            Start Contest
          </button>}
        </div>
      ))}
    </div>
  );
};

export default ContestList;
