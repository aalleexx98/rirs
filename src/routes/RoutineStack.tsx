import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { RoutineScreen } from '../screens/Routines/RoutineScreen';
import { RoutineBodyScreen } from '../screens/Routines/RoutineBodyScreen';

export type RootStackParamsRoutine = {
    RoutineScreen: undefined,
    //RoutineBodyScreen: { gender: string, level: string } //VOLVER A PONER ESTA
    RoutineBodyScreen: undefined,
}

const RoutineS = createStackNavigator<RootStackParamsRoutine>();

export const RoutineStack = () => {

    return (
        <RoutineS.Navigator
            screenOptions={ {
                headerShown: false,
            } }
        >

            <RoutineS.Screen name="RoutineScreen" component={ RoutineScreen } />
            <RoutineS.Screen name="RoutineBodyScreen" component={ RoutineBodyScreen } />

        </RoutineS.Navigator>
    )
}
