import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { ExercicesScreen } from '../screens/ExercicesScreen';
import { ExerciceDetailsScreen } from '../screens/ExerciceDetailsScreen';

export type RootStackParams = {
    ExercicesScreen: undefined,
    ExerciceDetailsScreen: { ref: string }
}

const ExerciceS = createStackNavigator<RootStackParams>();

export const ExerciceStack = () => {

    return (
        <ExerciceS.Navigator
            screenOptions={ {
                headerShown: false,
            } }
        >

            <ExerciceS.Screen name="ExercicesScreen" component={ ExercicesScreen } />
            <ExerciceS.Screen name="ExerciceDetailsScreen" component={ ExerciceDetailsScreen } />

        </ExerciceS.Navigator>
    )
}
