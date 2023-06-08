import React, {
  useEffect,
  useState,
} from "react"

/* Connect2ic provides essential utilities for IC app development
import "@connect2ic/core/style.css"
/* Import canister definitions like this: */
/* Some examples to get you started */

import TopBar from "./components/TopBar"
import Proposal from "./components/Proposal"
import Home from "./Pages/Home";
import User from "./Pages/User";
import History from "./Pages/History";
import FileLoader from "./components/FileLoader";
import Modal from "./components/Modal";
import FAQ from "./Pages/FAQ";

import "./index.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import { useAuth } from "./auth"
import Admin from "./Pages/Admin";

function AppPage() {
  const [modal, setModal] = useState(false)
  const [modalMsg, setModalMsg] = useState("")
  const [fileloader, setFileLoader] = useState({
    isOpen: false,
    currentIndex: 0,
    totalChunks: 0,
  })

  const [visibility, setVisibility] = useState([true, true, true])
  const { isAuthenticated, identity, login, backendActor, logout } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [socialProfile, setSocialProfile] = useState(null);
  const [caller, setCaller] = useState(null)
  const [icpBalance, setBalance] = useState(null)
  const [kisses, setKisses] = useState(0)

  //CountdownTimer

  useEffect(() => {
    if (isAuthenticated) {
      // getIsReady()
      console.log("is auth", identity)
      setIsLoading(false)
      getIsReady()
    } else {
      console.log("not auth", identity)
      //getIsReady()
      setProfile(null)
      setCaller(null)
      // setIsLoading(false)
    }
  }, [isAuthenticated, identity])

  const getIsReady = async () => {
    const caller = await backendActor.caller()
    const profile = await backendActor.getProfile()
    const socialProfile = await backendActor.getSocialProfile()
    const pawCoins = await backendActor.getKisses()
    console.log("caller",caller)
    console.log("profile",profile)
    console.log("social Profile",socialProfile)
    setCaller(caller)
    setProfile(profile)
    setKisses(kisses)
    setSocialProfile(socialProfile.ok)
  }

  useEffect(() => { }, [modal, fileloader])

  return (
    <>
      <Modal isOpen={modal} message={modalMsg} onClose={setModal} />
      <FileLoader
        isOpen={fileloader.isOpen}
        currentIndex={fileloader.currentIndex}
        totalChunks={fileloader.totalChunks}
        className="my-custom-loader"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Router>
          <TopBar
            setCaller={setCaller}
            icpBalance={icpBalance === null ? 0 : icpBalance}
            kisses={kisses}
            profile={profile}
            setProfile={setProfile}
            setIsLoading={setIsLoading}
            loading={isLoading}
          />
          <Routes>
            <Route path="" element={<Home isLoading={isLoading}  />} />
            <Route path="/proposal/:id" element={<Proposal />} />
            <Route
              path="/user"
              element={
                <User
                  setModal={setModal}
                  setModalMsg={setModalMsg}
                  setFileLoader={setFileLoader}
                  caller={caller}
                  setIsLoading={setIsLoading}
                  kisses={kisses}
                  profile={profile}
                  isLoading={isLoading}
                  reLoad={getIsReady}
                  socialProfile={socialProfile}
                />
              }
            />
            <Route
              path="/admin"
              element={
                <Admin
                  setModal={setModal}
                  setModalMsg={setModalMsg}
                  setFileLoader={setFileLoader}
                  caller={caller}
                  setIsLoading={setIsLoading}
                  kisses={kisses}
                  profile={profile}
                  isLoading={isLoading}
                  reLoad={getIsReady}
                />
              }
            />
            <Route
            path="/history"
            element={
              <History/>
            }
            />
               <Route
            path="/faq"
            element={
              <FAQ/>
            }
            />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default AppPage
