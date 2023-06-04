import React, { useState, useEffect, useRef } from 'react';
import { Slider } from '@mui/material';
import "./index.css";
import { useAuth } from '../../auth';
import { useNavigate } from 'react-router-dom';

function LoadingContent({ isLoading, imgSrc }) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="LoadingContent">
      <img src={"https://media.discordapp.net/attachments/1075054732667797567/1109571893499015208/videoLoader.png"} alt="Loading..." />
      <p className="loading-text">Loading...</p>
    </div>
  );
}

function ProposalCard({ proposal, getAllProposals,voteLock }) {
  const { backendActor, isAuthenticated } = useAuth();
  const [imgSrc, setImgSrc] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicBlob, setProfilePicBlob] = useState(null);
  const [profileName, setProfileName] = useState(null);
  const [content, setContent] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getContent();
  }, [proposal]); // only re-run when 'proposal' changes

  useEffect(() => {
    if (profilePicBlob) {
      //console.log("proposal profilePic",profilePic)
      //let image = new Uint8Array([...profilePicBlob]);
      let blob = new Blob(profilePicBlob, { type: 'image/png' });
      let reader = new FileReader();
      console.log("image blob", blob)
      reader.onload = function (e) {
        setProfilePic(e.target.result);
      }
      reader.readAsDataURL(blob);
    } else {
      //  getContent()
    }
    if (content) {
      console.log("content", content)
      if ('Image' in content) {
        let image = new Uint8Array(content.Image);
        let blob = new Blob([image], { type: 'image/png' });
        let reader = new FileReader();
        console.log("image blob", blob)
        reader.onload = function (e) {
          setImgSrc(e.target.result);
        }
        reader.readAsDataURL(blob);
      } else if ('Video' in content && videoUrl === null) {
        console.log("content", Number(content.Video))
        fetchVideoChunks(Number(proposal.id), Number(content.Video)).then((blobURL) => {
          console.log(" blob url", blobURL)
          //   setVideoUrl(blobURL);
        });
      }
    }
  }, [content, videoRef, profilePicBlob]); // only re-run when 'content' changes

  const renderContent = () => {
    // while fetching Image or Video
    if ('Image' in content && !imgSrc) {
      return <LoadingContent isLoading={true} imgSrc={"../assets/videoLoader.png"} />;
    } else if ('Video' in content && !videoUrl) {
      return <LoadingContent isLoading={true} imgSrc={"../assets/videoLoader.png"} />;
    } else if ('Image' in content) {
      return imgSrc ? <img id={`proposal-img${Number(proposal.id)}`} className="content" src={imgSrc} alt="Content" /> : null;
    } else if ('Video' in content) {
      return videoUrl ? <video id={`proposal-video${Number(proposal.id)}`} className="content" src={videoUrl} controls /> : null;
    }
  }

  // Function to fetch video chunks
  const fetchVideoChunks = async (proposalId, totalChunks) => {
    let newChunks = [];
    for (let i = 0; i < totalChunks + 1; i++) {
      const chunkData = await backendActor.getVideoChunk(proposalId, i);
      newChunks = [...newChunks, ...chunkData]

    }
    const videoData = new Uint8Array(newChunks);
    const blob = new Blob([videoData], { type: 'video/mp4' });
    const myFile = new File(
      [blob],
      "demo.mp4",
      { type: 'video/mp4' }
    );

    let reader = new FileReader();
    reader.onload = function (e) {
      setVideoUrl(e.target.result);
    }
    reader.readAsDataURL(myFile);
    //return blob;
  }

  const getContent = async () => {
    let caller = await backendActor.getContent(Number(proposal.id));
    let profile = await backendActor.getProposalProfilePic(Number(proposal.id));

    if (profile) {
      // console.log("profile pic",profileprofilePic)
      setContent(caller)
      setProfilePicBlob(profile[0].profilePic)
      setProfileName(profile[0].name)
    }
    console.log("getting content ", caller);
  }

  const [kissCount, setKissCount] = useState(Number(proposal.votes));
  const handleKissButtonClick = async () => {
    setKissCount(prevCount => prevCount + 1);
    await backendActor.addVote(proposal.id);
    setTimeout(() => {
      getAllProposals()
    }, 2000)
  };

  /*
  <h6>{profileName && profileName}</h6>
  <img className="profile-pic" src={profilePic ? profilePic : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} alt="Profile" />
  <div><FontAwesomeIcon icon={faCalendar} /></div>
  <h2>Country: {proposal.description}</h2>
  <div className="comments-section"></div>
  <div className="ProposalCard" onClick={() => { navigate(`/proposal/${Number(proposal.id)}`) }}>
  <button className="kissButton" onClick={async () => { await backendActor.addVote(proposal.id) }}>KISS</button>&nbsp;
              {`${Number(proposal.icp)}  `}<img src="https://iili.io/Hr5iCR2.png"></img>
  */

              /*
    <div className="ContestantPicture">
      <div className="image-container">
        <h6>{proposal.description}</h6>
        {content && renderContent()}
        <div className="footer">
          <button className="kissButton" onClick={handleKissButtonClick}>KISS</button>&nbsp;
          <div className="kissCount">
            {`${kissCount}  `}<img src="https://iili.io/Hr5iCR2.png"></img>
          </div>
        </div>
      </div>
    </div>
              */
  return (
    <div className="ContestantPicture">
      <div className="image-container">
        <h6>{proposal.description}</h6>
        {content && renderContent()}
        <div className="footer">
          <button className="kissButton" disabled={voteLock} onClick={handleKissButtonClick}>KISS</button>&nbsp;
          <div className="kissCount">
            {`${kissCount}  `}<img src="https://iili.io/Hr5iCR2.png"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  /*    <div className="ProposalWall" onScroll={handleScroll}>
      <Slider aria-label="Slider" defaultValue={3} color="secondary" onChange={handleSliderChange} />
  */
  return (
    <>
      <div className="mt-2 hover:opacity-100 opacity-50 transition-all">
        <div className="text-center text-xs opacity-50">Columns: {sliderValue}</div>
        <Slider aria-label="Columns" value={sliderValue} onChange={handleSliderChange} min={1} max={6} step={1} />
      </div>

      <div className="ProposalWall" onScroll={handleScroll} style={{ width: `${sliderValue * 250}px` }}>
        {displayedProposals && displayedProposals.map(proposal => (
          <ProposalCard key={Number(proposal.id)} proposal={proposal} getAllProposals={getAllProposals} voteLock={voteLock} />
        ))}
      </div>
    </>
  );

};

export default ProposalWall;