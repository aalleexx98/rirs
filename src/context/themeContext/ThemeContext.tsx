import React, { createContext, useEffect, useReducer } from "react";
import { ThemeState, themeReducer, lightTheme, darkTheme, createTheme } from './themeReducer';
import { useColorScheme } from "react-native";
import { DarkTheme } from "@react-navigation/native";

interface ThemeContextProps {
    theme: ThemeState;
    setDarkTheme: () => void;
    setLightTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: any) => {

    //Esto es para que coga el theme del sistema
    const colorScheme = useColorScheme();
    const [theme, dispatch] = useReducer(themeReducer, (colorScheme === 'dark') ? createTheme('dark', true) : createTheme('light', false))
    useEffect(() => {

        (colorScheme === 'light')
            ? setLightTheme()
            : setDarkTheme()

    }, [colorScheme])

    const setDarkTheme = () => {
        dispatch({ type: 'set_dark_theme' })
        console.log("dark")
    }

    const setLightTheme = () => {
        dispatch({ type: 'set_light_theme' })
        console.log("light")
    }

    return (
        <ThemeContext.Provider value={ {
            theme,
            setDarkTheme,
            setLightTheme,
        } }>
            { children }
        </ThemeContext.Provider>
    )
}