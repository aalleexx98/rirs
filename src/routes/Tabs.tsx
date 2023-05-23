import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { ExercicesScreen } from '../screens/ExercicesScreen';
import { RoutineScreen } from '../screens/RoutineScreen';
import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform, Text } from 'react-native';
import { HistorialScreen } from '../screens/HistorialScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export const Tabs = () => {

    const { theme: { colors, backgroundTab }, theme } = useContext(ThemeContext);

    return (
        //TODO: ¿CUANDO LO TENGA REDEFINIR LOS TABS PARA HACERLO COMO LO DE LOS POKEMONS?

        <Tab.Navigator
            screenOptions={ ({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    paddingBottom: (Platform.OS === 'ios') ? 0 : 5,
                    backgroundColor: backgroundTab,
                    borderWidth: 0,
                    elevation: 0,
                    height: (Platform.OS === 'ios') ? 50 : 60,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.text,
            }) }
            initialRouteName='HomeScreen'
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
                name="ExercicesScreen"
                component={ ExercicesScreen }
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
                name="HomeScreen"
                component={ HomeScreen }
                options={ {
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={ color }
                            size={ 25 }
                            name="home-outline"
                        />
                    )
                } }
            />

            <Tab.Screen
                name="RoutineScreen"
                component={ RoutineScreen }
                options={ {
                    tabBarLabel: 'Rutinas',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={ color }
                            size={ 25 }
                            name="clipboard-outline"
                        />
                    )
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