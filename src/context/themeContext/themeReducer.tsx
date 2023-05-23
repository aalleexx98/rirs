import { Theme, DarkTheme } from '@react-navigation/native';
import { Background } from '../../components/login/Background';

type ThemeAction =
    | { type: 'set_light_theme' }
    | { type: 'set_dark_theme' }

export interface ThemeState extends Theme {
    currentTheme: 'light' | 'dark',
    dividerColor: string;
    textSecondary: string;
    backgroundTab: string;
}

//EN EL RETURN DEL themeReducer,se podria poner return { ...lightTheme }, pero es mala practica
export const lightTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    dividerColor: '#243A73',
    textSecondary: '#FFFFFF',
    backgroundTab: 'rgba(255,255,255,0.82)',
    colors: {
        primary: '#8C03FC',
        background: '#FFFFFF',
        card: '#000000', //nO SE XD
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
    backgroundTab: 'rgba(0, 0, 0, 0.82)',
    colors: {
        primary: '#8C03FC',
        background: '#000000',
        card: '#000000',
        text: '#FFFFFF',
        border: '#000000',
        notification: '#FFFFFF',
    }
}

export const createTheme = (currentTheme: 'light' | 'dark', dark: boolean): ThemeState => {
    const baseTheme: ThemeState = {
        currentTheme,
        dark,
        dividerColor: '#243A73',
        textSecondary: '#FFFFFF',
        backgroundTab: dark ? 'rgba(0, 0, 0, 0.82)' : 'rgba(255,255,255,0.82)',
        colors: {
            primary: '#8C03FC',
            background: dark ? '#000000' : '#FFFFFF',
            card: '#000000',
            text: dark ? '#FFFFFF' : '#000000',
            border: '#000000',
            notification: '#FFFFFF',
        }
    };

    return baseTheme;
};

export const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {

    switch (action.type) {
        case 'set_dark_theme':
            return createTheme('dark', true);
        case 'set_light_theme':
            return createTheme('light', false);
        default:
            return state;
    }
}