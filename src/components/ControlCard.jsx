import React, { useRef } from 'react'
import { BiChevronDown, BiFlag } from 'react-icons/bi'
import { usePlate } from '../plate-context'

export const ControlCard = ({ data, showDate = true, showOpen = true, open = false, setOpen = false }) => {
    const {
        weight,
        muscle,
        fat,
        abdominal,
        body_age,
        date
    } = data
    const { state: { config: { height } } } = usePlate()
    const dateStr = useRef(new Date(date).toLocaleDateString("es-AR", { year: 'numeric', month: 'long', day: 'numeric' }))

    //? calculo de IMC: peso / (altura^2)

    return (
        <div className={`history-card-section card-style3 ${open ? 'cpOpen' : ''}`}
            onClick={() => setOpen(!open)}>
            <span className='history-card-control-head'>
                <p><BiFlag className='icon i-margin-r i-blue' />{showDate ? dateStr.current : 'Control'}</p>
                {showOpen && <BiChevronDown className={`icon i-grey ${open ? 'i-arrow-close' : ''}`} />}
            </span>

            <div>
                <p>Peso:</p><p>{weight} Kg.</p>
            </div>
            <div>
                <p>IMC:</p><p>{height ? (weight / Math.pow(height / 100, 2)).toFixed(1) : '---'}</p>
            </div>
            <div className='divisor-inv'></div>
            {muscle && <div>
                <p>Musculatura:</p><p>{muscle}%</p>
            </div>}
            {fat && <div>
                <p>Grasa corporal:</p><p>{fat}%</p>
            </div>}
            {abdominal && <div>
                <p>Grasa visceral:</p><p>{abdominal}</p>
            </div>}
            {body_age && <div>
                <p>Edad corporal:</p><p>{body_age} años</p>
            </div>}
        </div>
    )
}
