import React, { useState } from 'react'
import { usePlate } from '../plate-context'
import { group } from '../constants.js'

import '../components/style/IngredientList.css'

const IngredientList = ({ list, openList }) => {
    const [veg, setVeg] = useState('vegA')
    const { dispatch,
        state,
        state: {
            protein,
            carbohydrate,
            vegetal
        }
    } = usePlate()

    if (list === 'search') return (<></>)

    const handleSelect = (ing) => {
        let aux = []

        switch (list) {
            case 'protein':
                aux = [...protein]
                break;

            case 'carbohydrate':
                aux = [...carbohydrate]
                break;

            default:
                aux = [...vegetal]
                break;
        }
        if (aux.includes(ing)) {
            aux = aux.filter(e => e !== ing)
            if (group.vegC.map(e => e.name).includes(ing))
                dispatch({
                    type: 'vegC',
                    payload: false
                })
        } else {
            aux.push(ing)
            if (group.vegC.map(e => e.name).includes(ing))
                dispatch({
                    type: 'vegC',
                    payload: true
                })
        }

        dispatch({
            type: list,
            payload: aux
        })
    }

    const clearList = () => {
        state[list].forEach(e => {
            let ele = document.getElementById('ingOpt' + e)
            ele.checked = false
        });
        dispatch({
            type: list,
            payload: []
        })
    }

    return (
        <div className="ingredient-list-container">
            {list === 'vegetal' &&
                <>
                    <button onClick={() => setVeg('vegA')}>Vegetales A</button>
                    <button onClick={() => setVeg('vegB')}>Vegetales B</button>
                </>}

            <div className="ingList">
                {group[list].map(ing =>
                    <label key={ing.name}
                        htmlFor={'ingOpt' + ing.name}
                        className={(list === 'vegetal' && veg !== 'veg' + ing.group) ? 'invisible' : ''}>
                        <div className={`ingOption ${state[list].includes(ing.name) ? 'selectedOpt' : ''}`}
                            style={{ borderRight: `5px solid ${ing.color}` }}>
                            <input type="checkbox"
                                name={'ingOpt' + ing.name}
                                id={'ingOpt' + ing.name}
                                defaultChecked={state[list].includes(ing.name)}
                                onClick={() => handleSelect(ing.name)} />

                            <div className='ingOption-text'>
                                <p>
                                    {ing.name}
                                </p>
                            </div>
                        </div>
                    </label>
                )}
            </div>

            <div className='ingList-buttons'>
                <button onClick={() => openList(false)}>volver</button>
                <button onClick={clearList}>quitar todo</button>
            </div>
        </div>
    )
}

export default IngredientList