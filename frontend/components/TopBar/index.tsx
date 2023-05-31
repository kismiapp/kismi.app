import React, {  useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import { useAuth } from "../../auth";
import {
useNavigate,
} from "react-router-dom"




function TopBar({  setIsLoading, loading, profile, setProfile, icpBalance, pawCoins, setCaller }) {
  const [ImgSrc, setImgSrc] = useState(null);
  const navigate = useNavigate()

  const auth = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, identity, login, backendActor, logout } = useAuth();

  useEffect(() => {
    if (!profile) {
      setIsLoading(true);
    }
    if (profile && profile.profilePic) {
      let image = new Uint8Array(profile.profilePic[0]);
      let blob = new Blob([image]);
      let reader = new FileReader();
      reader.onload = function (e) {
        setImgSrc(e.target.result);
      }
      reader.readAsDataURL(blob);
    }
  }, [profile, ImgSrc])



  const handleImageClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let placeHolderImg = "https://cdn.midjourney.com/de16692f-bda7-418d-8138-36c1a9632c40/0_2.png";
  return (
    <div className="ProfileCard">
      <div className="kismi-logo"><img src="https://iili.io/Hr7kS5X.png" width="150px" height="50px" alt="Kissmi-logo" /></div>
      <h2 onClick={()=>{navigate("/")}}>HOME</h2>
      <h2>NOTIFICATION</h2>
      <h2>HISTORY</h2>
      <h2>KISSBOX</h2>
      {isAuthenticated &&
        <React.Fragment>
          <h3>{pawCoins + " Kisses"}</h3>
          <div className="profile-link">
            <img className="profile-pic" src={ImgSrc ? ImgSrc : placeHolderImg} alt="Profile" onClick={handleImageClick} />
            {isMenuOpen && (
              <div className="profile-menu">
                <button onClick={()=>{console.log("what sup"),navigate("/user")}}>Edit Profile</button>
                <button>Placeholder</button>
                <button onClick={async () => { logout() }}>Log out</button>
              </div>
            )}
          </div>
        </React.Fragment>
      }
      {!isAuthenticated && <button onClick={async () => { await login(),navigate("/user") }} >Log in</button>}
    </div>
  );
}

export default TopBar;