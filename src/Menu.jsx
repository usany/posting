import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Message from './Message'

function Menu({ isLoggedIn, userObj }) {
  const [choose, setChoose] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
        const newArray = snapshot.docs.map((document) => {
            return ({
                id: document.id,
                ...document.data(),
            })
        });
        setMessages(newArray)
    })
  }, [])

  const onClick = () => {
    setChoose(true)
  }
  
  return (
    <div className='d-flex justify-content-center flex-column pb-5'>
        <div className='d-flex justify-content-center btn-group btn-group-toggle'>
            <button className='btn btn-outline-primary active' onClick={() => onClick()}>내 상태</button>
        </div>
        <div>
            <div className='d-flex p-5'>
                <div className='d-flex flex-column border border-primary rounded w-50'>
                    <div className='d-flex justify-content-center'>빌리기/빌려주기 상태</div>
                    <div className='d-flex justify-content-center flex-wrap'>
                        {messages.map((msg) => {
                            if(msg.creatorId === userObj.uid) {
                                if(msg.round !== 5) {
                                    return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj}/>)
                                }
                            }
                        })}
                    </div>
                </div>
                <div className='d-flex flex-column border border-primary rounded w-50'>
                    <div className='d-flex justify-content-center'>요청/승낙 상태</div>
                        <div className='d-flex justify-content-center flex-wrap'>
                            {messages.map((msg) => {
                                if(msg.connectedId === userObj.uid) {
                                    if (msg.round !== 5) {
                                        return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj}/>)
                                    }
                                }
                            })}
                        </div>
                </div>
            </div>
        </div>
    </div>  
  )
}

export default Menu
