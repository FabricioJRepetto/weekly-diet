import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios';
import { usePlate } from './plate-context';
import MealMenu from './components/MealMenu';
import BreakfastMenu from './components/BreakfastMenu';
import Home from './components/Home';
import LogInScreen from './components/LogInScreen';
import { defineWeek } from './components/helpers/defineWeek';
import { deleteCookie, getCookie } from './components/helpers/cookies';
import { CustomFoods } from './components/CustomFoods';
import { Checkpoint } from "./components/Checkpoint";
import { CreateCheckpoint } from './components/CreateCheckpoint';
import { Config } from "./components/Config";
import AllWeeks from './components/AllWeeks';
import { TutorialContainer } from './components/TutorialContainer';
// import { Test } from './components/Test';

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
                const { data } = await axios(`/history/fullhistory/v2?today=${today}&start=${start}`)
                // console.log(data);
                dispatch({ type: 'save', payload: data })

                const { data: data2 } = await axios(`/user/config`)
                // console.log(data2);
                dispatch({
                    type: 'userConfig',
                    payload: data2.config
                })
                dispatch({ type: 'loading', payload: false })
            })()
        } else {
            const token = getCookie('autoLogin')
            if (token) {
                (async () => {
                    const { data } = await axios(`/user/autologin`)
                    // console.log(data);
                    if (!data.error) {
                        dispatch({
                            type: 'login',
                            payload: data
                        })
                        navigate('/')
                    } else {
                        deleteCookie('autoLogin')
                        dispatch({ type: 'loading', payload: false })
                    }
                })()
            } else {
                dispatch({ type: 'loading', payload: false })
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
                        <Route path="/breakfastMenu" element={<BreakfastMenu />} />
                        <Route path="/customFoods" element={<CustomFoods />} />
                        <Route path="/history" element={<AllWeeks />} />
                        <Route path="/checkpoint" element={<Checkpoint />} />
                        <Route path="/createcheckpoint" element={<CreateCheckpoint />} />
                        <Route path="/config" element={<Config />} />

                        {/* <Route path="/testing" element={<Test />} /> */}
                    </Routes>

                    <TutorialContainer />
                </div>}
        </div>
    );
}

export default App;
