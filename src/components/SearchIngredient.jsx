import React, { useState } from 'react'
import group from '../constants'
import { usePlate } from '../plate-context'

import './style/SearchIngredient.css'

const SearchIngredient = ({ changeList }) => {
    const {
        vegC,
        everything
    } = group
    const [filtered, setFiltered] = useState(everything)
    const [deployed, setDeployed] = useState(false)

    const {
        dispatch,
        state,
        state: {
            protein,
            carbohydrate,
            vegetal
        }
    } = usePlate()

    const find = (query) => {
        if (query) {
            let re = new RegExp(query, 'gi'),
                aux = everything.filter(e => re.test(e.name))
            setFiltered(() => aux)
        } else {
            setFiltered(() => everything)
        }
    }

    const deploy = () => {
        changeList(() => 'search')
        setDeployed(() => true)
    }

    const close = () => {
        document.getElementById('search-ingredient-bar').value = ''
        changeList(() => false)
        setDeployed(() => false)
        setFiltered(() => everything)
    }

    const handleSelect = (ing, list) => {
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
            if (vegC.map(e => e.name).includes(ing))
                dispatch({
                    type: 'vegC',
                    payload: false
                })
        } else {
            aux.push(ing)
            if (vegC.map(e => e.name).includes(ing))
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

    return (
        <div className={deployed ? 'search-container' : ''}>
            <div className='search-input-container'>
                <input type="text"
                    id={'search-ingredient-bar'}
                    placeholder='Buscar por nombre'
                    onFocus={deploy}
                    onChange={(e) => find(e.target.value)} />
                {deployed ? <button onClick={close}>X</button> : <button onClick={deploy}>Q</button>}
            </div>

            {deployed && <div className='search-results ingList'>{
                filtered.map(e =>
                    <label key={e.name}
                        className='ingOpt-correction'
                        htmlFor={'ingOpt' + e.name}>
                        <div className={`ingOption ${state[e.list].includes(e.name) ? 'selectedOpt' : ''}`}
                            style={{ borderRight: `5px solid ${e.color}` }}>
                            <input type="checkbox"
                                name={'ingOpt' + e.name}
                                id={'ingOpt' + e.name}
                                defaultChecked={state[e.list].includes(e.name)}
                                onClick={() => handleSelect(e.name, e.list)} />

                            <div className='ingOption-text'>
                                <p>{e.name}</p>
                            </div>
                        </div>
                    </label>
                )
            }</div>}
        </div>
    )
}

export default SearchIngredient