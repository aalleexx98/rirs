import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { ExercicesScreen } from '../screens/Exercices/ExercicesScreen';
import { ExerciceDetailsScreen } from '../screens/Exercices/ExerciceDetailsScreen';

export type RootStackParams = {
    ExercicesScreen: { add: boolean },
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
