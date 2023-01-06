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
                    foods: [],
                    carbohydrate: [],
                    vegetal: [],
                    vegetalC: false
                },
                session: false,
                loading: true,
                id: false,
                history: [],
                week: [],
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
            return {
                ...state,
                currentPlate: {
                    ...state.currentPlate,
                    foods: action.payload
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
            foods: [],
            carbohydrate: [],
            vegetal: [],
            vegetalC: false
        },
        session: false,
        loading: true,
        id: false,
        history: [],
        week: [],
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