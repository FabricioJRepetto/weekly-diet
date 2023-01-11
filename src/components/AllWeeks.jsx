import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner } from './Spinner'
import { HistoryCard } from './HistoryCard'

import './style/AllWeeks.css'
import { PDFtest } from './PDFtest'

const AllWeeks = () => {
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)
    const [selectMode, setSelectMode] = useState(false)
    const [selected, setSelected] = useState([])
    const [payload, setPayload] = useState(false)
    const [preSave, setPreSave] = useState(false)

    useEffect(() => {
        (async () => {
            const { data } = await axios(`/history/allweeks`)
            if (!data.error) setData(() => data)
            setLoading(false)
        })()
    }, [])

    const selectHandle = (obj, id) => {
        // data = [{ weekDays }]
        console.log(obj, id);

        if (preSave[id]) {
            setSelected(pre => {
                let aux = [...pre]
                return aux.filter(e => e !== id)
            })
            setPreSave(pre => {
                let aux = { ...pre }
                delete aux[id]
                return aux
            })
        } else {
            setSelected(pre => {
                let aux = [...pre]
                aux.push(id)
                return aux
            })
            setPreSave(pre => {
                let aux = { ...pre }
                aux[id] = obj
                return aux
            })
        }
    }

    const createPayload = () => {
        let aux = Object.values(preSave)
        console.log(aux);
        setPayload(() => aux)
    }
    return (
        <div>
            <h2>Historial</h2>

            {!loading &&
                <>
                    {selectMode && <button onClick={createPayload} className='button'>Generar PDF</button>}
                    <button className={`button ${selectMode ? 'button-sec' : ''}`}
                        onClick={() => setSelectMode(!selectMode)}>
                        {selectMode ? 'cancelar' : 'Generar PDF'}
                    </button>
                </>
            }
            {selectMode && <p>Selecciona las semanas que deseas incluir</p>}
            {/* {payload && <PDFtest data={payload} />} */}

            {loading
                ? <Spinner />
                : <div className='weeks-container fade-in'>
                    {!!data.response.length &&
                        data.response.map((e, i) => (
                            <HistoryCard data={e} key={Date.now() + i}
                                selectMode={selectMode}
                                selected={selected.includes(e.dates.start)}
                                select={() => selectHandle({ weekDays: e.weekDays }, e.dates.start)} />
                        ))}
                </div>
            }
        </div>
    )
}

export default AllWeeks