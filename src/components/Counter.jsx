import React, { Fragment, useRef } from 'react'
import { BiErrorCircle, BiCheckCircle, BiCircle, BiXCircle } from 'react-icons/bi';

export const Counter = ({ num = 0, max, iconstyle = 'workout' }) => {
    const icon = {
        'workout': <BiCheckCircle className='i-small i-blue' />,
        'vegC': <BiErrorCircle className='i-small i-orange' />,
        'cheat': <BiXCircle className='i-small i-red' />
    }
    const f = num > max ? num : max - num
    const blueprint = useRef('t'.repeat(num) + 'f'.repeat(f))

    return (
        <span className='counter-container fade-in'>{blueprint.current.split('').map((c, i) => (
            (c === 't')
                ? <Fragment key={new Date().getTime() + i}>
                    {icon[iconstyle]}
                </Fragment>
                : <BiCircle key={new Date().getTime() + i} className='i-small i-grey' />
        ))}</span>
    )
}
