import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { updateProfile, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';
import Steppers from './Steppers'

function Auth({ newAccount, setNewAccount }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newDisplayName, setNewDisplayName] = useState([])
  const [error, setError] = useState('')
  
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      let data;
      if (newAccount.account) {
        data = await createUserWithEmailAndPassword(auth, email, password)
        
        await setDoc(doc(dbservice, 'members', `${data.user.uid}`), {
          uid: data.user.uid,
          displayName: data.user.uid,
          points: 0,
          round: newAccount.round
        })
        await updateProfile(data.user, {
          displayName: data.user.uid
        }).catch((error) => {
          console.log('error')
        })
        setNewAccount({
          ...newAccount,
          round: setNewAccount.round+1
        })
      } else {
        data = await signInWithEmailAndPassword(auth, email, password)
      }
      console.log(data)
      setNewAccount({
        ...newAccount,
        account: false
      })
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    } else if (name === 'profile') {
      setNewDisplayName(value)
    }

    // if (email !== '' && password !== '') {
    //   setNewAccount({
    //     ...newAccount,
    //     round: newAccount.round+1
    //   })
    // }
  }

  const onRound = (round) => {
    if (round === 0) {
      setNewAccount({
        ...newAccount,
        round: newAccount.round+1
      })
    } else if (round === 1) {
      setNewAccount({
        ...newAccount,
        round: newAccount.round-1
      })
    }
  }
  
  const toggleAccount = () => setNewAccount({
    ...newAccount,
    account: !newAccount.account
  })
  
  return (  
    <div>
      <form className='border border-primary p-5' onSubmit={onSubmit}>
        <div>
          <div className='d-flex'>
            {/* <label className='form-label'>Email:</label>
            <span>&emsp;</span> */}
            <input className='form-control' placeholder='이메일' name='email' value={email} type='email' onChange={onChange} required/>
          </div>
          <div className='d-flex'>
            {/* <label className='form-label'>Password:</label>
            <span>&emsp;</span> */}
            <input className='form-control' placeholder='비밀번호' name='password' value={password} type='password' onChange={onChange} required/>
          </div>
        </div>
          <div>
            {/* <input className='form-control' placeholder='유저 이름' name='profile' value={newDisplayName} type='profile' onChange={onChange} required/> */}
            <div className='d-flex justify-content-center'>
              <input className='btn btn-outline-primary' value={newAccount.account ? '회원가입' : '로그인'} type='submit'/>
              <span>{error}</span>
            </div>
          </div>
      </form>
      <div className='d-flex justify-content-center'>
        {newAccount.account && <button className='btn btn-outline-primary' onClick={onSocialClick}>구글로 회원가입</button>}
        {!newAccount.account && <button className='btn btn-outline-primary' onClick={onSocialClick}>구글로 로그인</button>}
        <button onClick={toggleAccount} className='btn btn-outline-primary'>{newAccount.account ? '로그인' : '회원가입'}</button>
      </div>
    </div>
  )
}

export default Auth
