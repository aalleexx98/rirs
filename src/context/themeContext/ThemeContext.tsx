import React, { createContext, useEffect, useReducer } from "react";
import { ThemeState, themeReducer, lightTheme, darkTheme } from './themeReducer';
import { useColorScheme } from "react-native";
import { DarkTheme } from "@react-navigation/native";

interface ThemeContextProps {
    theme: ThemeState; //TODO
    setDarkTheme: () => void;
    setLightTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: any) => {

    //Esto es para que coga el theme del sistema
    const colorScheme = useColorScheme();
    const [theme, dispatch] = useReducer(themeReducer, (colorScheme === 'dark') ? darkTheme : lightTheme) //TODO
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