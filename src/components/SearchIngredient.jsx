import React, { useState } from 'react'
import { usePlate } from '../plate-context'
import { BiSearch, BiX } from 'react-icons/bi';

import './style/SearchIngredient.css'

const SearchIngredient = ({ changeList }) => {
    const {
        dispatch,
        state: {
            group: {
                vegC,
                everything
            },
            currentPlate,
            currentPlate: {
                protein,
                carbohydrate,
                vegetal
            }
        }
    } = usePlate()

    const [filtered, setFiltered] = useState(everything)
    const [deployed, setDeployed] = useState(false)


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
        // si el ingrediente ya está en el plato
        if (aux.includes(ing)) {
            aux = aux.filter(e => e !== ing)
        } else {
            // si el ingrediente NO está en el plato
            aux.push(ing)
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
                {deployed
                    ? <button className='icon-button' onClick={close}>
                        <BiX className='icon' />
                    </button>
                    : <button className='icon-button' onClick={deploy}>
                        <BiSearch className='icon' />
                    </button>}
            </div>

            {deployed &&
                <div className='search-results ingList'>{
                    filtered.map(e =>
                        <label key={e.name}
                            className='ingOpt-correction'
                            htmlFor={'ingOpt' + e.name}>
                            <div className={`ingOption ${currentPlate[e.list].includes(e.name) ? 'selectedOpt' : ''}`}
                                style={{ borderRight: `5px solid ${e.color}` }}>
                                <input type="checkbox"
                                    name={'ingOpt' + e.name}
                                    id={'ingOpt' + e.name}
                                    defaultChecked={currentPlate[e.list].includes(e.name)}
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