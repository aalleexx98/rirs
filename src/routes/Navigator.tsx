import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import SplashScreen from 'react-native-splash-screen'
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/authContext/authContext';
import { LoadingScreen } from '../screens/LoadingScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { Tabs } from './Tabs';

const Stack = createStackNavigator();

export const Navigator = () => {

    const { theme } = useContext(ThemeContext);
    const { status } = useContext(AuthContext);

    useEffect(() => {
        SplashScreen.hide();
    }, [])

    if (status === 'checking') return <LoadingScreen />

    return (
        <NavigationContainer theme={ theme }>
            <Stack.Navigator
                screenOptions={ {
                    headerShown: false,
                } }
            >
                {
                    (status !== 'authenticated')
                        ? (
                            <>
                                <Stack.Screen name="LoginScreen" component={ LoginScreen } />
                                <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
                            </>
                        )
                        : (
                            <>
                                <Stack.Screen name="Tabs" component={ Tabs } />
                            </>
                        )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}