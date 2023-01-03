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

    const correctList = (list) => {
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
        return aux
    }

    const handleSelect = ({ name, list, mix = false, lists = false }) => {
        let aux = correctList(list)

        if (aux.includes(name)) { //? retirar de la lista
            aux = aux.filter(e => e !== name)

            if (mix) {
                lists.forEach(l => {
                    let aux = correctList(l)
                    aux = aux.filter(e => e !== `(${name})`)
                    dispatch({ type: l, payload: aux })
                })
            }

            if (group.vegC.map(e => e.name).includes(name))
                dispatch({
                    type: 'vegC',
                    payload: false
                })
        } else { //? agregar a la lista
            aux.push(name)

            if (mix) {
                lists.forEach(l => {
                    let aux = correctList(l)
                    aux.unshift(`(${name})`)
                    dispatch({ type: l, payload: aux })
                })
            }

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
        let aux = []
        if (list !== 'foods') {
            //? si quiero borrar una lista donde hay "foods"
            currentPlate[list].forEach(e => {
                if (/^\(/.test(e)) {
                    aux.push(e)
                } else {
                    let ele = document.getElementById('ingOpt' + e)
                    ele.checked = false
                }
            });
        } else {
            //? si quiero borrar "foods" de todos lados
            currentPlate[list].forEach(e => {
                let ele = document.getElementById('ingOpt' + e)
                ele.checked = false
            });
            Object.entries(currentPlate).forEach(e => {
                if (Array.isArray(e[1])) {
                    let aux = e[1].filter(ing => !/^\(/.test(ing))
                    dispatch({
                        type: e[0],
                        payload: aux
                    })
                }
            })
        }
        dispatch({
            type: list,
            payload: aux
        })
        openList(false)
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
                                <p>{ing.name}</p>
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