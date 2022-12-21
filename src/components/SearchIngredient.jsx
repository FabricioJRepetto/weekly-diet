import React, { useState } from 'react'
import group from '../constants'

import './style/SearchIngredient.css'

const SearchIngredient = ({ changeList }) => {
    const { everything } = group
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

    return (
        <div className={deployed ? 'search-container' : ''}>
            <>
                <input type="text"
                    id={'search-ingredient-bar'}
                    placeholder='Buscar por nombre'
                    onFocus={deploy}
                    onChange={(e) => find(e.target.value)} />
                {deployed && <button onClick={close}>X</button>}
            </>

            {deployed && <div className='search-results'>{
                filtered.map(e =>
                    <p key={e.name}>{e.name}</p>
                )
            }</div>}
        </div>
    )
}

export default SearchIngredient