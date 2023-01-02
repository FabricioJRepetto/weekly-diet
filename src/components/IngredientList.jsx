import React, { useState } from 'react'
import { usePlate } from '../plate-context'
import { group } from '../constants.js'

import '../components/style/IngredientList.css'

const IngredientList = ({ list, type, openList }) => {
    const [veg, setVeg] = useState('vegA')
    const { dispatch,
        state: {
            currentPlate,
            currentPlate: {
                protein,
                foods,
                carbohydrate,
                vegetal
            } }
    } = usePlate()

    if (list === 'search') return (<></>)

    const handleSelect = ({ name, list }) => {
        let aux = []

        switch (list) {
            case 'protein':
                aux = [...protein]
                break;

            case 'carbohydrate':
                aux = [...carbohydrate]
                break;

            case 'vegetal':
                aux = [...vegetal]
                break;

            default:
                aux = [...foods]
                break;
        }
        if (aux.includes(name)) {
            aux = aux.filter(e => e !== name)
            if (group.vegC.map(e => e.name).includes(name))
                dispatch({
                    type: 'vegC',
                    payload: false
                })
        } else {
            aux.push(name)
            if (group.vegC.map(e => e.name).includes(name))
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
        currentPlate[list].forEach(e => {
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
                <div className='vegetal-group-button'>
                    <button className={`button ${veg === 'vegA' ? '' : 'button-sec'}`}
                        onClick={() => setVeg('vegA')}>Vegetales A</button>
                    <button className={`button ${veg === 'vegB' ? '' : 'button-sec'}`}
                        onClick={() => setVeg('vegB')}>Vegetales B</button>
                </div>}

            <div className="ingList">
                {list === 'vegetal' &&
                    <label key={'ensalada'}
                        htmlFor={'ingOptEnsalada'}>
                        <div className={`ingOption ${currentPlate.vegetal.includes('Ensalada') ? 'selectedOpt' : ''}`}
                            style={{ borderRight: `5px solid var(--veg)` }}>
                            <input type="checkbox"
                                name={'ingOptEnsalada'}
                                id={'ingOptEnsalada'}
                                defaultChecked={currentPlate.vegetal.includes('Ensalada')}
                                onClick={() => handleSelect({ name: 'Ensalada', list: 'vegetal' })} />
                            <div className='ingOption-text'>
                                <p>Ensalada 🥗</p>
                            </div>
                        </div>
                    </label>}
                {group[list].map(ing =>
                    <label key={ing.name}
                        htmlFor={'ingOpt' + ing.name}
                        className={(list === 'vegetal' && veg !== 'veg' + ing.group) ? 'invisible' : ''}>
                        <div className={`ingOption ${currentPlate[type].includes(ing.name) ? 'selectedOpt' : ''}`}
                            style={{ borderRight: `5px solid ${ing.color}` }}>
                            <input type="checkbox"
                                name={'ingOpt' + ing.name}
                                id={'ingOpt' + ing.name}
                                defaultChecked={currentPlate[type].includes(ing.name)}
                                onClick={() => handleSelect(ing)} />

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
                <button className='button' onClick={() => openList(false)}>volver</button>
                <button className='button button-sec' onClick={clearList}>quitar todo</button>
            </div>
        </div>
    )
}

export default IngredientList