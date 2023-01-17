import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { ControlCard } from './ControlCard'
import { mergeSort } from './helpers/dateMergeSort'
import Modal from './helpers/Modal'
import { useModal } from './helpers/useModal'
import { Chart } from 'react-chartjs-2'
import { Spinner } from './Spinner'
import { BiChevronDown } from 'react-icons/bi';

export const Checkpoint = () => {
    const [form, setForm] = useState({
        weight: '',
        muscle: '',
        fat: '',
        abdominal: '',
        body_age: '',
        date: new Date().toLocaleDateString('en-CA') + 'T' + new Date().getHours() + ':' + new Date().getMinutes()
    })
    const [loading, setLoading] = useState(true)
    const [selectedCard, setSelectedCard] = useState(false)
    const [checkpoints, setCheckpoints] = useState(false)
    const [dataSet, setDataSet] = useState(false)
    const chartRef = useRef(null)

    const options = {
        scales: {
            y: {
                beginAtZero: false,
            },
        },
        layout: {
            padding: 5
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '',
                            value = context.formattedValue
                        return `${value}${label}`;
                    }
                },
            }
        },
        events: ['click'],
        hover: {
            mode: 'nearest'
        },
        onClick: function (event, element) {
            cardFinder(element[0]?.index)
        }
    };
    const [isOpen, openModal, closeModal] = useModal()

    const cardFinder = (index) => {
        if (!index) setSelectedCard(() => false)
        else {
            const key = document.getElementById('select-data').value
            const card = checkpoints.filter(e => e[key])[index]
            setSelectedCard(() => card.date)
        }
    }

    useEffect(() => {
        !checkpoints && (async () => {
            setLoading(true)
            const { data } = await axios(`/history/checkpoint`)
            if (!data.error) {
                let aux = mergeSort(data.checkpoints)
                console.table(aux);
                setCheckpoints(() => aux)

                const dataset = {
                    labels: aux.map(e => e.date.slice(0, -5).split('/').reverse().join('/')),
                    datasets: [
                        {
                            type: 'line',
                            label: 'kg',
                            data: aux.map(e => parseFloat(e.weight)),
                            pointBorderWidth: 5,
                            tension: 0.1,
                            fill: true,
                            borderWidth: 2,
                            backgroundColor: '#73ccea10',
                            borderColor: '#73ccea',
                            pointBackgroundColor: '#73ccea',
                        }
                    ],
                }
                setDataSet(() => dataset)
            }
            setLoading(false)
        })()
        // eslint-disable-next-line
    }, [])

    const handleClose = () => {
        closeModal()
        setForm(() => ({
            weight: '',
            muscle: '',
            fat: '',
            abdominal: '',
            body_age: '',
            date: new Date().toLocaleDateString('en-CA') + 'T' + new Date().getHours() + ':' + new Date().getMinutes()
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(new Date(form.date).toLocaleDateString('en'));
        const checkpoint = {
            ...form,
            date: new Date(form.date).toLocaleDateString('en')
        }
        const { data } = await axios.post(`/history/checkpoint`, { checkpoint })

        if (!data.error) {
            setCheckpoints(() => data.checkpoints)
            handleClose()
        } else {
            console.warn(data.error)
        }
    }
    //? calculo de IMC: peso / (altura^2)

    const niceDate = (d) => {
        return d.slice(0, -5).split('/').reverse().join('/')
    }

    const handleChartUpdate = (e) => {
        const { value } = e.target
        const datas = {
            weight: {
                type: 'line',
                label: 'kg.',
                data: checkpoints.map(e => parseFloat(e.weight)),
                backgroundColor: '#73ccea10',
                pointBackgroundColor: '#73ccea',
                borderColor: '#73ccea',
            },
            muscle: {
                type: 'line',
                label: '%',
                data: checkpoints.map(e => parseFloat(e.muscle)).filter(e => !!e),
                backgroundColor: '#B6E2A110',
                pointBackgroundColor: '#B6E2A1',
                borderColor: '#B6E2A1',
            },
            fat: {
                type: 'line',
                label: '%',
                data: checkpoints.map(e => parseFloat(e.fat)).filter(e => !!e),
                backgroundColor: '#FEBE8C10',
                pointBackgroundColor: '#FEBE8C',
                borderColor: '#FEBE8C',
            },
            abdominal: {
                type: 'line',
                label: '',
                data: checkpoints.map(e => e.abdominal).filter(e => !!e),
                backgroundColor: '#F7A4A410',
                pointBackgroundColor: '#F7A4A4',
                borderColor: '#F7A4A4',
            },
            body_age: {
                type: 'line',
                label: ' años',
                data: checkpoints.map(e => e.body_age).filter(e => !!e),
                backgroundColor: '#ffffff10',
                pointBackgroundColor: '#ffffff',
                borderColor: '#ffffff',
            }
        }
        const chart = chartRef.current;
        chart.data.labels = checkpoints.filter(e => e[value]).map(e => niceDate(e.date));
        chart.data.datasets[0] = { ...chart.data.datasets[0], ...datas[value] };
        chart.update();
    }

    return (
        <div>
            <h2>Controles</h2>
            <button className='ingredients-cell add-ing'
                onClick={openModal}>
                Agregar control
            </button>

            {loading && <Spinner />}

            {dataSet && <div className='chart-container'>
                <Chart ref={chartRef} data={dataSet} options={options} />

                <label className='custom-select'>
                    <BiChevronDown className='select-arrow' />
                    <select id='select-data' onChange={e => handleChartUpdate(e)}>
                        <option value='weight'>peso</option>
                        <option value='muscle'>% musculatura</option>
                        <option value='fat'>% grasa</option>
                        <option value='abdominal'>grasa visceral</option>
                        <option value='body_age'>edad corporal</option>
                    </select>
                </label>
            </div>}

            <div className='cp-cards-container fade-in'>{
                !!checkpoints.length && checkpoints.map(e => (
                    <div key={e._id}
                        style={{ height: `calc(${(Object.values(e).filter(e => e).length * 1.3)}em + 1.8em)` }}
                        className={(selectedCard && selectedCard !== e.date)
                            ? 'controlcard-hyde' : 'controlcard-jekyll'}>
                        <ControlCard data={e}
                            showOpen={false}
                            open={true}
                            setOpen={() => undefined} />
                    </div>
                ))
            }</div>

            <Modal isOpen={isOpen} closeModal={handleClose}>
                <div>
                    <form onSubmit={handleSubmit} className='control-form'>
                        <input type="datetime-local"
                            value={form.date}
                            onChange={e => setForm(c => ({ ...c, date: e.target.value }))} />
                        <input type="number" placeholder='peso'
                            value={form.weight}
                            required
                            onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} />
                        <input type="number" placeholder='% muscular'
                            value={form.muscle}
                            onChange={e => setForm(f => ({ ...f, muscle: e.target.value }))} />
                        <input type="number" placeholder='% de grasa'
                            value={form.fat}
                            onChange={e => setForm(f => ({ ...f, fat: e.target.value }))} />
                        <input type="number" placeholder='grasa visceral'
                            value={form.abdominal}
                            onChange={e => setForm(f => ({ ...f, abdominal: e.target.value }))} />
                        <input type="number" placeholder='edad corporal'
                            value={form.body_age}
                            onChange={e => setForm(f => ({ ...f, body_age: e.target.value }))} />
                    </form>
                    <button onClick={handleSubmit} className='button'>guardar</button>
                </div>
            </Modal>
        </div>
    )
}
