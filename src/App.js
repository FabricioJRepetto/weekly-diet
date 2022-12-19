import { useState } from 'react';
import MealMenu from './components/MealMenu';
import WeekResume from './components/WeekResume';

import './App.css';

function App() {
    const [mealMenu, setMealMenu] = useState(false)

    const newMeal = () => {
        // vaciar el estado
        // abrir menu
        setMealMenu(true)
    }

    return (
        <div className="App">
            <h1>Dieta semanal</h1>

            {mealMenu && <MealMenu close={() => setMealMenu(false)} />}
            {!mealMenu && <button className='ingredients-cell button' onClick={newMeal}>Agregar comida +</button>}

            {!mealMenu && <WeekResume />}
        </div>
    );
}

export default App;
