import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner } from './Spinner'
import { HistoryCard } from './HistoryCard'
import { PDF } from './PDF'
import { BiDownload, BiFile, BiChevronDown, BiCheckSquare, BiCheckbox } from "react-icons/bi";

import './style/AllWeeks.css'

const AllWeeks = () => {
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)
    const [selectMode, setSelectMode] = useState(false)
    const [selected, setSelected] = useState([])
    const [allSelected, setAllSelected] = useState(false)
    const [payload, setPayload] = useState(false)
    const [preSave, setPreSave] = useState(false)

    useEffect(() => {
        (async () => {
            const { data } = await axios(`/history/allweeks/V2`)
            if (!data.error) setData(() => data)
            // console.log(data);
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

    const selectAll = () => {
        setPayload(() => false)
        let aux = [],
            dates = []

        data.forEach(e => {
            let aux1 = {
                dates: e.dates,
                weekDays: e.weekDays
            }
            aux.push(aux1)
            dates.push(e.dates.start)
        });
        setPayload(() => aux)
        setSelected(() => dates)
        setAllSelected(!allSelected)
    }

    const handleModeButton = () => {
        setSelectMode(!selectMode)
        if (allSelected) setAllSelected(false)
        if (payload) setPayload(false)
        if (preSave) setPreSave(false)
        if (selected) setSelected([])
    }

    return (
        <div>
            <h2>Historial</h2>

            {data
                ? <>
                    {!loading &&
                        <div className={`pdf-menu-container card-style2 ${selectMode ? 'pdf-open' : ''}`}>
                            <span className='history-card-details-head'
                                onClick={handleModeButton}>
                                <p><BiFile className='icon i-margin-r' /> Descargar historial</p>
                                <BiChevronDown className={`icon i-grey ${selectMode ? 'i-arrow-close' : ''}`} />
                            </span>

                            <div>
                                <p>Para descargar una copia del historial selecciona las semanas que deseas incluir en el archivo</p>

                                <div className='pdf-selected-list'>
                                    {selected.map(e => <span key={e}>{e}</span>)}
                                </div>
                                <div onClick={selectAll}
                                    className='checkbox'>
                                    {allSelected
                                        ? <BiCheckSquare className='i-large i-margin-r i-blue' />
                                        : <BiCheckbox className='i-large i-margin-r' />}
                                    <p>incluir todo</p>
                                </div>

                                <div className='pdf-menu-buttons'>
                                    {payload
                                        ? <PDF data={payload} />
                                        : <button disabled className='button'><BiDownload className='icon i-margin-r' /> descargar</button>}

                                    <button className={`button sec`}
                                        onClick={handleModeButton}>cancelar
                                    </button>
                                </div>
                            </div>

                        </div>}

                    {loading
                        ? <Spinner />
                        : <div className='weeks-container fade-in'>
                            {!!data.length &&
                                data.map((e, i) => (
                                    <HistoryCard data={e} key={Date.now() + i}
                                        selectMode={selectMode}
                                        selected={allSelected || selected.includes(e.dates.start)}
                                        select={() => selectHandle({ dates: e.dates, weekDays: e.weekDays }, e.dates.start)} />
                                ))}
                        </div>
                    }
                </>
                : <p>Aún no tienes registros para mostrar</p>
            }
        </div>
    )
}

export default AllWeeks