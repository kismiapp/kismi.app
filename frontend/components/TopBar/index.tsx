import React, { useEffect, useState } from "react"
import "./index.css"
import { useAuth } from "../../auth"
import { useNavigate } from "react-router-dom"

function TopBar({
  setIsLoading,
  loading,
  profile,
  setProfile,
  icpBalance,
  kisses,
  setCaller,
}) {
  const [ImgSrc, setImgSrc] = useState(null)
  const navigate = useNavigate()

  const auth = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hamburger, setHamburger] = useState(false)

  const { isAuthenticated, identity, login, backendActor, logout } = useAuth()

  useEffect(() => {
    if (!profile) {
      setIsLoading(true)
    }
    if (profile && profile.profilePic) {
      let image = new Uint8Array(profile.profilePic[0])
      let blob = new Blob([image])
      let reader = new FileReader()
      reader.onload = function (e) {
        setImgSrc(e.target.result)
      }
      reader.readAsDataURL(blob)
    }
  }, [profile, ImgSrc])

  const handleImageClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogoClick = () => {
    setHamburger(!hamburger)
  }

  let placeHolderImg =
    "https://cdn.midjourney.com/de16692f-bda7-418d-8138-36c1a9632c40/0_2.png"
  return (
    <div className="TopBar">
      <div
        className="kismi-logo"
        onClick={() => {
          handleImageClick()
        }}
      >
        <img
          src="https://iili.io/Hr7kS5X.png"
          width="150px"
          height="50px"
          alt="Kissmi-logo"
        />
      </div>
      <div
        className="hamburger"
        style={isMenuOpen ? { display: "contents" } : {}}
      >
        <h2
          onClick={() => {
            navigate("/")
          }}
        >
          HOME
        </h2>
        <h2
          onClick={() => {
            navigate("/faq")
          }}
        >
          FAQ
        </h2>
        <h2
          onClick={() => {
            navigate("/history")
          }}
        >
          HISTORY
        </h2>
        {isAuthenticated && (
          <React.Fragment>
            <h3>{kisses + " Kisses"}</h3>
            <div className="profile-link">
              <img
                className="profile-pic"
                src={ImgSrc ? ImgSrc : placeHolderImg}
                alt="Profile"
                onClick={handleLogoClick}
              />
              {hamburger && (
                <div className="profile-menu">
                  <button
                    onClick={() => {
                      handleLogoClick()
                      navigate("/user")
                    }}
                  >
                    Edit Profile
                  </button>
                  {profile && profile.admin && (
                    <button
                      onClick={async () => {
                        handleLogoClick()
                        navigate("/admin")
                      }}
                    >
                      admin
                    </button>
                  )}

                  <button
                    onClick={async () => {
                      handleLogoClick()
                      logout(), navigate("/")
                    }}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </React.Fragment>
        )}
        {!isAuthenticated && (
          <button
            onClick={async () => {
              await login(), navigate("/user")
            }}
          >
            Log in
          </button>
        )}
      </div>
    </div>
  )
}

export default TopBar
