import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner } from './Spinner'
import { HistoryCard } from './HistoryCard'

import './style/AllWeeks.css'

const AllWeeks = () => {
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const { data } = await axios(`/history/allweeks`)
            if (!data.error) setData(() => data)
            setLoading(false)
        })()
    }, [])

    return (
        <div>
            <h2>Historial</h2>
            {loading
                ? <Spinner />
                : <div className='weeks-container fade-in'>
                    {!!data.response.length &&
                        data.response.map((e, i) => (
                            <HistoryCard data={e} key={Date.now() + i} />
                        ))}
                </div>
            }
        </div>
    )
}

export default AllWeeks