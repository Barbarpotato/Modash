import { createContext, useContext, useReducer } from "react"

const authContext = createContext(null)

const auth = { auth: sessionStorage.getItem('auth') === 'true' ? true : false }

const reducer = (_state, action) => {
    switch (action.type) {
        case 'login':
            return { auth: true }
        case 'logout':
            return { auth: false }
        default:
            throw new Error
    }
}

export const AuthProvider = ({ children }) => {
    const [authed, dispatch] = useReducer(reducer, auth)
    return (
        <authContext.Provider value={[authed, dispatch]}>
            {children}
        </authContext.Provider>
    )
}

export const useAuthContext = () => useContext(authContext)