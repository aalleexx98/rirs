import { createContext, useEffect, useReducer } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AuthState, authReducer } from "./authReducer";
import { removeItem, setItemStorage } from "../../helpers/helperStorage";
import { LoginData, RegisterData } from "../../interfaces/loginInterficie";
import firestore from '@react-native-firebase/firestore';

type AuthContextProps = {
    errorMessage: string;
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

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            if (user) {
                setItemStorage('uid', user.uid);
                dispatch({
                    type: 'signUp',
                    payload: {
                        uid: user.uid,
                        user: user
                    }
                });
            } else {
                return dispatch({ type: 'notAuthenticated' });
            }
        });
        // Limpia el evento de escucha cuando el componente se desmonta
        return () => unsubscribe();
    }, []);

    const signUp = async ({ name, email, password }: RegisterData) => {

        if (await checkUsername(name) && checkPassword(password)) {
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

                    firestore()
                        .collection('users')
                        .doc(user.uid)
                        .set({
                            uid: user.uid,
                            name: name,
                            email: email,
                            activeRoutines: 0,
                        });

                    setItemStorage('uid', user.uid);
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
                            payload: 'El email no es valido'
                        });
                    }
                });
        }
    };

    const checkUsername = async (name: string): Promise<boolean> => {

        if (name.includes(' ') || name.length === 0) { //TODO: Mejorar esto
            dispatch({
                type: 'addError',
                payload: 'El username no puede contener espacios o estar vacío'
            });
            return false;
        }

        const usersRef = firestore().collection('users');
        const querySnapshot = await usersRef.where('name', '==', name).get();

        if (!querySnapshot.empty) {
            dispatch({
                type: 'addError',
                payload: 'El UserName ya existe'
            });
        }

        return querySnapshot.empty;
    }

    const checkPassword = (password: string): boolean => {
        const hasUppercaseAndLowercase = /[A-Z]/.test(password) && /[a-z]/.test(password);

        if (password.length < 8) {
            dispatch({
                type: 'addError',
                payload: 'La contraseña debe de contener mínimo 8 caracteres'
            });
            return false;
        } else if (!hasUppercaseAndLowercase) {
            dispatch({
                type: 'addError',
                payload: 'La contraseña debe de contener mínimo 1 minúscula y 1 mayúscula'
            });
            return false;
        }

        return true;
    }

    const signIn = async ({ email, password }: LoginData) => {
        if (email && password) {
            await auth()
                .signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    const user = userCredential.user;

                    dispatch({//Es dispatch de authReducer
                        type: 'signUp',
                        payload: {
                            uid: user.uid,
                            user: user,
                        }
                    });

                    setItemStorage('uid', user.uid);
                })
                .catch(error => {
                    if (error.code === 'auth/user-not-found') {
                        dispatch({
                            type: 'addError',
                            payload: 'Email no registrado a ninguna cuenta'
                        });
                    }
                    if (error.code === 'auth/wrong-password') {
                        dispatch({
                            type: 'addError',
                            payload: 'Contraseña incorrecta'
                        });
                    }
                    if (error.code === 'auth/invalid-email') {
                        dispatch({
                            type: 'addError',
                            payload: 'El email no es valido'
                        });
                    }
                });
        }
    };

    const logOut = async () => {
        auth().signOut();
        removeItem('uid');
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