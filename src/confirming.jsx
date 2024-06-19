import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';

function confirming({ userObj, msgObj }) {
    const data = doc(dbservice, `num/${msgObj.id}`)
    // console.log(data)
    updateDoc(data, {round: 4});
}

export default confirming
