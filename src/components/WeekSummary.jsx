import React, { useState } from 'react'
import { usePlate } from '../plate-context'
import LastMeal from './LastMeal'
import axios from 'axios'
import { Counter } from './Counter'
import Modal from "./helpers/Modal";
import { useModal } from "./helpers/useModal";
import { defineWeek } from './helpers/defineWeek'
import { Spinner } from './Spinner'
import { useNavigate } from 'react-router-dom'
import { DayCard } from './DayCard'

import { FaHamburger } from "react-icons/fa";
import { BiDumbbell } from 'react-icons/bi'


import './style/Week.css'

const WeekSummary = () => {
    const navigate = useNavigate()
    const {
        dispatch,
        state: { week }
    } = usePlate()
    console.log(week);
    const [isOpenDelete, openDelete, closeDelete, prop] = useModal();
    const [isOpenMenu, openMenu, closeMenu] = useModal();
    const [loading, setLoading] = useState(false)

    const deleteConfirmed = async () => {
        setLoading(() => true)
        const {
            today,
            start
        } = defineWeek()
        const { data } = await axios.delete(`/history/v2?today=${today}&start=${start}&day_id=${prop._id}&mealType=${prop.mealType}`)
        // console.log(data);
        if (!data.error) {
            dispatch({ type: 'save', payload: data })
        }
        closeDelete()
    }

    const disabledButton = (arg) => {
        if (!week.today) return false
        const aux = week.today.mealsRegistered.includes(arg)
        return aux
    }

    return (
        <>
            {!!Object.values(week).length &&
                <div className='weeksummary-container fade-in'>
                    <div className='your-week card-style'>
                        <b>Tu semana:</b>
                        <div>Actividades: {<Counter num={week.workOuts} max={7} />}</div>
                        <div>Vegetales C: {<Counter num={week.vegetalC} max={4} />}</div>
                        <div>Permitidos: {<Counter num={week.cheatFoods} max={5} />}</div>
                    </div>

                    {!!week?.days.length && (!week.today?.lunch.empty && week.today?.dinner.empty) && <LastMeal />}

                    <button className='ingredients-cell add-ing'
                        disabled={week?.today?.length > 1}
                        onClick={openMenu}>
                        Agregar registro
                    </button>

                    <section className='week-container'>
                        {week?.days && week.days.map(day => (
                            !day.empty && <DayCard key={day._id} data={day}
                                openDelete={openDelete} />
                        ))}
                    </section>

                    <Modal isOpen={isOpenDelete} closeModal={closeDelete}>
                        <div className='card-deletemenu'>
                            {loading
                                ? <Spinner />
                                : <>
                                    <p>¿Seguro que deseas eliminar este plato?</p>
                                    <div>
                                        <button className='button' onClick={() => deleteConfirmed()}>eliminar</button>
                                        <button className='button sec' onClick={closeDelete}>cancelar</button>
                                    </div>
                                </>}
                        </div>
                    </Modal>

                    <Modal isOpen={isOpenMenu} closeModal={closeMenu}>
                        <div className='register-type-modal'>
                            <div>
                                <button
                                    disabled={
                                        disabledButton('breakfast')
                                    }
                                    className='button' onClick={() => navigate('/mealMenu?mealType=breakfast')}>Desayuno</button>
                                <button
                                    disabled={
                                        disabledButton('afternoonsnack')
                                    }
                                    className='button' onClick={() => navigate('/mealMenu?mealType=afternoonsnack')}>Merienda</button>
                                <button
                                    disabled={
                                        disabledButton('lunch')
                                    }
                                    className='button' onClick={() => navigate('/mealMenu?mealType=lunch')}>Almuerzo</button>
                                <button
                                    disabled={
                                        disabledButton('dinner')
                                    }
                                    className='button' onClick={() => navigate('/mealMenu?mealType=dinner')}>Cena</button>
                            </div>

                            <div>
                                <button className='button sec'><BiDumbbell className='icon i-margin-r i-margin-t i-blue' />Actividad</button>
                                <button className='button sec'><FaHamburger className='i-margin-t i-margin-r i-red' />Permitido</button>
                            </div>
                        </div>
                    </Modal>
                </div>}
        </>
    )
}

export default WeekSummary