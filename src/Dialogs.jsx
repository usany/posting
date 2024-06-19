import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

function Dialogs({move, handleClose}) {
    return (
        <Dialog open={move} onClose={handleClose}>
            <DialogContent>
                로그인이 필요합니다
            </DialogContent>
            <DialogActions>
            <Link to='/posting/sign' className='btn btn-outline-primary' onClick={handleClose}>로그인/회원가입 페이지</Link>
            <button className='btn btn-outline-primary' onClick={handleClose} autoFocus>
                닫기
            </button>
            </DialogActions>
        </Dialog>
    )
}

export default Dialogs
