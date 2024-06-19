import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';

function supporting({ userObj, msgObj, isLoggedIn }) {
  if (isLoggedIn) { 
    const data = doc(dbservice, `num/${msgObj.id}`)
    // console.log(data)
    updateDoc(data, {round: 1, connectedId: null, connectedName: null});
  }
}

export default supporting
