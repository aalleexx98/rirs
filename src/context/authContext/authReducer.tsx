import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    uid: string | null;
    errorMessage: string;
    user: FirebaseAuthTypes.User | null;
}

type AuthAction =
    | { type: 'signUp', payload: { uid: string, user: FirebaseAuthTypes.User } } //Esto sirve para signin y registrar
    | { type: 'addError', payload: string }
    | { type: 'removeError' } //Para quitar la alerta cuando sale el addError y le da a ok
    | { type: 'notAuthenticated' }//Si el uid del user falla limpia el estado 
    | { type: 'logout' }


export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                uid: null,
                errorMessage: action.payload
            }

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            };

        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                uid: action.payload.uid,
                user: action.payload.user
            };

        case 'logout': //No es que no haga nada, si no que hace lo mismo que notAuthenticated
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                uid: null,
                user: null
            }

        default:
            return state;
    }

}

