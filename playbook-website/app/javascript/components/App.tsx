import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import MainSidebar from "./MainSidebar"
import { Button } from "playbook-ui"

function App() {
  const [kits, setKits] = useState([])

  useEffect(() => {
    console.log("AJSDFLAJSDFLKJASDLFKJALKSDFJLKASDFJKASDKJF")
    // Fetch JSON data from the server
    fetch("/kits/avatar.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setKits(data.kits) // Set 'kits' to the 'kits' property of 'data'
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return kits.length > 0 ? <MainSidebar kits={kits} /> : <h1>NOPE</h1>
}

export default App
