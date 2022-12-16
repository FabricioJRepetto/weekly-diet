import { createContext, useReducer, useContext } from 'react'

export const PlateContext = createContext()

function plateReducer(state, action) {
    switch (action.type) {
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
        vegetalC: false
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