import { useEffect } from 'react';
import axios from 'axios';
import { usePlate } from './plate-context';
import MealMenu from './components/MealMenu';
import WeekResume from './components/WeekResume';
import LogInScreen from './components/LogInScreen';
import { defineWeek } from './components/helpers/defineWeek';
import { getCookie } from './components/helpers/cookies';
import { NavBar } from './components/NavBar';

import './App.css';

function App() {
    const { dispatch, state: { week, session, mealMenu } } = usePlate();

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
                            payload: data.id
                        })
                    } else {
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
                : <>
                    <NavBar />
                    {mealMenu && <MealMenu />}
                    {!mealMenu &&
                        <button className='ingredients-cell add-ing'
                            disabled={week?.today?.length > 1}
                            onClick={() => dispatch({ type: 'mealMenu', payload: true })}>
                            Agregar comida +
                        </button>}

                    {!mealMenu && <WeekResume />}
                </>
            }
        </div>
    );
}

export default App;
