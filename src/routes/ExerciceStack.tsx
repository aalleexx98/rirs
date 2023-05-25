import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { ExercicesScreen } from '../screens/ExercicesScreen';
import { ExerciceDetailsScreen } from '../screens/ExerciceDetailsScreen';
import { exercicePreview } from '../interfaces/exerciceInterface';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type RootStackParams = {
    ExercicesScreen: undefined,
    ExerciceDetailsScreen: { ref: string }
}

const ExerciceS = createStackNavigator<RootStackParams>();

export const ExerciceStack = () => {

    const { theme } = useContext(ThemeContext);

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
