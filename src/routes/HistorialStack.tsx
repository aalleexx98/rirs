import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Routine1DayScreen } from '../screens/Routines/Routine1DayScreen';
import { HistorialScreen } from '../screens/Historial/HistorialScreen';
import { HistorialInfoScreen } from '../screens/Historial/HistorialInfoScreen';

export type RootStackParamsHistorial = {
    HistorialScreen: undefined
    HistorialInfoScreen: undefined
}

const HistorialS = createStackNavigator<RootStackParamsHistorial>();

export const HistorialStack = () => {

    return (
        <HistorialS.Navigator
            screenOptions={ {
                headerShown: false,
            } }
        >

            <HistorialS.Screen name="HistorialScreen" component={ HistorialScreen } />
            <HistorialS.Screen name="HistorialInfoScreen" component={ HistorialInfoScreen } />

        </HistorialS.Navigator>
    )
}
