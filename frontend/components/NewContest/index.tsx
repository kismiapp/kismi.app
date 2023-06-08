import React, { useEffect, useState } from "react";
import "./index.css";
import { useAuth } from '../../auth';

const NewContestForm = ({ setIsLoading, loading, setModal, setModalMsg, setFileLoader,getAllUnactiveContests }) => {
  const { backendActor, isAuthenticated } = useAuth();

  const [name, setName] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {

  }, [loading])




  const onSubmit = async () => {
    if(date && name){

        let contest ={
          end:new Date(date).getTime(),
          name:name
        }
        let responses = await backendActor.createContest(contest)
        getAllUnactiveContests()
        console.log("contest has been created",responses)
    }else{
      setModal(true)
      setModalMsg("contest date and name are needed")
    }
  };

  return (
    <div className="NewContestCard" >
      <h2>Create new Contest</h2>
      <label>
        Enter contest name:{" "}
        <input type="text" name="contestName" placeholder="Enter contest name" onChange={e => setName(e.target.value)} />
      </label>
      <label>Select a Date and Time:{" "}
        <input type="datetime-local" name="contestDate" onChange={e => setDate(e.target.value)} />
      </label>
      <button onClick={() => onSubmit()}>Submit</button>
    </div>
  );
};

export default NewContestForm;