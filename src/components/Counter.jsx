import React, { useRef } from 'react'
import { BiCheckSquare, BiCheckbox } from 'react-icons/bi';

export const Counter = ({ num, max }) => {
    const blueprint = useRef('t'.repeat(num) + 'f'.repeat(max - num))

    return (
        <>{blueprint.current.split('').map((c, i) => (
            (c === 't')
                ? <BiCheckSquare key={new Date().getTime() + i} />
                : <BiCheckbox key={new Date().getTime() + i} />
        ))}</>
    )
}
