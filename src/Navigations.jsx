import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ChevronRight from '@mui/icons-material/ChevronRight'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import Checklist from '@mui/icons-material/Checklist'
import ChecklistRtl from '@mui/icons-material/ChecklistRtl'
import BeachAccess from '@mui/icons-material/BeachAccess'
import './Navigations.css'

function Navigations({ isLoggedIn, value, setValue }) {
    return (
        <div>
            {isLoggedIn &&
                <BottomNavigation
                    className='border border-primary rounded-top position-fixed bottom-0 start-0 end-0'
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                >
                    <BottomNavigationAction label={<Link className='btns font-link' to='./posting/'>빌리기</Link>} icon={<ChevronRight />}/>
                    <BottomNavigationAction label={<Link className='btns' to='./posting/'>빌리기 목록</Link>} icon={<Checklist />}/>
                    <BottomNavigationAction label={<Link className='btns' to='./posting/'>내 상태</Link>} icon={<BeachAccess />}/>
                    <BottomNavigationAction label={<Link className='btns' to='./posting/'>빌려주기</Link>} icon={<ChevronLeft/>}/>
                    <BottomNavigationAction label={<Link className='btns' to='./posting/'>빌려주기 목록</Link>} icon={<ChecklistRtl />}/>
                    {/* <div className='font-link'>list</div> */}
                </BottomNavigation>
            }
            {!isLoggedIn && 
                <BottomNavigation
                    className='border border-primary rounded-top position-fixed bottom-0 start-0 end-0'
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        if (newValue === 0) {
                            setValue(1)
                        } else if (newValue === 2) {
                            setValue(4)
                        }
                    }}
                >
                    <BottomNavigationAction label={<Link to='./posting/'>Borrowing</Link>}/>
                    <BottomNavigationAction label={<Link to='./posting/sign'>Login</Link>}/>
                    <BottomNavigationAction label={<Link to='./posting/'>Lending</Link>}/>
                </BottomNavigation>
            }
        </div>
    )
}

export default Navigations
