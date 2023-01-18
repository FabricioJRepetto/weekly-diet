import React, { Fragment, useEffect, useState } from 'react'
import { usePlate } from '../plate-context'
import Plate from './Plate'

import './style/TutorialContainer.css'

export const TutorialContainer = () => {
    const { dispatch, state: { openTuto, config: { tutorials } } } = usePlate()
    const [closeButton, setCloseButton] = useState(false)
    const [diapo, setDiapo] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setCloseButton(() => true)
        }, 3000);
    }, [openTuto])

    const nextDiapo = () => {
        setDiapo(d => {
            if (d < content[openTuto].length - 1) return d + 1
        })
    }

    const close = () => {
        dispatch({ type: 'closeTuto' })
        setDiapo(() => 0)
    }

    const content = {
        mainMenu: [
            <Fragment key={'tutomm1'}>
                <h2>Bienvenido a Diet Mate!</h2>
                <p>Esta es una app diseñada para darte consejos en base a tus comidas diarias y así ayudarte a conseguir una dieta balanceada.
                    <br />
                </p>
            </Fragment>,
            <Fragment key={'tutomm2'}>
                <p>En esta pantalla veras información la semana actual:
                    <br />
                    detalles destacados, todas las comidas registradas y si ya has registrado el almuerzo del día, veras una recomendación para la cena.
                </p>
            </Fragment>,
            <Fragment key={'tutomm3'}>
                <p>También podras crear registros para cada comida (desayuno, almuerzo, merienda y cena) o actividades físicas.
                    <br />
                    ¡Intenta no olvidar registrar por lo menos el almuerzo y la cena!
                </p>
            </Fragment>
        ],
        creationMenu: [
            <Fragment key={'tutocm1'}>
                <h2>Registro de comida</h2>
                <p>Aqui, además de registrar tus comidas, encontraras algunos consejos para armar tus platos.
                    <br />
                    Intenta respetar lo mejor posible las proporciones que se muestran sobre el plato.
                </p>
            </Fragment>,
            <Fragment key={'tutocm2'}>
                <p>Por ejemplo, en este caso deberías llenar una mitad con vegetales y la otra con algún tipo de proteína.
                </p>
                <Plate protein={[true]} carbohydrate={[]} vegetal={[true]} size={'50%'} />
            </Fragment>,
            <Fragment key={'tutocm3'}>
                <p>Encontraras varias comidas separadas en grupos: <span className='i-red'>proteínas</span>, <span className='i-orange'>carbohidratos</span> y <span className='i-green'>vegetales</span> entre otros.
                    <br />
                    Si quieres, también puedes guardar tus propias elaboraciones.
                </p>
            </Fragment>,
        ],
        history: [
            <Fragment key={'tutoh1'}>
                <h2>Historial</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio mollitia et vero tempora obcaecati unde tempore aliquam adipisci laborum officiis, possimus perspiciatis velit fugit ipsum natus accusamus iste praesentium eligendi.</p>
            </Fragment>
        ],
        checkpoints: [
            <Fragment key={'tutocp1'}>
                <h2>Registro de controles</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio mollitia et vero tempora obcaecati unde tempore aliquam adipisci laborum officiis, possimus perspiciatis velit fugit ipsum natus accusamus iste praesentium eligendi.</p>
            </Fragment>
        ],
        customMeals: [
            <Fragment key={'tutomp1'}>
                <h2>Tus Preparaciones</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio mollitia et vero tempora obcaecati unde tempore aliquam adipisci laborum officiis, possimus perspiciatis velit fugit ipsum natus accusamus iste praesentium eligendi.</p>
            </Fragment>
        ],
    }

    return (
        <div className={`TutorialContainer fade-in ${openTuto ? 'tutoOpen' : ''}`}>
            {openTuto &&
                <div className='tuto-content card-style'>
                    {content[openTuto][diapo]}
                    {closeButton &&
                        <button onClick={diapo < content[openTuto].length - 1 ? nextDiapo : close}
                            className='button fade-in'>
                            {diapo < content[openTuto].length - 1
                                ? 'siguiente'
                                : 'entendido'}
                        </button>
                    }
                </div>}
        </div>
    )
}
