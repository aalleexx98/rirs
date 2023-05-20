import { createContext, useEffect, useReducer } from "react";
//import { LoginData, LoginResponse, RegisterData, Usuario } from "../interfaces/appInterface";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AuthState, authReducer } from "./authReducer";
//import cafeApi from "../api/cafeApi";
import { getItemStorage, removeItem, setItemStorage } from "../../helpers/helperStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginData, RegisterData } from "../../interfaces/loginInterficie";

// Ojo porque estas props son del backend de fernando y no de firebase
type AuthContextProps = {
    errorMessage: string; //Para mandar mensaje de error
    uid: string | null;
    user: FirebaseAuthTypes.User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated'; //Checking para cuando abre la app mirar si ya estaba loggin
    signUp: (registerData: RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState: AuthState = { //Estado inicial del authReducer
    status: 'checking',
    uid: null,
    user: null,
    errorMessage: ''
}


export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInicialState);

    // useEffect(() => {
    //     checkToken();
    // }, [])

    // //Esto habria que cambiarlo para la data de firebase
    // const checkToken = async () => {
    //     const token = getItemStorage('token');

    //     // No token, no autenticado
    //     if (!token) return dispatch({ type: 'notAuthenticated' });

    //     // Hay token
    //     const resp = await cafeApi.get('/auth'); //Esto comprueba si el token existe
    //     if (resp.status !== 200) { //SI hay token registrado (getItemStorage) pero no existe
    //         return dispatch({ type: 'notAuthenticated' });
    //     }

    //     //Si esta lo guardamos y hacemos singUp
    //     setItemStorage('token', resp.data.token);
    //     dispatch({
    //         type: 'signUp',
    //         payload: {
    //             token: resp.data.token,
    //             user: resp.data.usuario
    //         }
    //     });
    // }

    const signUp = async ({ name, email, password }: RegisterData) => {

        const hasUppercaseAndLowercase = /[A-Z]/.test(password) && /[a-z]/.test(password);

        if (password.length < 8) {
            dispatch({
                type: 'addError',
                payload: 'La contraseña debe de contener mínimo 8 caracteres'
            });
        } else if (!hasUppercaseAndLowercase) {
            dispatch({
                type: 'addError',
                payload: 'La contraseña debe de contener mínimo 1 minúscula y 1 mayúscula'
            });
        } else {
            await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                    const user = userCredential.user;
                    dispatch({
                        type: 'signUp',
                        payload: {
                            uid: user.uid,
                            user: user
                        }
                    });

                    setItemStorage('uid', user.uid);
                    console.log(user);
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        dispatch({
                            type: 'addError',
                            payload: 'El email ya esta registrado'
                        });
                    }
                    if (error.code === 'auth/invalid-email') {
                        dispatch({
                            type: 'addError',
                            payload: 'El email es invalido'
                        });
                    }
                });
        }
    };

    //LoginData es del tipo que le entra (lo que necesita mandar a la peti)
    //LoginResponse lo que recibira de la petición.
    const signIn = async ({ email, password }: LoginData) => {
        // try {

        //     //Correo y password es la data
        //     const { data } = await cafeApi.post<LoginResponse>('/auth/login', { correo, password });
        //     dispatch({//Es dispatch de authReducer
        //         type: 'signUp',
        //         payload: {
        //             token: data.token,
        //             user: data.usuario
        //         }
        //     });

        //     setItemStorage('token', data.token);

        // } catch (error: any) {//Probar mas adelante de quitar lo de :any
        //     dispatch({ //Es dispatch de authReducer
        //         type: 'addError',
        //         payload: error.response.data.msg || 'Información incorrecta' //Si msg viene nulo mando el msg de info incorrecta
        //     })
        // }
    };

    const logOut = async () => {
        //removeItem('token')
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider value={ {
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        } }>
            { children }
        </AuthContext.Provider >
    )
}