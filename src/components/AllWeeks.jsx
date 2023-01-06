import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner } from './Spinner'
import { HistoryCard } from './HistoryCard'

const AllWeeks = () => {
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const { data } = await axios(`/history/allweeks`)
            console.log(data);
            if (!data.error) setData(() => data)
            setLoading(false)
        })()
    }, [])

    return (
        <div>
            <h2>
                Historial
            </h2>
            {loading
                ? <Spinner />
                : <div>
                    {!!data.response.length && data.response.map(e => (
                        <HistoryCard data={e} key={e.dates.start} />
                    ))}
                </div>
            }
        </div>
    )
}

export default AllWeeks