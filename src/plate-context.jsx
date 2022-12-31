import { createContext, useReducer, useContext } from 'react'

export const PlateContext = createContext()

function plateReducer(state, action) {
    switch (action.type) {
        case 'login': {
            return {
                ...state,
                session: true,
                id: action.payload,
                loading: false
            }
        }
        case 'logout': {
            return {
                currentPlate: {
                    edit_id: false,
                    protein: [],
                    carbohydrate: [],
                    vegetal: [],
                    vegetalC: false
                },
                session: false,
                loading: false,
                id: false,
                history: [],
                week: [],
                mealMenu: false
            }
        }
        case 'loading': {
            return {
                ...state,
                loading: action.payload
            }
        }
        case 'mealMenu': {
            return {
                ...state,
                mealMenu: action.payload
            }
        }
        case 'save': {
            return {
                ...state,
                history: action.payload.history,
                week: action.payload.week
            }
        }
        case 'edit': {
            return {
                ...state,
                mealMenu: true,
                currentPlate: action.payload
            }
        }
        case 'reset': {
            return {
                ...state,
                currentPlate: {
                    edit: false,
                    protein: [],
                    carbohydrate: [],
                    vegetal: [],
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
        case 'carbohydrate': {
            return {
                ...state,
                currentPlate: {
                    ...state.currentPlate,
                    carbohydrate: action.payload
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
            carbohydrate: [],
            vegetal: [],
            vegetalC: false
        },
        session: false,
        loading: true,
        id: false,
        history: [],
        week: [],
        mealMenu: false
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