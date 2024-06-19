import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import supporting from './supporting';
import confirm from './confirm';
import confirming from './confirming';
import Dialogs from './Dialogs';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom'

function Specific() {

  return (
    <div className='d-flex justify-content-center p-5'>
      specific
    </div>
  )
}

export default Specific
