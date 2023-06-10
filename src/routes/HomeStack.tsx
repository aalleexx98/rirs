import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HomeScreen } from '../screens/HomeScreen';
import { RoutineStack } from './RoutineStack';
import { Tabs } from './Tabs';

export type RootStackParamsHome = {
    HomeScreen: undefined,
    RoutineStack: undefined,
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
            <HomeS.Screen name="Routine1DayScreen" component={ HomeScreen } />


        </HomeS.Navigator>
    )
}
