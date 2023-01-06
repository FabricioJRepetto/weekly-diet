import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { usePlate } from '../plate-context';
import Loading from './Loading';
import { Spinner } from './Spinner';
import { BiX } from 'react-icons/bi';

import './style/CreateFood.css'

const CreateFood = ({ close, setData = false, edit = false }) => {
    const { dispatch, state: { group } } = usePlate()
    const {
        everything
    } = group
    const [loading, setLoading] = useState(false)
    const [filtered, setFiltered] = useState([])
    const [customFood, setCustomFood] = useState(edit.name || '')
    const [selected, setSelected] = useState(edit.ingredients || [])
    const [error1, setError1] = useState('')
    const [error2, setError2] = useState('')

    useEffect(() => {
        if (customFood && error1) setError1(() => '')
        if (selected.length > 1 && error2) setError2(() => '')
        // eslint-disable-next-line
    }, [customFood, selected])


    const saveFood = async () => {
        if (!customFood) {
            setError1(() => 'Introduce un nombre')
        } if (selected.length < 2) {
            setError2(() => 'Selecciona por lo menos 2 ingredientes')
        }
        if (!customFood || selected.length < 2) return

        let flag = group.foods.filter(e => e.name === customFood)

        if (!!flag.length) {
            setError1(() => 'Nombre ya utilizado')
            return
        }

        setLoading(true)
        let setOfTypes = new Set(selected.map(e => e.list)),
            food = {
                name: customFood,
                mix: true,
                list: 'foods',
                lists: Array.from(setOfTypes),
                ingredients: selected
            },
            leData = null

        if (edit) {
            const { data } = await axios.put(`/foods`, { food, food_id: edit._id })
            leData = data
        } else {
            const { data } = await axios.post(`/foods`, { food })
            leData = data
        }

        if (!leData.error) {
            dispatch({
                type: 'saveFoods',
                payload: leData.allFoods
            })
            setData && setData(leData.foods)
        }
        close()
    }

    const find = (query) => {
        if (query) {
            let re = new RegExp(query, 'gi'),
                aux = everything.filter(e => re.test(e.name))
            setFiltered(() => aux)
        } else {
            setFiltered(() => [])
        }
    }

    const addIng = (ing) => {
        setSelected(current => {
            let aux = [...current],
                flag = aux.map(e => e.name).includes(ing.name)

            if (flag) return aux.filter(e => e.name !== ing.name)
            else {
                document.getElementById('search-input').value = ''
                setFiltered(() => [])
                return [...aux, ing]
            }
        })
    }

    return (
        <div className="create-food-outer-container">
            {loading
                ? <>
                    <Spinner />
                    <>Guardando<Loading /></>
                </>
                : <div className='create-food-container'>
                    <input type="text" placeholder='Nombre'
                        value={customFood}
                        onChange={e => setCustomFood(e.target.value)} />
                    <b>{error1 || ' '}</b>

                    <div className='create-food-ingredients'>
                        <input type="text"
                            id={'search-input'}
                            placeholder='Agregar ingrediente'
                            autoComplete='off'
                            onChange={(e) => find(e.target.value)} />
                        <b>{error2 || ' '}</b>

                        <div className='create-food-ing-container'>
                            {!!selected.length &&
                                selected.map(e =>
                                    <div key={e.name}
                                        onClick={() => addIng(e)}
                                        className='create-food-ing'>
                                        {e.name}
                                        <BiX className='icon' />
                                    </div>
                                )}
                        </div>

                        {filtered.length > 0 && <div className='search-results-mini ingList'>{
                            filtered.map((e, i) =>
                                <div key={e.name + i}
                                    onClick={() => addIng(e)}>{e.name}</div>
                            )
                        }</div>}
                    </div>

                    <button className='button' onClick={saveFood}>guardar</button>
                    <button className='button button-sec' onClick={close}>volver</button>
                </div>}
        </div>
    )
}

export default CreateFood