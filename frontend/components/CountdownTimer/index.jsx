import './datetime.css';
import DateTimeDisplay from './DateTimeDisplay';
import useCountDown from '../../hooks/useCountdown';
import React, { useEffect } from 'react';
import ContestantCard from '../ContestantCard';

const ExpiredNotice = ({winner,getWinner,lockVotes}) => {

    useEffect(()=>{
        lockVotes()
    },[])

    return (
        <div className="expired-notice">
            <span>Contest Ended!!!</span>
           {winner && <ContestantCard key={Number(winner.id)} proposal={winner} getAllProposals={()=>{}} voteLock={true} />
}
        </div>
    ); //Se me ocurre una función que se llame getWinner en el backend, que le des el numero del contest y te devuelva el primer elemento
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="show-counter">
            <a className="countdown-link" href="https://tapasadhikary.com" rel="noopener noreferrer" target="_blank">
                <DateTimeDisplay isDanger={days <= 3} type="Days" value={days} />
                <p>:</p>
                <DateTimeDisplay isDanger={false} type="Hours" value={hours} />
                <p>:</p>
                <DateTimeDisplay isDanger={false} type="Mins" value={minutes} />
                <p>:</p>
                <DateTimeDisplay isDanger={minutes <= 3} type="Seconds" value={seconds} />
            </a>
        </div>
    );
};

const CountDownTimer = ({ targetDate,winner,getWinner,lockVotes,voteLock }) => {
    if(!targetDate){
        return null;
    }

    const [days, hours, minutes, seconds] = useCountDown(targetDate,getWinner,voteLock);

    if (days + hours + minutes + seconds <= 0) {

        return <ExpiredNotice winner={winner} getWinner={getWinner} lockVotes={lockVotes} />;
    } else {
        return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />;
    }
};

export default CountDownTimer;