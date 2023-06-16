import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE ={
  host: JSON.parse(localStorage.getItem("host")) || null,
  loading:false,
  error:null,
};

export const AuthContextHost =createContext(INITIAL_STATE);

const AuthReducer =(state,action)=>{
    switch(action.type){
      case "LOGIN_START" :
        return {
            host: null,
            loading:true,
            error:null,
        };
        case "LOGIN_SUCCESS" :
            return {
                host: action.payload,
                loading:false,
                error:null,
            };
            case "LOGIN_FAILURE" :
                return {
                    host: null,
                    loading:false,
                    error:action.payload,
                };

                case "LOGOUT" :
                return {
                    host: null,
                    loading:false,
                    error:null,
                };


        default:
                return state;
    }
};

export const AuthContextHostProvider =({children}) =>{
    const [state ,dispatch]=useReducer(AuthReducer,INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("host",JSON.stringify(state.host))
    },[state.host])
    return(
        <AuthContextHost.Provider 
        value={{
            host: state.host,
             loading:state.loading, 
             error:state.error,
             dispatch,
            }}
        >
            {children}
        </AuthContextHost.Provider>
    );
};