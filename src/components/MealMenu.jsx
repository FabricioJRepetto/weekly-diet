import React, { useEffect, useState } from 'react'
import { usePlate } from '../plate-context'
import Modal from './helpers/Modal'
import { useModal } from './helpers/useModal'
import IngredientList from './IngredientList'
import Plate from './Plate'

import './style/MainMenu.css'

const MealMenu = () => {
    const [ingredientList, setIngredientList] = useState(false)
    const [proportions, setProportions] = useState('')
    const { state: {
        protein,
        carbohydrate,
        vegetal
    } } = usePlate()
    const [isOpenType, openType, closeType] = useModal();

    const closeTypeHandler = () => {
        closeType()
        setIngredientList(false)
    }

    useEffect(() => {
        let p = protein.length
            ? protein.length && carbohydrate.length
                ? 1
                : 2
            : 0,
            c = carbohydrate.length
                ? carbohydrate.length && protein.length
                    ? 1
                    : 2
                : 0,
            v = vegetal.length
                ? 2
                : 0

        setProportions(`
            ${p ? 'Proteínas: ' + (25 * p) + '%, ' : ''}
            ${c ? 'Carbohidratos: ' + (25 * c) + '%, ' : ''}
            ${v ? 'Vegetales: ' + (25 * v) + '%, ' : ''}
        `)
    }, [protein, carbohydrate, vegetal])

    const openSection = (section) => {
        setIngredientList(section)
        openType()
    }

    return (
        <div className='mainmenu-container'>
            <p>veg. C semanal: X X X</p>
            <Plate />
            <p>{proportions}</p>

            <section className='ingredients'>
                {protein.length > 0 &&
                    <div onClick={() => openSection('protein')}
                        className='ingredients-cell'>
                        <b>Proteína</b>
                        <p>{protein.toString().replaceAll(',', ', ')}</p>
                    </div>}

                {carbohydrate.length > 0 &&
                    <div onClick={() => openSection('carbohydrate')}
                        className='ingredients-cell'>
                        <b>Carbohidratos</b>
                        <p>{carbohydrate.toString().replaceAll(',', ', ')}</p>
                    </div>}

                {vegetal.length > 0 &&
                    <div onClick={() => openSection('vegetal')}
                        className='ingredients-cell'>
                        <b>Vegetales</b>
                        <p>{vegetal.toString().replaceAll(',', ', ')}</p>
                    </div>}

                <button onClick={openType}
                    className='ingredients-cell'>
                    Agregar al plato +
                </button>
            </section>

            <Modal
                isOpen={isOpenType}
                closeModal={closeTypeHandler}>
                <div>
                    {!ingredientList &&
                        <>
                            <p className='ingredients-cell'
                                onClick={() => setIngredientList('protein')}>
                                Proteína
                            </p>
                            <p className='ingredients-cell'
                                onClick={() => setIngredientList('carbohydrate')}>
                                Carbohidratos
                            </p>
                            <p className='ingredients-cell'
                                onClick={() => setIngredientList('vegetal')}>
                                Vegetales
                            </p>
                            <button onClick={closeType}>x</button>
                        </>}

                    {ingredientList &&
                        <IngredientList
                            list={ingredientList}
                            openList={setIngredientList} />}
                </div>

            </Modal>
        </div>
    )
}

export default MealMenu