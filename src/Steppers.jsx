import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    '계정 입력',
    '프로필 입력',
  ];
  
function Steppers({ newAccount }) {
    return (
        <div>
            <Stepper activeStep={newAccount.round} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
        </div>
    )
}

export default Steppers
