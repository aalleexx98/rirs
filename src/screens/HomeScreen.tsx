import React, { useContext, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { AuthContext } from '../context/authContext/authContext';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { RoutineContext } from '../context/routineContext/routineContext';
import { Button, Text } from 'react-native-paper';
import { Loading } from '../components/Loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsHome } from '../routes/HomeStack';
import { RoutinePreview } from '../components/routine/RoutinePreview';

export const HomeScreen = () => {

    const { theme: { colors, backgroundTab } } = useContext(ThemeContext);
    const { loadActiveRoutines, numberOfActiveRoutines, activeRoutines } = useContext(RoutineContext);
    const { } = useContext(AuthContext);
    const navigation = useNavigation<StackNavigationProp<RootStackParamsHome>>();

    const [isLoadingRoutines, setIsLoadingRoutines] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await loadActiveRoutines();
            setIsLoadingRoutines(false);
        };

        fetchData();
    }, []);

    if (isLoadingRoutines) {
        return <Loading loadingText='Cargando rutinas activas' />;
    }

    return (
        <View style={ { padding: '3%' } }>
            <Text style={ { color: colors.text, fontSize: 35, fontWeight: '600' } }>Bienvenido!</Text>
            <Text style={ { color: colors.text, fontSize: 20, marginTop: 5 } }>Rutinas activas: { numberOfActiveRoutines }/7</Text>

            { numberOfActiveRoutines === 0 ?
                <>
                    <Text style={ { textAlign: 'center', color: colors.text, marginTop: 50 } }>No tienes rutinas activas, crea tu primera rutina ahora:</Text>

                    <TouchableOpacity
                        style={ { flex: 0, alignSelf: 'center', backgroundColor: colors.primary, borderRadius: 5, marginTop: 10 } }
                        activeOpacity={ 0.8 }
                        onPress={ () => navigation.navigate('RoutineStack') } //TODO: MIRAR COMO PONER ESTO EN STACKPROPS
                    >
                        <Text style={ { color: colors.text, padding: 10, fontSize: 16 } }>Generar Rutina</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={ { flex: 0, alignSelf: 'center', backgroundColor: colors.primary, borderRadius: 5, marginTop: 10 } }
                        activeOpacity={ 0.8 }

                    >
                        <Text style={ { color: colors.text, padding: 10, fontSize: 16 } }>Crear Rutina</Text>
                    </TouchableOpacity>

                </>
                :
                <>
                    <FlatList
                        data={ activeRoutines }
                        keyExtractor={ (item, index) => `${ index }-${ item.title }` }
                        showsVerticalScrollIndicator={ false }
                        style={ { marginTop: 20, marginBottom: 50 } }

                        //Aqui es porque llamo la pantalla en 2 sitios distintos, entonces si add existe es que estoy en routines si no en ejercicios y por lo tanto no tiene addExercice
                        renderItem={ ({ item, index }) => (
                            <RoutinePreview
                                title={ item.title }
                                id={ item.id }
                            />
                        ) }
                    />
                </> }


        </View >


    )
}
