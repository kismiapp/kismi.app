import React, { useEffect, useState } from 'react';
import "./index.css"
import { useAuth } from "../../auth"

const HistoryList = () => {
    const { backendActor } = useAuth();
    const [contests, setContests] = useState(null);

    useEffect(() => {
        const fetchPastContests = async () => {
            const pastContests = await backendActor.history();
            setContests(pastContests);
        };

        fetchPastContests();
    }, [backendActor]);

    if (!contests) {
        return <div>Loading...</div>;
    }

    return (
        <div className="HistoryList">
            <h1>Past History Events</h1>
            {contests.map(contest => (
                <div key={Number(contest.id)}>
                    <h2>{contest.name}</h2>
                    <p>{new Date(Number(contest.end)).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default HistoryList;
