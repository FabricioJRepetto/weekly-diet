import React, { useEffect, useState } from 'react'
// import { group } from '../constants'
import { usePlate } from '../plate-context'
import { suggestions } from './helpers/suggestions'

import './style/Suggested.css'

export const Suggested = () => {
    const {
        state:
        {
            currentPlate: {
                protein,
                carbohydrate,
                vegetal,
                vegetalC
            },
            group,
            week
        }
    } = usePlate()
    const [message, setMessage] = useState('')
    const [promp, setPromp] = useState('')
    const [tip, setTip] = useState({})

    useEffect(() => {
        if (week.today.length === 1) {
            const {
                message,
                initials
            } = suggestions(week.today)

            setMessage(() => message)
            setPromp(() => initials)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let groupA = [],
            groupB = [],
            salad = vegetal.includes('Ensalada')

        if (!salad) {
            vegetal.map(v =>
                group.vegB.map(n => n.name).includes(v)
                    ? groupB.push(v)
                    : groupA.push(v)
            )
            if (groupA.length < 1 && groupB.length < 1) {
                setTip(s => ({
                    ...s,
                    vegetal: 'X Utiliza vegetales de los grupos A y B.'
                }))
            } else {
                if (tip.vegetal) {
                    setTip(s => {
                        let aux = { ...s }
                        delete aux.vegetal
                        return aux
                    })
                }
                vegChecker(groupA, 'A')
                vegChecker(groupB, 'B')
            }
        } else {
            if (tip.vegetal) {
                setTip(s => {
                    let aux = { ...s }
                    delete aux.vegetal
                    return aux
                })
            }
        }
        // eslint-disable-next-line
    }, [vegetal])

    const vegChecker = (arr, g) => {
        let vegGroup
        g === 'A'
            ? (vegGroup = 'vegA')
            : (vegGroup = 'vegB')

        arr.length < 1
            ? setTip(s => (
                {
                    ...s,
                    [vegGroup]: `✨ Mejora la variedad con vegetales del grupo ${g}.`
                }
            ))
            : setTip(s => {
                if (s[vegGroup]) {
                    let aux = { ...s }
                    delete aux[vegGroup]
                    return aux
                } else return s
            })
    }

    return (
        <div className='suggestions-container'>
            {week.today && week.today.length === 1
                ? <>
                    <b>Basado en la comida anterior: </b>
                    <br />
                    <>{message}</>
                </>
                : <>
                    <b>Plato ideal (opcional): </b>
                    <br />
                    <>proteínas y carbohidratos (1/4 de plato cada uno) acompañados con vegetales (medio plato).</>
                </>}

            {week.vegetalC >= 3 &&
                <p className={vegetalC ? 'bad' : 'good'}>
                    {vegetalC ? 'X' : '✔'}No incluir vegetales C</p>}

            {/p/g.test(promp) &&
                <p className={!!protein.length ? 'good' : 'bad'}>
                    {!!protein.length ? '✔' : 'X'} Incluir proteínas</p>}
            {promp === 'p' &&
                <p className={!!carbohydrate.length ? 'bad' : 'good'}>
                    {!!carbohydrate.length ? 'X' : '✔'} No incluir carbohidratos</p>}
            {/c/g.test(promp) &&
                <p className={!!carbohydrate.length ? 'good' : 'bad'}>
                    {!!carbohydrate.length ? '✔' : 'X'} Incluir carbohidratos</p>}
            {promp === 'c' &&
                <p className={!!protein.length ? 'bad' : 'good'}>
                    {!!protein.length ? 'X' : '✔'} No incluir proteínas</p>}

            {Object.values(tip).length > 0 &&
                Object.values(tip).map(s => <p key={s}
                    className={!!vegetal.length ? 'neutral' : 'bad'}>{s}</p>)}
        </div>
    )
}
