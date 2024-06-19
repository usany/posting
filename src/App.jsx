import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Router from './Router'
import Lotties from './Lotties'
import { auth } from './serverbase'

function App() {
  // const [count, setCount] = useState(0)
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)
  const [newAccount, setNewAccount] = useState({account: false, round: 0})

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (
    <div>
      {init ? <Router isLoggedIn={isLoggedIn} userObj={userObj} newAccount={newAccount} setNewAccount={setNewAccount}/> : <Lotties/>}
    </div>
  )
}

export default App
