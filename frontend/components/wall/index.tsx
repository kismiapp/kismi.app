import React, { useState, useEffect, useRef } from 'react';
import { Slider } from '@mui/material';
import "./index.css";
import { useAuth } from '../../auth';
import ContestantCard from "../ContestantCard"


const ProposalWall = ({voteLock}) => {
  const { backendActor, isAuthenticated } = useAuth();
  const [displayedProposals, setDisplayedProposals] = useState([]);
  const [sliderValue, setSliderValue] = useState(6);

  useEffect(() => {

  }, [displayedProposals])

  useEffect(() => {
    getAllProposals()
  }, [isAuthenticated, backendActor])

  const getAllProposals = async () => {
    if (backendActor) {
      let contestants = await backendActor.getAllContestantsByVotes()
      setDisplayedProposals(contestants)
    }
  }

  const handleSliderChange = (event, value) => {
    setSliderValue(value);
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      // Fetch more proposals when the user has scrolled to the bottom
      const newProposals = displayedProposals.slice(displayedProposals.length, displayedProposals.length + 10);
      setDisplayedProposals(prevProposals => [...prevProposals, ...newProposals]);
    }
  };
  return (
    <>
      <div className="mt-2 hover:opacity-100 opacity-50 transition-all">
        <div className="text-center text-xs opacity-50">Columns: {sliderValue}</div>
        <Slider aria-label="Columns" value={sliderValue} onChange={handleSliderChange} min={1} max={6} step={1} />
      </div>

      <div className="ProposalWall" onScroll={handleScroll} style={{ width: `${sliderValue * 250}px` }}>
        {displayedProposals && displayedProposals.map(proposal => (
          <ContestantCard key={Number(proposal.id)} proposal={proposal} getAllProposals={getAllProposals} voteLock={voteLock} />
        ))}
      </div>
    </>
  );

};

export default ProposalWall;