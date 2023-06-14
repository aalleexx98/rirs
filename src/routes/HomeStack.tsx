import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HomeScreen } from '../screens/HomeScreen';
import { RoutineStack } from './RoutineStack';
import { Tabs } from './Tabs';
import { Routine1DayScreen } from '../screens/Routines/Routine1DayScreen';
import { ExercicesScreen } from '../screens/Exercices/ExercicesScreen';
import { ExerciceDetailsScreen } from '../screens/Exercices/ExerciceDetailsScreen';
import { ExecuteRoutineScreen } from '../screens/ExecuteRoutineScreen';
import { ExerciceSetsData } from '../interfaces/exerciceInterface';
import { HistorialInfoScreen } from '../screens/Historial/HistorialInfoScreen';

export type RootStackParamsHome = {
    HomeStack: undefined
    HomeScreen: undefined,
    RoutineStack: undefined,
    Routine1DayScreen: { gender?: string, level?: string, muscles?: string[], type: "Generate" | "Edit" | "New", id?: string, title?: string },
    ExercicesScreen: { add: boolean; addExercice?: (exerciseId: string) => void },
    ExerciceDetailsScreen: { ref: string }
    ExecuteRoutineScreen: { id: string, title: string }
    HistorialInfoScreen: { exercices: ExerciceSetsData[], name: string, totalTime: number, finish: boolean, day?: Date }
    HistorialScreen: undefined
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
            <HomeS.Screen name="ExerciceDetailsScreen" component={ ExerciceDetailsScreen } />
            <HomeS.Screen name="ExecuteRoutineScreen" component={ ExecuteRoutineScreen } />
            <HomeS.Screen name="HistorialInfoScreen" component={ HistorialInfoScreen } />

        </HomeS.Navigator>
    )
}
