import React, { useEffect, useState } from 'react'
import { usePlate } from '../plate-context'
import Modal from './helpers/Modal'
import { useModal } from './helpers/useModal'
import IngredientList from './IngredientList'
import Plate from './Plate'
import group from '../constants'
import SearchIngredient from './SearchIngredient'

import './style/MealMenu.css'

const MealMenu = ({ close }) => {
    const [ingredientList, setIngredientList] = useState(false)
    // const [proportions, setProportions] = useState('')
    const [suggestions, setSuggestions] = useState({})
    const [checkIt, setCheckIt] = useState(false)
    const {
        dispatch,
        state: {
            protein,
            carbohydrate,
            vegetal,
            vegetalC,
            // history
        } } = usePlate()
    const [isOpenType, openType, closeType] = useModal();

    const closeTypeHandler = () => {
        closeType()
        setIngredientList(false)
    }

    useEffect(() => {
        if (!checkIt && (protein.length > 0 || carbohydrate.length > 0 || vegetal.length > 0))
            setCheckIt(() => true)

        //? Proporciones
        // let p = protein.length
        //     ? protein.length && carbohydrate.length
        //         ? 1
        //         : 2
        //     : 0,
        //     c = carbohydrate.length
        //         ? carbohydrate.length && protein.length
        //             ? 1
        //             : 2
        //         : 0,
        //     v = vegetal.length
        //         ? 2
        //         : 0

        // setProportions(`
        //     ${p ? 'Proteínas: ' + (25 * p) + '%, ' : ''}
        //     ${c ? 'Carbohidratos: ' + (25 * c) + '%, ' : ''}
        //     ${v ? 'Vegetales: ' + (25 * v) + '%' : ''}
        // `)

        //? Recomendaciones
        const vegChecker = (arr, g) => {
            let vegGroup
            g === 'A'
                ? (vegGroup = 'vegA')
                : (vegGroup = 'vegB')

            arr.length < 1
                ? setSuggestions(s => (
                    {
                        ...s,
                        [vegGroup]: `Puedes agregar vegetales del grupo ${g} para mejorar la variedad del plato.`
                    }
                ))
                : setSuggestions(s => {
                    if (s[vegGroup]) {
                        let aux = { ...s }
                        delete aux[vegGroup]
                        return aux
                    } else return s
                })
        }

        if (checkIt || vegetal.length > 0) {
            let groupA = [],
                groupB = []

            vegetal.map(v =>
                group.vegB.map(n => n.name).includes(v)
                    ? groupB.push(v)
                    : groupA.push(v)
            )
            if (groupA.length < 1 && groupB.length < 1) {
                setSuggestions(s => ({
                    ...s,
                    vegetal: 'Utiliza vegetales de los grupos A y B para rellenar la mitad del plato.'
                }))
            } else {
                if (suggestions.vegetal) {
                    setSuggestions(s => {
                        let aux = { ...s }
                        delete aux.vegetal
                        return aux
                    })
                }
                vegChecker(groupA, 'A')
                vegChecker(groupB, 'B')
            }
        }

        if (checkIt && protein.length < 1 && carbohydrate.length < 1) {
            setSuggestions(s => ({
                ...s,
                incomplete: 'No olvides agregar Proteinas y/o Carbohidratos.'
            }))
        } else if (suggestions.incomplete) {
            setSuggestions(s => {
                let aux = { ...s }
                delete aux.incomplete
                return aux
            })
        }

        // eslint-disable-next-line
    }, [protein, carbohydrate, vegetal])

    const openSection = (section) => {
        setIngredientList(section)
        openType()
    }

    const save = () => {
        let aux = {
            protein: [...protein],
            carbohydrate: [...carbohydrate],
            vegetal: [...vegetal],
            vegetalC,
            date: new Date().toLocaleDateString('en')
            // date: datetest
        }
        dispatch({
            type: 'save',
            payload: aux
        })
        close()
        dispatch({ type: 'reset' })
    }

    return (
        <div className='mainmenu-container'>
            <p>Veg. C semanal: 0/3</p>
            <Plate size={'34vh'}
                protein={protein}
                carbohydrate={carbohydrate}
                vegetal={vegetal}
                vegC={vegetalC} />
            {/* <p>{proportions}</p> */}
            <ul>{Object.values(suggestions).length > 0 &&
                Object.values(suggestions).map(s => <li key={s}>{s}</li>)}
            </ul>

            <section className='ingredients'>
                {protein.length > 0 &&
                    <div onClick={() => openSection('protein')}
                        className='ingredients-cell ing-p'>
                        <b>Proteína</b>
                        <p>{protein.toString().replaceAll(',', ', ')}</p>
                    </div>}

                {carbohydrate.length > 0 &&
                    <div onClick={() => openSection('carbohydrate')}
                        className='ingredients-cell ing-c'>
                        <b>Carbohidratos</b>
                        <p>{carbohydrate.toString().replaceAll(',', ', ')}</p>
                    </div>}

                {vegetal.length > 0 &&
                    <div onClick={() => openSection('vegetal')}
                        className='ingredients-cell ing-v'>
                        <b>Vegetales</b>
                        <p>{vegetal.toString().replaceAll(',', ', ')}</p>
                    </div>}

                <div onClick={openType}
                    className='ingredients-cell button'>
                    Agregar ingrediente +
                </div>
            </section>

            <div className='ingredients forButtons'>
                <button className='ingredients-cell button' onClick={save}>SAVE</button>
                <button className='ingredients-cell button' onClick={close}>CLOSE</button>
            </div>

            <Modal
                isOpen={isOpenType}
                closeModal={closeTypeHandler}>
                <div className='modal-menu-container'>

                    {(!ingredientList || ingredientList === 'search') &&
                        <SearchIngredient changeList={setIngredientList} />}

                    {!ingredientList &&
                        <div className='ingredients'>
                            <div className='ingredients-cell'
                                onClick={() => setIngredientList('protein')}>
                                <p>
                                    Proteína 🥩
                                </p>
                            </div>
                            <div className='ingredients-cell'
                                onClick={() => setIngredientList('carbohydrate')}>
                                <p>
                                    Carbohidratos  🌾
                                </p>
                            </div>
                            <div className='ingredients-cell'
                                onClick={() => setIngredientList('vegetal')}>
                                <p>
                                    Vegetales 🥦
                                </p>
                            </div>
                            <button onClick={closeType}>x</button>
                        </div>}

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