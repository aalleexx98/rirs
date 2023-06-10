import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HomeScreen } from '../screens/HomeScreen';
import { RoutineStack } from './RoutineStack';
import { Tabs } from './Tabs';
import { Routine1DayScreen } from '../screens/Routines/Routine1DayScreen';
import { ExercicesScreen } from '../screens/ExercicesScreen';

export type RootStackParamsHome = {
    HomeScreen: undefined,
    RoutineStack: undefined,
    Routine1DayScreen: { gender?: string, level?: string, muscles?: string[], type: "Generate" | "Edit" | "New", id?: string },
    ExercicesScreen: { add: boolean; addExercice?: (exerciseId: string) => void },

}

const HomeS = createStackNavigator<RootStackParamsHome>();

export const HomeStack = () => {

    return (
        <HomeS.Navigator
            screenOptions={ {
                headerShown: false,
            } }
        >

            <HomeS.Screen name="HomeScreen" component={ HomeScreen } />
            <HomeS.Screen name="Routine1DayScreen" component={ Routine1DayScreen } />
            <HomeS.Screen name="ExercicesScreen" component={ ExercicesScreen } />


        </HomeS.Navigator>
    )
}
