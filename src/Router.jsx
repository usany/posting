import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import 'firebase/firestore'
import Home from './Home'
import Auth from './Auth'
import Profile from './Profile'
import Ranking from './Ranking'
import Specific from './Specific'
import Navigation from './Navigation'
import Navigations from './Navigations'

function Router({ isLoggedIn, userObj, newAccount, setNewAccount }) {
    const [value, setValue] = useState(2);
    return (
        <BrowserRouter>
            <Navigation isLoggedIn={isLoggedIn} userObj={userObj}/>
            <Routes>
                {
                    isLoggedIn ? (
                        <Route>
                            <Route path='/posting/' Component={() => <Home isLoggedIn={isLoggedIn} userObj={userObj} value={value}/>}/>
                            <Route path='/posting/sign' Component={() => <Home isLoggedIn={isLoggedIn} userObj={userObj} value={value}/>}/>
                            <Route path='/posting/profile' Component={() => <Profile userObj={userObj} />}/>
                            <Route path='/posting/ranking' Component={() => <Ranking userObj={userObj} />}/>
                            <Route path='/posting/specific' Component={() => <Specific />}/>
                        </Route>
                    ) : (
                        <Route>
                            <Route path='/posting/' Component={() => <Home isLoggedIn={isLoggedIn} userObj={{uid: null}} value={value}/>}/>
                            <Route path='/posting/sign' Component={() => <Auth newAccount={newAccount} setNewAccount={setNewAccount}/>}/>
                        </Route>
                    )
                }
            </Routes>
            <Navigations isLoggedIn={isLoggedIn} value={value} setValue={setValue}/>
        </BrowserRouter>
    )
}

export default Router