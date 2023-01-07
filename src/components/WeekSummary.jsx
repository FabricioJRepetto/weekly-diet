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

import './style/Week.css'
import { DayCard } from './DayCard'

const WeekSummary = () => {
    const navigate = useNavigate()
    const {
        dispatch,
        state: { week }
    } = usePlate()
    const [isOpenDelete, openDelete, closeDelete, prop] = useModal();
    const [loading, setLoading] = useState(false)

    const deleteConfirmed = async () => {
        setLoading(() => true)
        const {
            today,
            start
        } = defineWeek()
        const { data } = await axios.delete(`/history?today=${today}&start=${start}&meal_id=${prop}`)
        if (!data.error) {
            dispatch({ type: 'save', payload: data })
        }
        closeDelete()
    }

    return (
        <div className='weeksummary-container fade-in'>

            {week.vegetalC && <div className='your-week card-style'>
                <b>Tu semana:</b>
                <div>Permitidos: {<Counter num={0} max={5} />}</div>
                <div>Vegetales C: {<Counter num={week.vegetalC} max={4} />}</div>
            </div>}

            {week.today?.length === 1 && <LastMeal />}

            <button className='ingredients-cell add-ing'
                disabled={week?.today?.length > 1}
                onClick={() => navigate('/mealMenu')}
            >
                Agregar comida +
            </button>

            <section className='week-container'>
                {week.monday &&
                    <DayCard data={week.monday}
                        openDelete={openDelete} />}
                {week.tuesday &&
                    <DayCard data={week.tuesday}
                        openDelete={openDelete} />}
                {week.wednesday &&
                    <DayCard data={week.wednesday}
                        openDelete={openDelete} />}
                {week.thursday &&
                    <DayCard data={week.thursday}
                        openDelete={openDelete} />}
                {week.friday &&
                    <DayCard data={week.friday}
                        openDelete={openDelete} />}
                {week.saturday &&
                    <DayCard data={week.saturday}
                        openDelete={openDelete} />}
                {week.sunday &&
                    <DayCard data={week.sunday}
                        openDelete={openDelete} />}
            </section>

            <Modal isOpen={isOpenDelete} closeModal={closeDelete}>
                <div className='card-deletemenu'>
                    {loading
                        ? <Spinner />
                        : <>
                            <p>¿Seguro que deseas eliminar este plato?</p>
                            <div>
                                <button className='button' onClick={() => deleteConfirmed()}>eliminar</button>
                                <button className='button button-sec' onClick={closeDelete}>cancelar</button>
                            </div>
                        </>}
                </div>
            </Modal>
        </div>
    )
}

export default WeekSummary