import React, { useState, useEffect, useRef } from 'react';
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
  
  



function ContestanCard({ proposal, getAllProposals,voteLock }) {
    const { backendActor, isAuthenticated } = useAuth();
    const [imgSrc, setImgSrc] = useState(null);
    const [profilePicBlob, setProfilePicBlob] = useState(null);
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
        reader.onload = function (e) {
          setProfilePic(e.target.result);
        }
        reader.readAsDataURL(blob);
      } else {
        //  getContent()
      }
      if (content) {
        if ('Image' in content) {
          let image = new Uint8Array(content.Image);
          let blob = new Blob([image], { type: 'image/png' });
          let reader = new FileReader();
          reader.onload = function (e) {
            setImgSrc(e.target.result);
          }
          reader.readAsDataURL(blob);
        } else if ('Video' in content && videoUrl === null) {
          fetchVideoChunks(Number(proposal.id), Number(content.Video)).then((blobURL) => {
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
  
    return (
      <div className={`ContestantPicture ${voteLock ? 'blur-effect' : ''}`}>
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


  export default ContestanCard;