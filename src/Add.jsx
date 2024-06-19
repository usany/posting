import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
// import '@mantine/dropzone/styles.css';
import Rating from '@mui/material/Rating';
import Popover from '@mui/material/Popover';
import path from './assets/help_FILL0_wght400_GRAD0_opsz24.png';
import Lotties from './Lotties'
import Dialogs from './Dialogs'
import Pickers from './Pickers'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Add({ isLoggedIn, userObj, valuing }) {
  const [choose, setChoose] = useState(0);
  const [count, setCount] = useState(0);
  const [counter, setCounter] = useState(0);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [move, setMove] = useState(false)
//   const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [process, setProcess] = useState(false)
  const value = [0, 0]

  const roomList = ['one', 'two', 'three', 'four', 'focus']
//   {valuing === 0 && setChoose(1)}
//   {valuing === 3 && setChoose(2)}
  const changeRoom = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    setCount(value);
  }
  const changeSeat = (event) => {
      event.preventDefault()
      const {
          target: {value},
      } = event;
      setCounter(value);
  }

  const submit = async (event) => {
      event.preventDefault()
      console.log(from)
      if(count !== 0 && counter !== 0 && from !== '' && to !== '') {
        if (from.gmt > to.gmt) {
            alert('내용을 입력해 주세요')
        } else {
            console.log(to.year-from.year)
            console.log(to.month-from.month)
            console.log(to.day-from.day)
            console.log(to.hour-from.hour)
            console.log(to.minute-from.minute)

            if (to.year-from.year > 0) {
                value[0] = (to.year-from.year)*366*24*60
            } else if (to.month-from.month > 0) {
                value[0] = (to.month-from.month)*31*24*60
            } else if (to.day-from.day > 0) {
                value[0] = (to.day-from.day)*24*60
            } else if (to.hour-from.hour > 0) {
                value[0] = (to.hour-from.hour)*60
            } else if (to.minute-from.minute > 0) {
                value[0] = to.minute-from.minute
            }
            if (valuing === 0) {
                value[1] = 1
            } else {
                value[1] = 2
            }
            setProcess(true)
            await addDoc(collection(dbservice, 'num'), {
            point: value[0],
            displayName: userObj.displayName,
            text: {choose: value[1], count: count, counting: roomList[count-1], counter: counter, clock: from, clocker: to},
            round: 1,
            creatorClock: Date.now(),
            creatorId: userObj.uid,
            connectedId: null,
            connectedName: null,
            })
            setChoose(0)
            setCount(0)
            setCounter(0)
            setProcess(false)
        }
      } else {
          alert('내용을 입력해 주세요')
      }
      console.log(process)
  }

  const onClick = (num) => {
    if (isLoggedIn) {
        if (choose === num) {
            setChoose(0)
        } else {
            setChoose(num)
        }
    } else {
        setMove(true)
    }
  }

  const onChangeFrom = (event) => {
    setFrom({gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m})
  }
  const onChangeTo = (event) => {
    setTo({gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m})
}   
  const handleClose = () => {
    setMove(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosing = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const roomOne = Array(181).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)
  const roomFocus = Array(46).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)
  const roomTwo = Array(315).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)
  const roomThree = Array(156).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)
  const roomFour = Array(149).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)
  return (
    <div className='d-flex flex-column'>
        <div>
            {/* {choose === 0 && 
                <div className='d-flex justify-content-center btn-group btn-group-toggle'>
                    <button className='btn btn-outline-primary' onClick={() => onClick(1)}>빌릴래요</button>
                    <button className='btn btn-outline-primary' onClick={() => onClick(2)}>빌려줄래요</button>
                    <Dialogs move={move} handleClose={handleClose} />
                </div>
            } */}
            {valuing === 0 &&
                <div className='d-flex justify-content-center btn-group btn-group-toggle'>
                    <button className='btn btn-outline-primary active' onClick={() => onClick(1)}>빌릴래요</button>
                </div>
            }
            {valuing === 3 &&
                <div className='d-flex justify-content-center btn-group btn-group-toggle'>
                    <button className='btn btn-outline-primary active' onClick={() => onClick(2)}>빌려줄래요</button>  
                </div>
            }
        </div>
        {valuing !== null &&
            <div>
                {!process && 
                <div>
                    <div>위치가 어디인가요</div>
                    <div className='d-flex justify-content-center router'>
                        <select className='form-control' form='selection' defaultValue={0} onChange={changeRoom}>
                            <option value={0} disabled>열람실을 알려주세요</option>
                            <option value={1}>one</option>
                            <option value={5}>focus</option>
                            <option value={2}>two</option>
                            <option value={3}>three</option>
                            <option value={4}>four</option>
                        </select>
                        <select className='form-control' form='selection' defaultValue={0} onChange={changeSeat}>  
                            <option value={0} disabled>좌석을 알려주세요</option>
                            {count == 1 && roomOne}
                            {count == 5 && roomFocus}
                            {count == 2 && roomTwo}
                            {count == 3 && roomThree}
                            {count == 4 && roomFour}
                        </select>
                    </div>
                    <div>언제부터 언제까지인가요</div>
                    <Pickers onChangeFrom={onChangeFrom} onChangeTo={onChangeTo} />
                    {/* <div className='d-flex justify-content-center'>
                        <Rating
                            value={value}
                            onChange={(event, newValue) => setValue(newValue)}
                        />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div>
                            {valuing === 0 && <span>몇 포인트에 빌리시겠어요: </span>}
                            {valuing === 3 && <span>몇 포인트에 빌려주시겠어요: </span>}
                            <span>{value} </span>
                            <img src={path} aria-describedby={id} onClick={handleClick}/>
                        </div>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClosing}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            {valuing === 0 && <div>빌려준 유저에게 포인트를 제공할 수 있어요.</div>}
                            {valuing === 3 && <div>빌려받은 유저로부터 포인트를 제공받을 수 있어요.</div>}
                        </Popover>
                    </div> */}
                    <div className='d-flex justify-content-center'>
                        <form id='selection' onSubmit={submit}>
                            <input className='btn btn-outline-primary' type='submit' value='등록하기'/>
                        </form>
                        {/* <button className='btn btn-outline-primary' onClick={() => onClick(0)}>취소하기</button> */}
                    </div>
                </div>
                }
                {process &&
                    <div>
                        <div>등록 중입니다</div>
                        <Lotties />
                    </div>
                }
            </div>
        }
    </div>  
  )
}

export default Add
