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
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        weekDays,
        vegetalC,
        cheatFood,
        workOut,
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

        weekDays.forEach(day => {
            if (day) {
                if (day.length === 2) {
                    avrg++
                }
            } else missing++
        })
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
                    {monday
                        ? <>{
                            monday.length > 1
                                ? !monday[2]
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <p>·</p>}
                </div>

                <div>M
                    {tuesday
                        ? <>{
                            tuesday.length > 1
                                ? !tuesday[2]
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <p>·</p>}
                </div>

                <div>X
                    {wednesday
                        ? <>{
                            wednesday.length > 1
                                ? !wednesday[2]
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <p>·</p>}
                </div>

                <div>J
                    {thursday
                        ? <>{
                            thursday.length > 1
                                ? !thursday[2]
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <p>·</p>}
                </div>

                <div>V
                    {friday
                        ? <>{
                            friday.length > 1
                                ? !friday[2]
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <p>·</p>}
                </div>

                <div>S
                    {saturday
                        ? <>{
                            saturday.length > 1
                                ? !saturday[2]
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <p>·</p>}
                </div>

                <div>D
                    {sunday
                        ? <>{
                            sunday.length > 1
                                ? !sunday[2]
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
                                <b><FaHamburger className='i-margin-t i-margin-r i-red' /> {cheatFood || 0}</b>
                                <p>permitidos</p>
                            </span>
                            <span>
                                <b><BiDumbbell className=' i-medium i-margin-r i-blue' /> {workOut || 0}</b>
                                <p>actividad</p>
                            </span>
                        </div>
                        {weekDays.map(day => (
                            day &&
                            <div className='scaledown' key={day[0].date}>
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
