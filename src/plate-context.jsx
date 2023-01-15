import { createContext, useReducer, useContext } from 'react'

export const PlateContext = createContext()

function plateReducer(state, action) {
    switch (action.type) {
        case 'login': {
            return {
                ...state,
                session: true,
                user_id: action.payload.id,
                user_name: action.payload.email,
                loading: false
            }
        }
        case 'logout': {
            return {
                currentPlate: {
                    edit_id: false,
                    protein: [],
                    foods: [],
                    carbohydrate: [],
                    vegetal: [],
                    fruit: [],
                    breakfast: [],
                    vegetalC: false
                },
                session: false,
                loading: true,
                user_id: null,
                user_name: null,
                history: [],
                week: false,
                group: {}
            }
        }
        case 'loading': {
            return {
                ...state,
                loading: action.payload
            }
        }
        case 'save': {
            return {
                ...state,
                history: action.payload.history,
                week: action.payload.week,
                group: action.payload.group || state.group
            }
        }
        case 'saveFoods': {
            return {
                ...state,
                group: {
                    ...state.group,
                    foods: action.payload
                }
            }
        }
        case 'edit': {
            return {
                ...state,
                currentPlate: action.payload
            }
        }
        case 'reset': {
            return {
                ...state,
                currentPlate: {
                    edit: false,
                    protein: [],
                    foods: [],
                    carbohydrate: [],
                    vegetal: [],
                    fruit: [],
                    breakfast: [],
                    vegetalC: false
                }
            }
        }
        case 'protein': {
            return {
                ...state,
                currentPlate: {
                    ...state.currentPlate,
                    protein: action.payload
                }
            }
        }
        case 'foods': {
            //! CHECKEO DE VEG C
            let vegetC = false
            //foods
            action.payload.forEach(food => {
                const { vegC } = state.group.foods.find(obj => obj.name === food)
                !!vegC && (vegetC = true)
            });
            //carbs
            !vegetC && state.group.vegC.forEach(e => {
                if (state.currentPlate.carbohydrate.includes(e.name)) vegetC = true
            });
            return {
                ...state,
                currentPlate: {
                    ...state.currentPlate,
                    foods: action.payload,
                    vegetalC: vegetC
                }
            }
        }
        case 'carbohydrate': {
            //! CHECKEO DE VEG C
            let vegetC = false
            //carbs
            state.group.vegC.forEach(e => {
                if (action.payload.includes(e.name)) vegetC = true
            });
            //foods
            !vegetC && state.currentPlate.foods.forEach(food => {
                const { vegC } = state.group.foods.find(obj => obj.name === food)
                !!vegC && (vegetC = true)
            });
            return {
                ...state,
                currentPlate: {
                    ...state.currentPlate,
                    carbohydrate: action.payload,
                    vegetalC: vegetC
                }
            }
        }
        case 'vegetal': {
            return {
                ...state,
                currentPlate: {
                    ...state.currentPlate,
                    vegetal: action.payload
                }
            }
        }
        case 'vegC': {
            return {
                ...state,
                currentPlate: {
                    ...state.currentPlate,
                    vegetalC: action.payload
                }
            }
        }
        case 'fruit': {
            return {
                ...state,
                currentPlate: {
                    ...state.currentPlate,
                    fruit: action.payload
                }
            }
        }
        case 'breakfast': {
            return {
                ...state,
                currentPlate: {
                    ...state.currentPlate,
                    breakfast: action.payload
                }
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function PlateProvider({ children }) {
    const [state, dispatch] = useReducer(plateReducer, {
        currentPlate: {
            edit_id: false,
            protein: [],
            foods: [],
            carbohydrate: [],
            vegetal: [],
            fruit: [],
            breakfast: [],
            vegetalC: false
        },
        session: false,
        loading: true,
        user_id: null,
        user_name: null,
        history: [],
        week: false,
        group: {}
    })
    const value = { state, dispatch }

    return <PlateContext.Provider value={value}>{children}</PlateContext.Provider>
}

function usePlate() {
    const context = useContext(PlateContext)
    if (context === undefined) {
        throw new Error('usePlate must be used within a PlateContext')
    }
    return context
}

export { PlateProvider, usePlate }