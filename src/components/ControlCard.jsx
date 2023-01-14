import React from 'react'
import { BiChevronDown, BiFlag } from 'react-icons/bi'

export const ControlCard = ({ data, showDate = true, showOpen = true, open = false, setOpen = false }) => {
    const {
        weight,
        muscle,
        fat,
        abdominal,
        body_age,
        date
    } = data

    return (
        <div className={`history-card-section card-style3 ${open ? 'cpOpen' : ''}`}
            onClick={() => setOpen(!open)}>
            <span className='history-card-control-head'>
                <p><BiFlag className='icon i-margin-r i-blue' /> Control {showDate && date}</p>
                {showOpen && <BiChevronDown className={`icon i-grey ${open ? 'i-arrow-close' : ''}`} />}
            </span>

            <div>
                <p>Peso:</p><p>{weight} Kg.</p>
            </div>
            <div>
                <p>IMC:</p><p>--</p>
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
