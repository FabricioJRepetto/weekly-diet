import React, { useEffect, useState } from 'react'
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
import Loading from './Loading'
import { FaHamburger } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { BiDumbbell } from 'react-icons/bi'
import { WorkoutSelector } from './style/WorkoutSelector'

import './style/Week.css'

const WeekSummary = () => {
    const navigate = useNavigate()
    const {
        dispatch,
        state: { week, group: { workouts }, config: { tutorials } }
    } = usePlate()
    // console.log(week);
    const [isOpenDelete, openDelete, closeDelete, prop] = useModal();
    const [isOpenMenu, openMenu, closeMenu, menuProp] = useModal();
    const [workout, setWorkout] = useState(false)
    const [loading, setLoading] = useState(false)


    //????????????????????????????????????? convertir en hook
    useEffect(() => {
        if (tutorials && tutorials.activated && tutorials.mainMenu) {
            (async () => {
                const { data } = await axios.put('/user/config', { tutorial: 'mainMenu' })
                if (!data.error) {
                    dispatch({ type: 'userConfig', payload: data.config })
                } else console.console.warn(data);
            })()
            dispatch({ type: 'openTuto', payload: 'mainMenu' })
        }
        // eslint-disable-next-line
    }, [tutorials])

    const tutotest = () => {
        dispatch({ type: 'openTuto', payload: 'creationMenu' })
    }

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
        setLoading(() => false)
    }

    const disabledButton = (arg) => {
        if (!week.today) return false
        const aux = week.today.mealsRegistered.includes(arg)
        return aux
    }

    const editWorkOut = (date, workouts) => {
        setWorkout(() => true)
        openMenu({ date, data: workouts })
    }

    return (
        <>
            {!!Object.values(week).length &&
                <div className='weeksummary-container fade-in'>
                    <button onClick={tutotest}> open tuto </button>
                    <div className='your-week card-style'>
                        <b>Tu semana:</b>
                        <div>Actividades: {<Counter num={week.workOuts} max={7} iconstyle='workout' />}</div>
                        <div>Vegetales C: {<Counter num={week.vegetalC} max={4} iconstyle='vegC' />}</div>
                        <div>Permitidos: {<Counter num={week.cheatFoods} max={5} iconstyle='cheat' />}</div>
                    </div>

                    {week.today && (!week.today?.lunch.empty && week.today?.dinner.empty) && <LastMeal />}

                    <button className='ingredients-cell add-ing'
                        disabled={week?.today?.length > 1}
                        onClick={() => openMenu(
                            {
                                date: new Date().toLocaleDateString('en'),
                                data: week.today?.workOut
                            }
                        )}>
                        <p><IoAddCircleSharp className='i-medium i-margin-r i-margin-t i-black' />
                            Agregar registro</p>
                    </button>

                    <section className='week-container'>
                        {week?.days && week.days.map(day => (
                            !day.empty &&
                            <DayCard key={day._id} data={day}
                                openDelete={openDelete}
                                menu={new Date(day.date).getTime() === new Date().getTime()}
                                editWorkOut={editWorkOut} />
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

                    <Modal isOpen={isOpenMenu}
                        closeModal={() => {
                            closeMenu()
                            setWorkout(() => false)
                        }}>
                        <div className='register-type-modal'>
                            {loading &&
                                <div className='loading-modal'>
                                    <Spinner />
                                    <h2>guardando<Loading /></h2>
                                </div>}

                            {!workout
                                ? <>
                                    <div className='r-t-modal-grid'>
                                        <button disabled={disabledButton('breakfast')}
                                            className='button' onClick={() => navigate('/breakfastMenu?mealType=breakfast')}>Desayuno</button>
                                        <button disabled={disabledButton('afternoonsnack')}
                                            className='button' onClick={() => navigate('/breakfastMenu?mealType=afternoonsnack')}>Merienda</button>
                                        <button disabled={disabledButton('lunch')}
                                            className='button' onClick={() => navigate('/mealMenu?mealType=lunch')}>Almuerzo</button>
                                        <button disabled={disabledButton('dinner')}
                                            className='button' onClick={() => navigate('/mealMenu?mealType=dinner')}>Cena</button>
                                    </div>

                                    <div className='r-t-modal-grid r-t-modal-extras'>
                                        <button onClick={() => setWorkout(true)}
                                            className='button sec'>
                                            <BiDumbbell className='icon i-margin-r i-margin-t i-blue' />
                                            Actividad
                                        </button>

                                        <button className='button sec' disabled>
                                            <FaHamburger className='i-margin-t i-margin-r i-red' />
                                            Permitido
                                        </button>
                                    </div>
                                </>
                                : <WorkoutSelector data={workouts}
                                    edit={menuProp}
                                    loading={setLoading}
                                    back={() => setWorkout(() => false)}
                                    close={() => {
                                        closeMenu()
                                        setWorkout(() => false)
                                    }} />
                            }
                        </div>
                    </Modal>
                </div>}
        </>
    )
}

export default WeekSummary