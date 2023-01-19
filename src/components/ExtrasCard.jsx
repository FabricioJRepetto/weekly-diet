import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { usePlate } from '../plate-context';
import { BiDotsVerticalRounded } from 'react-icons/bi';

export const ExtrasCard = ({ data, extraData, openDelete, menu }) => {
    const { dispatch } = usePlate()
    const {
        foods,
        breakfast,
        fruit,
        empty
    } = data
    const {
        _id,
        date,
        mealType
    } = extraData
    const navigate = useNavigate()
    const [options, setOptions] = useState(false)

    const edit = (e) => {
        e.stopPropagation()
        dispatch({
            type: 'edit',
            payload: {
                edit: {
                    day_id: _id,
                    date,
                    mealType
                },
                foods,
                breakfast,
                fruit,
            }
        })
        navigate('/breakfastMenu')
    }

    const deleteHandler = () => {
        openDelete({ _id, mealType })
    }

    return (
        <div className='extras-meal-card'>
            <b>{mealType === 'breakfast' ? 'Desayuno' : 'Merienda'}</b>

            {!empty
                ? <>
                    {menu && <BiDotsVerticalRounded className='icon i-margin-t menu-dots'
                        onClick={() => setOptions(!options)} />}

                    {options && <div className='extras-options'>
                        <p onClick={edit}>editar</p>
                        <p onClick={deleteHandler}>eliminar</p>
                    </div>}

                    <p>{foods.concat(breakfast, fruit).filter(e => !/\(/g.test(e)).join(', ')}</p>
                </>
                : <p style={{ color: 'grey' }}> sin registro</p>
            }
        </div>
    )
}
