import React, { useRef } from 'react'
import axios from 'axios'
import { usePlate } from '../plate-context'
import Modal from './helpers/Modal'
import { useModal } from './helpers/useModal'

import './style/Config.css'

export const Config = () => {
    const {
        dispatch,
        state: {
            config: {
                height,
                plateStyle,
                tutorials: {
                    activated,
                    mainMenu,
                    creationMenu,
                    checkpoints,
                    customMeals,
                    history,
                }
            },
            user_name
        }
    } = usePlate()
    const heightRef = useRef()
    const [isOpen, openModal, closeModal] = useModal()

    const change = async (field) => {
        const aux = field === 'plateStyle'
            ? {
                plateStyle: field
            }
            : {
                tutorial: field
            }
        const { data } = await axios.put('/user/config', aux)
        console.log(data);
        if (!data.error) {
            dispatch({
                type: 'userConfig',
                payload: data.config
            })
        }
    }

    const saveHeight = async () => {
        if (heightRef.current) {
            let { value } = heightRef.current
            value = value.replace('.', '')
            console.log(value);

            const { data } = await axios.put('/user/config', { height: value })
            console.log(data);
            if (!data.error) {
                dispatch({
                    type: 'userConfig',
                    payload: data.config
                })
            }
            close()
        }
    }

    const close = () => {
        heightRef.current.value = ''
        closeModal()
    }

    // const check = {
    //     on: <input type={},
    //     off: <input type={}
    // }

    return (
        <div>
            <h1>Configuración</h1>

            <section className='config-section card-style'>
                <h3>Altura</h3>

                <p>para el calculo de IMC: <b>{!!height ? height + 'cm.' : 'no registrada'}</b></p>
                <p onClick={openModal} className='button-opt i-blue'> registrar altura </p>
            </section>

            <section className='config-section card-style'>
                <h3>Tutoriales</h3>

                <div className='dontshow' onClick={() => change('activated')}>
                    <input checked={activated} type='checkbox' readOnly></input>
                    <p>Mostrar todos</p>
                </div>

                <div onClick={() => change('mainMenu')}
                    className='dontshow'>
                    <input checked={mainMenu} readOnly type='checkbox'></input>
                    <p>Menú principal</p>
                </div>

                <div onClick={() => change('creationMenu')}
                    className='dontshow'>
                    <input checked={creationMenu} readOnly type='checkbox'></input>
                    <p>Registro de comida</p>
                </div>

                <div onClick={() => change('checkpoints')}
                    className='dontshow'>
                    <input checked={checkpoints} readOnly type='checkbox'></input>
                    <p>Controles</p>
                </div>

                <div onClick={() => change('customMeals')}
                    className='dontshow'>
                    <input checked={customMeals} readOnly type='checkbox'></input>
                    <p>Mis preparaciones</p>
                </div>

                <div onClick={() => change('history')}
                    className='dontshow'>
                    <input checked={history} readOnly type='checkbox'></input>
                    <p>Historial</p>
                </div>
            </section>

            <section className='config-section card-style'>
                <h3>Extras</h3>

                <div onClick={() => change('plateStyle')}
                    className='dontshow'>
                    <input checked={plateStyle} readOnly type='checkbox'></input>
                    <p>Diseño de plato detallado</p>
                </div>
            </section>

            <p className='italic'>cuenta asociada a: <b>{user_name}</b></p>

            <Modal isOpen={isOpen} closeModal={close}>
                <div>
                    <p>Registra tu altura en centímetros:</p>
                    <input ref={heightRef} type="number" placeholder={!!height ? height + 'cm.' : 'cm.'} />
                    <button onClick={saveHeight} className='button'> guardar </button>
                </div>
            </Modal>
        </div>
    )
}