import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DayCard } from './DayCard'
import { defineWeek } from './helpers/defineWeek'

const Test = () => {
    const [data, setData] = useState(false)

    useEffect(() => {
        (async () => {
            const {
                today,
                start
            } = defineWeek()
            const { data } = await axios(`/history/fullhistory/v2?today=${today}&start=${start}`)
            console.log(data);
            console.table(data.week);
            if (!data.error) {
                setData(() => data)
            }
        })()
    }, [])

    const openDelete = (e) => {
        console.log('holaquetalco');
    }

    return (
        <div>
            {/* {data &&
                <>{
                    data.map(e => (
                        <DayCard data={e}
                            openDelete={openDelete} />
                    ))
                }</>
            } */}
        </div>
    )
}

export default Test