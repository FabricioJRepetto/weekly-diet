import { createContext, useReducer, useContext } from 'react'

export const PlateContext = createContext()

function plateReducer(state, action) {
    switch (action.type) {
        case 'login': {
            return {
                ...state,
                session: true,
                id: action.payload
            }
        }
        case 'save': {
            let aux = [...state.history, action.payload]
            return {
                ...state,
                history: aux
            }
        }
        case 'allHistory': {
            return {
                ...state,
                history: action.payload.history,
                week: action.payload.week
            }
        }
        case 'reset': {
            return {
                ...state,
                protein: [],
                carbohydrate: [],
                vegetal: [],
                vegetalC: false
            }
        }
        case 'protein': {
            return {
                ...state,
                protein: action.payload
            }
        }
        case 'carbohydrate': {
            return {
                ...state,
                carbohydrate: action.payload
            }
        }
        case 'vegetal': {
            return {
                ...state,
                vegetal: action.payload
            }
        }
        case 'vegC': {
            return {
                ...state,
                vegetalC: action.payload
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function PlateProvider({ children }) {
    const [state, dispatch] = useReducer(plateReducer, {
        protein: [],
        carbohydrate: [],
        vegetal: [],
        vegetalC: false,
        session: false,
        id: false,
        history: [],
        week: []
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