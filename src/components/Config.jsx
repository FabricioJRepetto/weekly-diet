import React, { useRef } from 'react'
import axios from 'axios'
import { usePlate } from '../plate-context'
import Modal from './helpers/Modal'
import { useModal } from './helpers/useModal'

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
            }
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

    return (
        <div>
            <h1>Configuracion [WIP]</h1>
            <br />
            <h2>tutoriales</h2>
            <b onClick={() => change('activated')}>Mostrar todos: {activated ? 'on' : 'off'}</b>
            <p onClick={() => change('mainMenu')}>Menú principal: {mainMenu ? 'on' : 'off'}</p>
            <p onClick={() => change('creationMenu')}>Registro de comida: {creationMenu ? 'on' : 'off'}</p>
            <p onClick={() => change('checkpoints')}>Controles: {checkpoints ? 'on' : 'off'}</p>
            <p onClick={() => change('customMeals')}>Mis preparaciones: {customMeals ? 'on' : 'off'}</p>
            <p onClick={() => change('history')}>Historial: {history ? 'on' : 'off'}</p>
            <br />
            <p>Altura (para calcular IMC): {!!height ? height : 'no registrada'}</p>
            <button onClick={openModal} className='button'> registrar altura </button>
            <br />
            <p onClick={() => change('plateStyle')}>Diseño de plato detallado: {plateStyle ? 'on' : 'off'}</p>

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