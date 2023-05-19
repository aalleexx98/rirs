import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import SplashScreen from 'react-native-splash-screen'
import { useEffect } from 'react';

const Stack = createStackNavigator();

export const Navigator = () => {

    useEffect(() => {
        SplashScreen.hide();
    }, [])

    return (
        <Stack.Navigator
            screenOptions={ {
                headerShown: false,
            } }
        >
            <Stack.Screen name="LoginScreen" component={ LoginScreen } />
            <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
        </Stack.Navigator>
    );
}