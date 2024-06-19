import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import './Navigation.css'

const onLogOutClick = () => auth.signOut();
function Navigation({ isLoggedIn, userObj }) {
  // const [open, setOpen] = useState(false);
  
  const checkbox = (event) => {
    document.getElementById('nav-control').checked = false
    document.getElementsByClassName('navigation')[0].style.left = '-100%'
  }
  const handleClick = (event) => {
    if(document.getElementsByClassName('navigation')[0].style.left === '-100%') {
      document.getElementsByClassName('navigation')[0].style.left = ''
    } else if (document.getElementsByClassName('navigation')[0].style.left === '0') {
      document.getElementById('nav-control').checked = false
      document.getElementsByClassName('navigation')[0].style.left = '-100%'
    }
  };
  let offsetX
  const add = (event) => {
    offsetX = event.clientX-event.target.getBoundingClientRect().left
    event.target.addEventListener('pointermove', move)
    console.log(offsetX)
  }
  const remove = (event) => {
    event.target.removeEventListener('pointermove', move)
    if (event.pageX-offsetX < 0) {
      document.getElementById('nav-control').checked = false
      event.target.style.left = '-100%'
      // setOpen(true)
    }
  }
  const move = (event) => {
    const el = event.target
    if (event.pageX-offsetX < 0) {
      el.style.left = `${event.pageX-offsetX}px`
    }
  }

  return(
    <ClickAwayListener onClickAway={(event) => checkbox(event)}>
      <div>
        {/* <div> */}
        <input type="checkbox" id="nav-control" className="nav-control" onClick={handleClick}/>
        <label htmlFor="nav-control" className="toggle-button">
          <div className="wolverine">
            <div className="claws"></div>
          </div>
        </label>
        {/* </div>  */}
        {isLoggedIn && 
        <nav className="navigation"  onPointerDown={(event) => add(event)} onPointerUp={(event) => remove(event)}>
          <h1 className='nav-padding'>
            <Link to='/posting/' onClick={(event) => checkbox(event)}>메인 페이지</Link>
          </h1>
          <h1>
            <Link to='/posting/profile' onClick={(event) => checkbox(event)}>{userObj.displayName}의 프로필</Link>
          </h1>
          <h1>
            <Link to='/posting/ranking' onClick={(event) => checkbox(event)}>유저 랭킹</Link>
          </h1>
          <h1>
            <Link to="/posting/contact" onClick={(event) => checkbox(event)}>신고하기</Link>
          </h1>
          <h1>
            <Link to="/posting/sign" onClick={(event) => {
              onLogOutClick()
              checkbox(event)
            }}>로그아웃</Link>
          </h1>
        </nav>
        }
        {!isLoggedIn &&
          <nav className="navigation" onPointerDown={(event) => add(event)} onPointerUp={(event) => remove(event)}>
            <h1 className='nav-padding'>
              <Link to='/posting/' onClick={(event) => checkbox(event)}>메인 페이지</Link>
            </h1>
            <h1>
              <Link to='/posting/sign' onClick={(event) => checkbox(event)}>로그인/회원가입</Link>
            </h1>
            <h1>
              <Link to="/posting/contact" onClick={(event) => checkbox(event)}>신고하기</Link>
            </h1>
          </nav>
        }
        </div>
      </ClickAwayListener>
    )
}

export default Navigation