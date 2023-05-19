import { Theme, DarkTheme } from '@react-navigation/native';

type ThemeAction =
    | { type: 'set_light_theme' }
    | { type: 'set_dark_theme' }

export interface ThemeState extends Theme {
    currentTheme: 'light' | 'dark',
    dividerColor: string;
    textSecondary: string;
}

//EN EL RETURN DEL themeReducer,se podria poner return { ...lightTheme }, pero es mala practica
export const lightTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    dividerColor: '#243A73',
    textSecondary: '#FFFFFF',
    colors: {
        primary: '#8C03FC',
        background: '#FFFFFF',
        card: '#A5BECC', //nO SE XD
        text: '#000000',
        border: '#000000',
        notification: '#FFFFFF',
    }
}

export const darkTheme: ThemeState = {
    currentTheme: 'dark',
    dark: true,
    dividerColor: '#243A73',
    textSecondary: '#FFFFFF',
    colors: {
        primary: '#8C03FC',
        background: '#000000',
        card: '#A5BECC',
        text: '#FFFFFF',
        border: '#000000',
        notification: '#FFFFFF',
    }
}

export const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {

    switch (action.type) {
        case 'set_dark_theme':
            return {
                currentTheme: 'dark',
                dark: true,
                dividerColor: '#DCD7C9',
                textSecondary: '#FFFFFF',
                colors: {
                    primary: '#8C03FC',
                    background: '#000000',
                    card: '#A5BECC',
                    text: '#FFFFFF',
                    border: '#000000',
                    notification: '#FFFFFF',
                }
            }
        case 'set_light_theme':
            return {
                currentTheme: 'light',
                dark: false,
                dividerColor: '#243A73',
                textSecondary: '#FFFFFF',
                colors: {
                    primary: '#8C03FC',
                    background: '#FFFFFF',
                    card: '#A5BECC', //nO SE XD
                    text: '#000000',
                    border: '#000000',
                    notification: '#FFFFFF',
                }
            }
        default:
            return state;
    }
}