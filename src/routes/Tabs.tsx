import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { ExercicesScreen } from '../screens/ExercicesScreen';
import { RoutineScreen } from '../screens/Routines/RoutineScreen';
import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform, KeyboardAvoidingView } from 'react-native';
import { HistorialScreen } from '../screens/HistorialScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ExerciceStack } from './ExerciceStack';
import { RoutineStack } from './RoutineStack';
import { HomeStack } from './HomeStack';

const Tab = createBottomTabNavigator();

export const Tabs = () => {

    const { theme: { colors, backgroundTab } } = useContext(ThemeContext);

    return (

        <Tab.Navigator
            screenOptions={ ({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    paddingVertical: (Platform.OS === 'ios') ? 0 : 5,
                    backgroundColor: backgroundTab,
                    borderWidth: 0,
                    elevation: 0,
                    height: (Platform.OS === 'ios') ? 30 : 50,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.text,
                tabBarHideOnKeyboard: true

            }) }
            initialRouteName='HomeStack'
        >
            <Tab.Screen
                name="HistorialScreen"
                component={ HistorialScreen }
                options={ {
                    tabBarLabel: 'Historial',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={ color }
                            size={ 25 }
                            name="stats-chart-outline"
                        />
                    )
                } }
            />

            <Tab.Screen
                name="ExerciceStack"
                component={ ExerciceStack }
                options={ {
                    tabBarLabel: 'Ejercicios',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={ color }
                            size={ 25 }
                            name="barbell-outline"
                        />
                    )
                } }
            />

            <Tab.Screen
                name="HomeStack"
                component={ HomeStack }
                options={ {
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={ color }
                            size={ 25 }
                            name="home-outline"
                        />
                    ),
                    unmountOnBlur: true
                } }

            />

            <Tab.Screen
                name="RoutineStack"
                component={ RoutineStack }
                options={ {
                    tabBarLabel: 'Rutinas',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={ color }
                            size={ 25 }
                            name="clipboard-outline"
                        />
                    ),
                    unmountOnBlur: true
                } }
            />

            <Tab.Screen
                name="ProfileScreen"
                component={ ProfileScreen }
                options={ {
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={ color }
                            size={ 25 }
                            name="person-outline"
                        />
                    )
                } }
            />
        </Tab.Navigator>

    );
}