import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { usePlate } from '../plate-context'
import { DayCard } from './DayCard'
import Plate from './Plate'

import './style/TutorialContainer.css'

export const TutorialContainer = () => {
    const { dispatch, state: { openTuto } } = usePlate()
    const [closeButton, setCloseButton] = useState(true)
    const [dontShowAgain, setDontShowAgain] = useState(false)
    const [diapo, setDiapo] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setCloseButton(() => false)
        }, 3000);
    }, [openTuto])

    const nextDiapo = () => {
        setDiapo(d => {
            if (d < content[openTuto].length - 1) return d + 1
        })
    }

    const close = async () => {
        if (dontShowAgain) {
            const { data } = await axios.put('/user/config', { tutorial: openTuto })
            if (!data.error) {
                console.log(data);
                dispatch({ type: 'userConfig', payload: data.config })
            } else console.console.warn(data);
        }
        dispatch({ type: 'closeTuto' })
        setDiapo(() => 0)
    }

    const day = {
        date: "10/14/1993",
        afternoonsnack: { foods: ['Avocado toast'], breakfast: ['Café'], fruit: ['Manzana'], empty: false },
        breakfast: { foods: ['Budín de naranja'], breakfast: ['Café'], fruit: [], empty: false },
        dinner: {
            foods: [],
            protein: ['Milanesa de pollo'],
            carbohydrate: ['Puré de papas'],
            vegetal: ['Ensalada'],
            fruit: [],
            vegetalC: false,
        },
        lunch: {
            foods: [],
            protein: ['Carne al horno'],
            carbohydrate: ['Arroz integral'],
            vegetal: ['Zapallo'],
            fruit: [],
            vegetalC: false,
        },
        empty: false,
        message: [],
        cheatFood: [],
        workOut: ['Gimnasio'],
        balanced: true,
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
                    detalles destacados, las comidas registradas y si ya has registrado el almuerzo del día, veras una recomendación para la cena.
                </p>
            </Fragment>,
            <Fragment key={'tutomm3'}>
                <p>En las tarjetas puedes encontrar varios datos,
                    <br />
                    en la primer sección verás el Almuerzo y la Cena,
                    puedes ver mas detalles al tocar cada una.
                    <br />
                    <br />
                    En la segunda sección (arrastrando hacia la izquierda), el desayuno, la merienda y actividad física.
                </p>
                <div className='tuto-minicard'>
                    <DayCard key={'tutommc'} data={day}
                        menu={false} demo={true}
                        openDelete={undefined}
                        editWorkOut={undefined} />
                </div>
                <br />
            </Fragment>,
            <Fragment key={'tutomm4'}>
                <p>También podras crear registros para cada comida (desayuno, almuerzo, merienda y cena) o actividades físicas.
                    <br />
                    ¡Intenta no olvidar registrar por lo menos el almuerzo y la cena!
                </p>
            </Fragment>
        ],
        creationMenu: [
            <Fragment key={'tutocm1'}>
                <h2>Registro de comida</h2>
                <p>Aquí, además de registrar tus comidas, encontraras algunos consejos para armar tus platos.
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
                <p>En esta sección verás todos los registros que hayas realizado,<br />
                    ordenados por semana y, si existen, los controles correspondientes a la misma.
                </p>
            </Fragment>,
            <Fragment key={'tutoh2'}>
                <p>También es posible descargar la información de una o multiples semanas en un archivo PDF.</p>
            </Fragment>
        ],
        checkpoints: [
            <Fragment key={'tutocp1'}>
                <h2>Registro de controles</h2>
                <p>Aquí podras ver y registrar tus pesajes. <br />
                    Cuando lleves un par de registros podras ver gráficos mostrando tu progreso.
                </p>
            </Fragment>,
            <Fragment key={'tutocp2'}>
                <p>Esta sección esta diseñada en base a los resultados que brindan los estudios de bioimpedancia:<br />peso, porcentaje de masa muscular, porcentaje de grasa, etc.,<br /> pero también puedes llevar registro solamente de tu peso sin problema.
                </p>
            </Fragment>,
            <Fragment key={'tutocp3'}>
                <p>Si registras tu altura, podrás ver  el <b>indice de masa muscular</b> en cada tarjeta.<br />
                    Puedes hacerlo en el menú de configuración.
                </p>
            </Fragment>
        ],
        customMeals: [
            <Fragment key={'tutomp1'}>
                <h2>Tus Preparaciones</h2>
                <p>En esta sección puedes crear y guardar tus propias comidas para acceder rapidamente a ellas.</p>
            </Fragment>,
            <Fragment key={'tutomp2'}>
                <p>Elige un nombre, busca los ingredientes que correspondan y listo. La próxima vez que registres un desayuno, almuerzo, cena o merienda veras tus recetas en "mis preparaciones".</p>
            </Fragment>
        ],
    }

    return (
        <div className={`TutorialContainer fade-in ${openTuto ? 'tutoOpen' : ''}`}>
            {openTuto &&
                <div className='tuto-content card-style'>
                    {content[openTuto][diapo]}

                    {diapo >= content[openTuto].length - 1 &&
                        <label className='dontshow' htmlFor='dontshow'
                            onClick={() => setDontShowAgain(() => true)}>
                            <input id='dontshow' type='checkbox'></input>
                            <p>no volver a mostrar</p>
                        </label>}

                    <button disabled={closeButton}
                        onClick={diapo < content[openTuto].length - 1 ? nextDiapo : close}
                        className='button'>
                        {diapo < content[openTuto].length - 1
                            ? 'siguiente'
                            : 'entendido'}
                    </button>
                </div>}
        </div>
    )
}
