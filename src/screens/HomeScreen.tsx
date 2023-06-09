import React, { useContext, useEffect, useState } from 'react'
import { Button, View } from 'react-native'
import { AuthContext } from '../context/authContext/authContext';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { RoutineContext } from '../context/routineContext/routineContext';
import { Text } from 'react-native-paper';
import { Loading } from '../components/Loading';

export const HomeScreen = () => {

    const { theme: { colors, backgroundTab } } = useContext(ThemeContext);
    const { loadActiveRoutines, numberOfActiveRoutines, activeRoutines } = useContext(RoutineContext);
    const { } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await loadActiveRoutines();
        };
        fetchData();
    }, []);

    useEffect(() => {
        setIsLoading(false);
        activeRoutines.forEach(obj => {
            console.log(obj);
        });

    }, [activeRoutines]);

    if (isLoading) {
        return <Loading loadingText='Cargando rutinas activas' />;
    }

    return (
        <View style={ { padding: '3%' } }>
            <Text style={ { color: colors.text, fontSize: 35, fontWeight: '600' } }>Bienvenido!</Text>
            <Text style={ { color: colors.text, fontSize: 20, marginTop: 5 } }>Rutinas activas: { numberOfActiveRoutines }/7</Text>

        </View >
    )
}
