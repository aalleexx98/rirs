import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/HomeScreens/LoginScreen';
import { RegisterScreen } from '../screens/HomeScreens/RegisterScreen';
import SplashScreen from 'react-native-splash-screen'
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export const Navigator = () => {

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        SplashScreen.hide();
    }, [])

    return (
        <NavigationContainer theme={ theme }>
            <Stack.Navigator
                screenOptions={ {
                    headerShown: false,
                } }
            >
                <Stack.Screen name="LoginScreen" component={ LoginScreen } />
                <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
            </Stack.Navigator>
        </NavigationContainer>
    );
}