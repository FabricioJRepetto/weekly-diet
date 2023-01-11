import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner } from './Spinner'
import { HistoryCard } from './HistoryCard'
import { PDF } from './PDF'
import { BiDownload, BiFile, BiChevronDown } from "react-icons/bi";

import './style/AllWeeks.css'

const AllWeeks = () => {
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)
    const [selectMode, setSelectMode] = useState(false)
    const [selected, setSelected] = useState([])
    const [payload, setPayload] = useState(false)
    const [preSave, setPreSave] = useState(false)

    useEffect(() => {
        (async () => {
            console.log('consultando historial');
            const { data } = await axios(`/history/allweeks`)
            if (!data.error) setData(() => data)
            setLoading(false)
        })()
    }, [])

    const selectHandle = (obj, id) => {
        if (payload) setPayload(false)

        if (preSave[id]) {
            setSelected(pre => {
                let aux = [...pre]
                return aux.filter(e => e !== id)
            })
            setPreSave(pre => {
                let aux = { ...pre }
                delete aux[id]
                const payload = Object.values(aux)
                console.log(payload);
                setPayload(() => !!payload.length ? payload : false)
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
                setPayload(() => Object.values(aux))
                return aux
            })
        }
    }

    const handleModeButton = () => {
        setSelectMode(!selectMode)
        if (payload) setPayload(false)
        if (preSave) setPreSave(false)
        if (selected) setSelected([])
    }

    return (
        <div>
            <h2>Historial</h2>

            {!loading &&
                <div className={`pdf-menu-container card-style2 ${selectMode ? 'pdf-open' : ''}`}>
                    <span className='history-card-details-head'
                        onClick={handleModeButton}>
                        <p><BiFile className='icon i-margin-r' /> Descargar historial</p>
                        <BiChevronDown className={`icon i-grey ${selectMode ? 'i-arrow-close' : ''}`} />
                    </span>

                    <div>
                        <p>Para descargar una copia del historial selecciona las semanas que deseas incluir en el archivo</p>
                        <div className='pdf-selected-list'>{
                            selected.map(e => <span key={e}>{e}</span>)
                        }</div>

                        <div className='pdf-menu-buttons'>
                            {/* <button onClick={createPayload}
                                disabled={!preSave || selected.length < 1}
                                className='button'>
                                Generar PDF
                            </button> */}

                            {payload
                                ? <PDF data={payload} />
                                : <button disabled className='button'><BiDownload className='icon i-margin-r' /> descargar</button>}

                            <button className={`button button-sec`}
                                onClick={handleModeButton}>cancelar
                            </button>
                        </div>
                    </div>

                </div>}

            {loading
                ? <Spinner />
                : <div className='weeks-container fade-in'>
                    {!!data.response.length &&
                        data.response.map((e, i) => (
                            <HistoryCard data={e} key={Date.now() + i}
                                selectMode={selectMode}
                                selected={selected.includes(e.dates.start)}
                                select={() => selectHandle({ dates: e.dates, weekDays: e.weekDays }, e.dates.start)} />
                        ))}
                </div>
            }
        </div>
    )
}

export default AllWeeks