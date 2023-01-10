import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ControlCard } from './ControlCard'
import { mergeSort } from './helpers/dateMergeSort'
import Modal from './helpers/Modal'
import { useModal } from './helpers/useModal'

export const Checkpoint = () => {
    const [form, setForm] = useState({
        weight: '',
        muscle: '',
        fat: '',
        abdominal: '',
        body_age: '',
        date: new Date().toLocaleDateString('en-CA') + 'T' + new Date().getHours() + ':' + new Date().getMinutes()
    })
    const [checkpoints, setCheckpoints] = useState(false)
    const [isOpen, openModal, closeModal] = useModal()

    useEffect(() => {
        !checkpoints && (async () => {
            const { data } = await axios(`/history/checkpoint`)
            if (!data.error) {
                console.log(data);
                let aux = mergeSort(data.checkpoints)
                setCheckpoints(() => aux)
            }
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
    return (
        <div>
            <h2>Controles</h2>
            <button className='ingredients-cell add-ing'
                onClick={openModal}>
                Agregar control
            </button>

            <div className='divisor'></div>
            <div>
                gráfico [WIP]
            </div>
            <div className='divisor'></div>

            <div className='cp-cards-container'>{
                !!checkpoints.length && checkpoints.map(e => (
                    <ControlCard key={e._id} data={e}
                        showOpen={false}
                        open={true}
                        setOpen={() => undefined} />
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
