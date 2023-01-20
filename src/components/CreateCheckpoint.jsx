import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from './Spinner'

export const CreateCheckpoint = () => {
    const [form, setForm] = useState({
        weight: '',
        muscle: '',
        fat: '',
        abdominal: '',
        body_age: '',
        date: new Date().toLocaleDateString('en-CA') + 'T' + new Date().getHours() + ':' + new Date().getMinutes()
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const checkpoint = {
            ...form,
            date: new Date(form.date).toLocaleDateString('en')
        }
        const { data } = await axios.post(`/history/checkpoint`, { checkpoint })

        if (!data.error) {
            // console.log(data);
            navigate('/checkpoint')
        } else {
            console.warn(data.error)
        }
        setLoading(false)
    }
    //? calculo de IMC: peso / (altura^2)

    return (
        <div className='fade-in'>
            <h2>Registrar nuevo control</h2>
            {loading && <Spinner />}

            <form onSubmit={handleSubmit} className='control-form'>
                <input type="datetime-local"
                    value={form.date}
                    required
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
                <button className='button'>guardar</button>
                <button onClick={() => navigate('/checkpoint')} className='button sec'>cancelar</button>
            </form>
        </div>
    )
}
