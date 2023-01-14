import React, { useState, useRef, useEffect } from 'react'
import { BiCheckCircle, BiXCircle, BiHelpCircle, BiChevronDown, BiDumbbell, BiCheckSquare, BiCheckbox } from 'react-icons/bi'
import { IoLeafSharp } from "react-icons/io5";
import { FaHamburger, FaChartPie } from "react-icons/fa";
import { ControlCard } from './ControlCard';
import { RiSearchEyeLine } from "react-icons/ri";
import { DayCard } from './DayCard'

import './style/HistoryCard.css'

export const HistoryCard = ({ data, selectMode, select, selected }) => {
    const {
        dates: {
            start
        },
        // monday,
        // tuesday,
        // wednesday,
        // thursday,
        // friday,
        // saturday,
        // sunday,
        days,
        weekDays,
        vegetalC,
        cheatFoods,
        workOuts,
        checkpoint
    } = data

    const [cpOpen, setCpOpen] = useState(false),
        [allWeeksOpen, setAllWeeksOpen] = useState(false),
        // [selected, setSelected] = useState(false),
        average = useRef(null),
        dateString = useRef(new Date(start).toLocaleDateString("es-AR", { year: 'numeric', month: 'long', day: 'numeric' }))

    useEffect(() => {
        if (!average.current) average.current = averageGetter()
        // eslint-disable-next-line
    }, [])

    const averageGetter = () => {
        let avrg = 0,
            missing = 0;

        for (const key in weekDays) {
            if (Object.hasOwnProperty.call(weekDays, key)) {
                const day = weekDays[key];

                if (day) {
                    if (day.balanced) avrg++
                } else missing++
            }
        }
        return {
            success: Math.round(avrg / (7 - missing) * 100),
            missing
        }
    }

    return (
        <div className={`history-card-container card-style`}>

            {selectMode &&
                <div onClick={select}
                    className={`history-select-mode ${selected ? 'history-select-mode-on' : ''}`}>
                    <div>
                        {selected
                            ? <BiCheckSquare className='i-large i-blue' />
                            : <BiCheckbox className='i-large' />}
                    </div>
                </div>
            }

            <p className='card-date'>Semana: <b>{dateString.current}</b></p>

            <div className='history-card-days'>
                <div>L
                    {weekDays.monday
                        ? <>{
                            !weekDays.monday.lunch.empty && !weekDays.monday.lunch.empty
                                ? weekDays.monday.balanced
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <p>·</p>}
                </div>

                <div>M
                    {weekDays.tuesday
                        ? <>{
                            !weekDays.tuesday.lunch.empty && !weekDays.tuesday.lunch.empty
                                ? weekDays.tuesday.balanced
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <p>·</p>}
                </div>

                <div>X
                    {weekDays.wednesday
                        ? <>{
                            !weekDays.wednesday.lunch.empty && !weekDays.wednesday.lunch.empty
                                ? weekDays.wednesday.balanced
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <p>·</p>}
                </div>

                <div>J
                    {weekDays.thursday
                        ? <>{
                            !weekDays.thursday.lunch.empty && !weekDays.thursday.lunch.empty
                                ? weekDays.thursday.balanced
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <p>·</p>}
                </div>

                <div>V
                    {weekDays.friday
                        ? <>{
                            !weekDays.friday.lunch.empty && !weekDays.friday.lunch.empty
                                ? weekDays.friday.balanced
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <p>·</p>}
                </div>

                <div>S
                    {weekDays.saturday
                        ? <>{
                            !weekDays.saturday.lunch.empty && !weekDays.saturday.lunch.empty
                                ? weekDays.saturday.balanced
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <p>·</p>}
                </div>

                <div>D
                    {weekDays.sunday
                        ? <>{
                            !weekDays.sunday.lunch.empty && !weekDays.sunday.lunch.empty
                                ? weekDays.sunday.balanced
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <p>·</p>}
                </div>
            </div>

            <div className={`history-card-details-section ${allWeeksOpen ? 'allWeeksOpen' : ''}`}>
                <span className='history-card-details-head'
                    onClick={() => setAllWeeksOpen(!allWeeksOpen)}>
                    <p><RiSearchEyeLine className='icon i-margin-r ' /> Ver detalles</p>
                    <BiChevronDown className={`icon i-grey ${allWeeksOpen ? 'i-arrow-close' : ''}`} />
                </span>
                {allWeeksOpen &&
                    <>
                        <div className='history-success-rate'>
                            <FaChartPie className={`i-large i-margin-r ${average.current.success > 75 ? 'i-green' : average.current.success < 50 ? 'i-red' : ''}`} />
                            <div>
                                <b>{average.current.success || '0'}% éxito</b>
                                <p>{average.current.missing} días sin registro</p>
                            </div>
                        </div>
                        <div className="history-details-stats">
                            <span>
                                <b><IoLeafSharp className='i-margin-t i-margin-r i-orange' /> {vegetalC}</b>
                                <p>vegetales C</p>
                            </span>
                            <span>
                                <b><FaHamburger className='i-margin-t i-margin-r i-red' /> {cheatFoods || 0}</b>
                                <p>permitidos</p>
                            </span>
                            <span>
                                <b><BiDumbbell className=' i-medium i-margin-r i-blue' /> {workOuts || 0}</b>
                                <p>actividad</p>
                            </span>
                        </div>
                        {days.map(day => (
                            !day.empty &&
                            <div className='scaledown' key={day.date}>
                                <DayCard data={day}
                                    menu={false} />
                            </div>
                        ))}
                    </>
                }
            </div>

            {checkpoint &&
                <ControlCard data={checkpoint}
                    showDate={false}
                    open={cpOpen}
                    setOpen={setCpOpen} />
            }
        </div >
    )
}
