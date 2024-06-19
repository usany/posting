import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';

function support({ userObj, msgObj, isLoggedIn }) {
  if (isLoggedIn) { 
    const data = doc(dbservice, `num/${msgObj.id}`)
    // console.log(data)
    updateDoc(data, {round: 2, connectedId: userObj.uid, connectedName: userObj.displayName});
  }
}

export default support
