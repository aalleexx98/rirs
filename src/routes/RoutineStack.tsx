import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { RoutineScreen } from '../screens/Routines/RoutineScreen';
import { RoutineBodyScreen } from '../screens/Routines/RoutineBodyScreen';
import { Routine1DayScreen } from '../screens/Routines/Routine1DayScreen';
import { ExercicesScreen } from '../screens/Exercices/ExercicesScreen';
import { ExerciceDetailsScreen } from '../screens/Exercices/ExerciceDetailsScreen';

export type RootStackParamsRoutine = {
    RoutineScreen: undefined,
    RoutineBodyScreen: { gender: string, level: string },
    Routine1DayScreen: { gender?: string, level?: string, muscles?: string[], type: "Generate" | "Edit" | "New", id?: string, title?: string },
    ExercicesScreen: { add: boolean; addExercice?: (exerciseId: string) => void },
    ExerciceDetailsScreen: { ref: string }
    HomeScreen: undefined
    HomeStack: undefined

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
            <RoutineS.Screen name="Routine1DayScreen" component={ Routine1DayScreen } />
            <RoutineS.Screen name="ExercicesScreen" component={ ExercicesScreen } />
            <RoutineS.Screen name="ExerciceDetailsScreen" component={ ExerciceDetailsScreen } />

        </RoutineS.Navigator>
    )
}
