import { useState, useEffect } from 'react'
import Lottie from 'react-lottie'
import rain from './assets/Animation.json'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function Pickers({onChangeFrom, onChangeTo}) {
    return (
        <div className='d-flex justify-content-center'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker label="이 때부터" onChange={onChangeFrom}/>
                </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker label="이 때까지" onChange={onChangeTo}/>
                </DemoContainer>
            </LocalizationProvider>
        </div>
    )
}

export default Pickers
