import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePlate } from './plate-context';
import MealMenu from './components/MealMenu';
import WeekSummary from './components/WeekSummary';
import LogInScreen from './components/LogInScreen';
import { defineWeek } from './components/helpers/defineWeek';
import { getCookie } from './components/helpers/cookies';

import './App.css';
import { CustomFoods } from './components/CustomFoods';

function App() {
    const { dispatch, state: { week, session, mealMenu } } = usePlate();

    const [customFoods, setCustomFoods] = useState(false)

    useEffect(() => {
        if (session) {
            (async () => {
                console.log(`%c app Effect, session: true`, 'background-color: #ffffff; color: orange; font-weight: bold;');
                const {
                    today,
                    start
                } = defineWeek()
                const { data } = await axios(`/history/fullhistory?today=${today}&start=${start}`)
                dispatch({ type: 'save', payload: data })
                console.log(data.group);
            })()
        } else {
            const token = getCookie('autoLogin')
            if (token) {
                (async () => {
                    console.log(`%c app Effect, session: false`, 'background-color: #ffffff; color: blue; font-weight: bold;');
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
                : <div className='main'>
                    {(mealMenu && !customFoods) && <MealMenu />}
                    {(!mealMenu && !customFoods) &&
                        <>
                            <button className='ingredients-cell add-ing'
                                disabled={week?.today?.length > 1}
                                onClick={() => dispatch({ type: 'mealMenu', payload: true })}>
                                Agregar comida +
                            </button>
                            <button onClick={() => setCustomFoods(() => true)}>Mis preparaciones</button>
                            <WeekSummary />
                        </>}
                    {(customFoods && !mealMenu) && <CustomFoods />}
                </div>
            }
        </div>
    );
}

export default App;
