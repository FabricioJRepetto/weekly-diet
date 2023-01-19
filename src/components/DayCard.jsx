import React, { useEffect, useRef, useState } from 'react'
import { MealCard } from './MealCard'
import { BiDumbbell } from 'react-icons/bi';
import { FaHamburger } from "react-icons/fa";
import { TiThumbsDown, TiThumbsUp } from "react-icons/ti";
import { ExtrasCard } from './ExtrasCard';
import { usePlate } from '../plate-context';
import { useNavigate } from 'react-router-dom';

import './style/DayCard.css'

export const DayCard = ({ data, openDelete, editWorkOut, menu = true, demo }) => {
    const [show, setShow] = useState(false)
    const [section, setSection] = useState(false)
    const xpos = useRef(false)
    const xmove = useRef(false)
    const demoRef = useRef(false)
    const [demoCardTouch, setDemoCardTouch] = useState(false)
    const day = useRef(new Date(data.date).toLocaleDateString("es-AR", { weekday: "long" }))

    const { dispatch } = usePlate()
    const navigate = useNavigate()

    // console.log(data)
    const {
        lunch,
        dinner,
        breakfast,
        afternoonsnack,
        balanced,
        workOut,
        cheatFood,
        date,
        _id
    } = data

    useEffect(() => {
        if (demo) {
            const demoplay = () => {
                setTimeout(() => {
                    setShow('dinner')
                    setDemoCardTouch(true)
                }, 1000);
                setTimeout(() => {
                    setShow(false)
                    setDemoCardTouch(false)
                }, 4000);
                setTimeout(() => {
                    setSection(true)
                }, 6000);
                setTimeout(() => {
                    setSection(false)
                }, 9000);
            }
            demoplay()
            demoRef.current = setInterval(demoplay, 10000);
        }
        return () => {
            console.log('clear interval');
            clearInterval(demoRef.current)
        }
        // eslint-disable-next-line
    }, [])


    const toogleShow = (n) => {
        if (xmove.current < 75) {
            xmove.current = 0
            setShow(current => {
                if (current === n) return false
                else return n
            })
            return true
        }
        xmove.current = 0
        return false
    }

    const handleDown = (X) => xpos.current = X

    const handleUp = (X) => {
        const result = xpos.current - X,
            threshold = 75
        xmove.current = result

        if (!section && result >= threshold) {
            setSection(() => true)
        }
        if (section && result <= -threshold) {
            setSection(() => false)
        }
        xpos.current = false
    }

    const edit = (e, mealType) => {
        e.stopPropagation()
        dispatch({
            type: 'edit',
            payload: {
                edit: {
                    day_id: _id,
                    date,
                    mealType
                },
                protein: [],
                foods: [],
                carbohydrate: [],
                vegetal: [],
                fruit: [],
                vegetalC: false
            }
        })
        navigate('/mealMenu')
    }

    return (
        <div className={`daycard-outer-container card-style ${(!lunch.empty && !dinner.empty) &&
            (balanced
                ? 'card-style-good'
                : 'card-style-bad')}`}
            onMouseDown={(e) => handleDown(e.clientX)}
            onMouseUp={(e) => handleUp(e.clientX)}
            onTouchStart={(e) => handleDown(e.changedTouches[0].clientX)}
            onTouchEnd={(e) => handleUp(e.changedTouches[0].clientX)}>

            <b onClick={() => setSection(() => !section)}>
                {day.current}
                {(!lunch.empty && !dinner.empty) &&
                    (balanced
                        ? <TiThumbsUp className='icon i-margin-l i-green' />
                        : <TiThumbsDown className='icon i-margin-l i-red' />)}
            </b>

            <div className={`daycard-sections-container ${section ? 'section-two' : ''}`}>
                <div className="daycard-inner-container">
                    {!lunch.empty
                        ? <MealCard i={0} key={_id + 'lunch'}
                            data={{ ...lunch, _id }}
                            extraData={{ _id, date, mealType: 'lunch' }}
                            menu={menu}
                            openDelete={openDelete}
                            setShow={() => toogleShow('lunch')}
                            showing={!show || show === 'lunch'} />
                        : <div className={`daycard-missing-meal ${show ? 'dc-mm-off' : ''}`}>
                            <p onClick={(e) => menu ? edit(e, 'lunch') : undefined}>
                                Almuerzo no registrado, click para agregar
                            </p>
                        </div>}
                    {!dinner.empty
                        ? <MealCard i={1} key={_id + 'dinner'}
                            data={dinner}
                            extraData={{ _id, date, mealType: 'dinner' }}
                            menu={menu} demo={demoCardTouch}
                            openDelete={openDelete}
                            setShow={() => toogleShow('dinner')}
                            showing={!show || show === 'dinner'} />
                        : <div className={`daycard-missing-meal ${show ? 'dc-mm-off' : ''}`}>
                            <p onClick={(e) => menu ? edit(e, 'dinner') : undefined}>
                                Cena no registrada, click para agregar
                            </p>
                        </div>}
                </div>

                <div className="daycard-inner-container extras-card">
                    <ExtrasCard data={breakfast}
                        menu={menu}
                        extraData={{ _id, date, mealType: 'breakfast' }}
                        openDelete={openDelete} />

                    <ExtrasCard data={afternoonsnack}
                        menu={menu}
                        extraData={{ _id, date, mealType: 'afternoonsnack' }}
                        openDelete={openDelete} />

                    <div className='extras-card-extras'>
                        {!!workOut.length &&
                            <div className='card-style3'
                                onClick={() => menu ? editWorkOut(date, workOut) : undefined}>
                                <BiDumbbell className='i-medium i-margin-t i-margin-r i-blue' />
                                <b>Actividad: </b> {workOut.join(', ')}
                            </div>}

                        {!!cheatFood.length && <p>
                            <FaHamburger />
                            <b>Permitido: </b> {cheatFood.join(', ')}
                        </p>}
                    </div>
                </div>
            </div>

            <div className='daycard-section-indicator'>
                <div className={section ? 'indicator-off' : 'indicator-on'}></div>
                <div className={section ? 'indicator-on' : 'indicator-off'}></div>
            </div>
        </div>
    )
}
