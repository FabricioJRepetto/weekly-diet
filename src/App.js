import { useEffect, useState } from 'react';
import MealMenu from './components/MealMenu';
import WeekResume from './components/WeekResume';
import { usePlate } from './plate-context';
import LogInScreen from './components/LogInScreen';

import './App.css';

function App() {
    const [mealMenu, setMealMenu] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const { state: { history, session } } = usePlate();

    useEffect(() => {
        if (!!history.length) {
            let aux = history.filter(e => e.date === new Date().toLocaleDateString('en'))
            console.log(aux.length);
            if (aux.length > 1) setDisabled(true)
        }
        // eslint-disable-next-line
    }, [history])


    return (
        <div className="App">
            <h1>Dieta semanal</h1>
            {!session
                ? <>
                    <LogInScreen />
                </>
                : <>
                    {mealMenu && <MealMenu close={() => setMealMenu(false)} />}
                    {!mealMenu &&
                        <button className='ingredients-cell button'
                            disabled={disabled}
                            onClick={() => setMealMenu(true)}>
                            Agregar comida +
                        </button>}

                    {!mealMenu && <WeekResume />}
                </>}
        </div>
    );
}

export default App;
