import { createContext } from "react";
import { useEffect, useReducer } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const initialState = {
    user: localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : null,
    role: localStorage.getItem('role') || null,
}

export const AuthContext = createContext(initialState);

const authReducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN_START':
            return {
                user: null,
                role: null,
            };
        case "LOGIN_SUCCESS":
            return{
                user: action.payload.user,
                role: action.payload.role,
            };
        case "LOGOUT":
            return{
                user: null,
                role: null,
            };
        case "UPDATE_USER":
            return{
                ...state,
                user: action.payload.user,
                role: action.payload.role,
            };
        default: return state;
        
    }
};

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(authReducer, initialState)

    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('role', state.role)
    }, [state]);

    return <AuthContext.Provider 
                value={{
                    user: state.user, 
                    role: state.role, 
                    dispatch}}
            >
        {children}
    </AuthContext.Provider>
}