import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePlate } from './plate-context';
import MealMenu from './components/MealMenu';
import WeekResume from './components/WeekResume';
import LogInScreen from './components/LogInScreen';
import { BACK_URL } from './constants';
import { defineWeek } from './components/helpers/defineWeek';

import './App.css';

function App() {
    const [mealMenu, setMealMenu] = useState(false)
    const { dispatch, state: { week, session, id } } = usePlate();

    useEffect(() => {
        if (session) {
            (async () => {
                const {
                    today,
                    start
                } = defineWeek()
                const { data } = await axios(`${BACK_URL}/history/fullhistory?today=${today}&start=${start}&id=${id}`)
                dispatch({ type: 'allHistory', payload: data })
            })()
        }
        // eslint-disable-next-line
    }, [session])


    return (
        <div className="App">
            <h1>Dieta semanal</h1>
            {!session
                ? <LogInScreen />
                : <>
                    {mealMenu && <MealMenu close={() => setMealMenu(false)} />}
                    {!mealMenu &&
                        <button className='ingredients-cell button'
                            disabled={week?.today?.length > 1}
                            onClick={() => setMealMenu(true)}>
                            Agregar comida +
                        </button>}

                    {!mealMenu && <WeekResume />}
                </>}
        </div>
    );
}

export default App;
