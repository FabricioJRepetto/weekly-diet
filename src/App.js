import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios';
import { usePlate } from './plate-context';
import MealMenu from './components/MealMenu';
import Home from './components/Home';
import LogInScreen from './components/LogInScreen';
import { defineWeek } from './components/helpers/defineWeek';
import { deleteCookie, getCookie } from './components/helpers/cookies';
import { CustomFoods } from './components/CustomFoods';
import { Checkpoint } from "./components/Checkpoint";
import { Config } from "./components/Config";
import AllWeeks from './components/AllWeeks';

import { PDFtest } from './components/PDFtest';
import { PDFViewer } from '@react-pdf/renderer';

import './App.css';

function App() {
    const navigate = useNavigate()
    const { dispatch, state: { session } } = usePlate();

    useEffect(() => {
        if (session) {
            (async () => {
                const {
                    today,
                    start
                } = defineWeek()
                const { data } = await axios(`/history/fullhistory?today=${today}&start=${start}`)
                dispatch({ type: 'save', payload: data })
            })()
        } else {
            const token = getCookie('autoLogin')
            if (token) {
                (async () => {
                    const { data } = await axios(`/user/autologin`)
                    if (!data.error) {
                        dispatch({
                            type: 'login',
                            payload: data
                        })
                        navigate('/')
                    } else {
                        deleteCookie('autoLogin')
                        dispatch({
                            type: 'loading',
                            payload: false
                        })
                    }
                })()
            } else {
                dispatch({
                    type: 'loading',
                    payload: false
                })
            }
        }
        // eslint-disable-next-line
    }, [session])

    return (
        <div className="App">
            {!session
                ? <LogInScreen />
                : <div className='main'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/mealMenu" element={<MealMenu />} />
                        <Route path="/customFoods" element={<CustomFoods />} />
                        <Route path="/history" element={<AllWeeks />} />
                        <Route path="/checkpoint" element={<Checkpoint />} />
                        <Route path="/config" element={<Config />} />

                        <Route path="/pdf" element={<PDFtest />} />

                    </Routes>
                </div>}
        </div>
    );
}

export default App;
