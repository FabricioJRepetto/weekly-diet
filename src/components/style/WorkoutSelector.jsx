import React, { useState } from 'react'
import axios from 'axios'
import { defineWeek } from '../helpers/defineWeek'
import { usePlate } from '../../plate-context'
import {
    BiDumbbell,
    BiBasketball,
    BiCycling,
    BiTimer,
    BiRun,
    BiLandscape,
    BiFootball,
    BiSwim
} from 'react-icons/bi'



export const WorkoutSelector = ({ data, close, back, loading, edit }) => {
    const { dispatch } = usePlate()
    const [selected, setSelected] = useState(edit?.data || [])
    const iconset = {
        'Gimnasio': <BiDumbbell className='i-large' />,
        'Basquet': <BiBasketball className='i-large' />,
        'Bicicleta': <BiCycling className='i-large' />,
        'Cardio': <BiTimer className='i-large' />,
        'Correr': <BiRun className='i-large' />,
        'Escalada': <BiLandscape className='i-large' />,
        'Fútbol': <BiFootball className='i-large' />,
        'Natación': <BiSwim className='i-large' />
    }

    const selectHandle = (name) => {
        setSelected(current => {
            if (current.includes(name)) {
                return current.filter(e => e !== name)
            } else {
                return [...current, name]
            }
        })
    }

    const save = async () => {
        loading(true)
        let aux = {
            isExtra: true,
            meal: {
                mealType: 'workOut',
                data: selected,
                date: edit ? edit.date : new Date().toLocaleDateString('en')
            }
        }
        const {
            today,
            start
        } = defineWeek()
        const { data } = await axios.post(`/history/v2?today=${today}&start=${start}`, aux)
        // console.log(data);
        if (!data.error) {
            dispatch({ type: 'save', payload: data })
        }
        loading(false)
        close()
    }

    return (
        <>
            <div className='r-t-modal-grid register-workout'>{
                data.map(e => (
                    <div key={e.name}
                        onClick={() => selectHandle(e.name)}
                        className={`workout-opt ${selected.includes(e.name) ? 'selected-workout' : ''}`}>
                        {iconset[e.name]}
                        <p>{e.name}</p>
                    </div>
                ))}
                <button className='button' onClick={save}>guardar</button>
                <button className='button sec' onClick={() => edit ? close() : back()}>{edit ? 'cancelar' : 'volver'}</button>
            </div>
        </>
    )
}
