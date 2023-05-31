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
import FileLoader from "./components/FileLoader";
import Modal from "./components/Modal";

import "./index.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import { useAuth } from "./auth"










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
  const [caller, setCaller] = useState(null)
  const [icpBalance, setBalance] = useState(null)
  const [pawCoin, setPawCoin] = useState(0)

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
    const pawCoins = await backendActor.getPawCoins()
    const addPawCoins = await backendActor.addPawCoins()
    setCaller(caller)
    setProfile(profile)
    setPawCoin(pawCoins)
  }

  useEffect(() => {}, [modal, fileloader])

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
          pawCoins={pawCoin}
          profile={profile}
          setProfile={setProfile}
          setIsLoading={setIsLoading}
          loading={isLoading}
        />
          <Routes>
          <Route path="" element={<Home isLoading={isLoading} />} />
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
                  pawCoin={pawCoin}
                  profile={profile}
                  isLoading={isLoading}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default AppPage
