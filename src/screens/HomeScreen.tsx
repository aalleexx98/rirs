import React, { useContext, useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import { AuthContext } from '../context/authContext/authContext';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { RoutineContext } from '../context/routineContext/routineContext';

export const HomeScreen = () => {
    const { user } = useContext(AuthContext);
    const { theme: { colors, backgroundTab } } = useContext(ThemeContext);
    const { loadActiveRoutines, activeRoutines } = useContext(RoutineContext);

    useEffect(() => {
        loadActiveRoutines();
    }, [])


    return (
        <View>
            <Text>
                { JSON.stringify(user, null, 5) }
            </Text>

            <Text>{ activeRoutines }</Text>
        </View >
    )
}
