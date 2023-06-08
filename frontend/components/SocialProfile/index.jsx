import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTelegramPlane, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../../auth';
import { useNavigate } from "react-router-dom"
import "./index.css";

const SocialProfileForm = ({ setProfile, currentProfile, onUpdate }) => {
  const handleInputChange = (event) => {
    console.log("input change", event.target.value)
    setProfile({ ...currentProfile, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate({ 
        instagram: currentProfile.instagram,
        telegram: currentProfile.telegram,
        twitter: currentProfile.twitter,
        facebook: currentProfile.facebook
    });
  };


  console.log("what sup",currentProfile)
  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Social Profile</h2>
      <label><FontAwesomeIcon icon={faInstagram} /> Instagram</label>
      <input type="text" name="instagram" placeholder={currentProfile && currentProfile.instagram} value={currentProfile ? currentProfile.instagram : ""}
        onChange={handleInputChange} />
      <label><FontAwesomeIcon icon={faTelegramPlane} /> Telegram</label>
      <input type="text" name="telegram" placeholder={currentProfile && currentProfile.telegram} value={currentProfile ? currentProfile.telegram : ""}
        onChange={handleInputChange} />
      <label><FontAwesomeIcon icon={faTwitter} /> Twitter</label>
      <input type="text" name="twitter" placeholder={currentProfile && currentProfile.twitter} value={currentProfile ? currentProfile.twitter : ""}
        onChange={handleInputChange} />
      <label><FontAwesomeIcon icon={faFacebookF} /> Facebook</label>
      <input type="text" name="facebook" placeholder={currentProfile && currentProfile.facebook} value={currentProfile ? currentProfile.facebook : ""}
        onChange={handleInputChange} />
      <button type="submit">Update Profile</button>
    </form>
  );
};

const App = ({ setIsLoading, profile, reLoad }) => {
  const { backendActor, isAuthenticated } = useAuth();

  const defaultProfile = {
    instagram: "",
    telegram: "",
    twitter: "",
    facebook: "",
  };
  const [currentProfile, setCurrentProfile] = useState(defaultProfile);
  const navigate = useNavigate()



useEffect(() => {
  if (profile) {
    console.log("if",profile)
    setCurrentProfile({
      instagram: profile.instagram || "",
      telegram: profile.telegram || "",
      twitter: profile.twitter || "",
      facebook: profile.facebook || "",
    });
  } else {
    console.log("else")
    setCurrentProfile(defaultProfile);
  }
}, [isAuthenticated, profile]);

  const handleProfileUpdate = async (updatedProfile) => {
    try {
      setIsLoading(true)
      let callet = await backendActor.updateSocialProfile(updatedProfile);
      console.log("profile update", callet);
      setIsLoading(false)
      reLoad()
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    isAuthenticated && <SocialProfileForm setProfile={setCurrentProfile} currentProfile={currentProfile} onUpdate={handleProfileUpdate} />
  );
};

export default App;
