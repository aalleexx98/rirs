import { FirebaseAuthTypes } from '@react-native-firebase/auth';


export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}