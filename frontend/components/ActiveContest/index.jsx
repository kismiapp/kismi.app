import React, { useState, useEffect } from 'react';
import { useAuth } from "../../auth"

const ActiveContest = ({ activeContest, getActiveContest }) => {
    const { backendActor } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (activeContest !== undefined) {
            setIsLoading(false);
        }
    }, [activeContest]);

    const stopContest = async () => {
        if (backendActor && activeContest) {
            let response = await backendActor.stopActiveContest(Number(activeContest.id));
            console.log("response from stopping the contest", response);
            getActiveContest(); // Refresh the contest status
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ActiveContest">
            <h1>Active Contest</h1>
            {activeContest ? (
                <div key={Number(activeContest.id)}>
                    <h2>{activeContest.name}</h2>
                    <p>{new Date(Number(activeContest.end)).toLocaleString()}</p>
                    <button onClick={stopContest}>Stop Contest</button>
                </div>
            ) : (
                <p>No active contest found.</p>
            )}
        </div>
    );
};

export default ActiveContest;
