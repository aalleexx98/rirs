import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HomeScreen } from '../screens/HomeScreen';

export type RootStackParamsHome = {
    HomeScreen: undefined,
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

        </HomeS.Navigator>
    )
}
