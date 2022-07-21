import React from 'react';
import MyButton from '../components/Button';
import BasicCard from '../components/Basiccard';
import Stack from '../components/Stack';
import { SliderTrack } from '@mui/material';

const Home = () =>{
    return(
    <div>
    Home
    
        <div>
        <BasicCard /> 
        </div>
        <div>
        </div>
    <MyButton title="Login" variant="contained" />
    <MyButton title="Signp" variant="outline" />
    
    </div>)
}

export default Home;