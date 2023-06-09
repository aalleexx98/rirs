import React, { useContext, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { AuthContext } from '../context/authContext/authContext';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { RoutineContext } from '../context/routineContext/routineContext';
import { Button, Text } from 'react-native-paper';
import { Loading } from '../components/Loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {

    const { theme: { colors, backgroundTab } } = useContext(ThemeContext);
    const { loadActiveRoutines, numberOfActiveRoutines, activeRoutines, isRoutines } = useContext(RoutineContext);
    const { } = useContext(AuthContext);
    const navigation = useNavigation();

    const [isLoadingRoutines, setIsLoadingRoutines] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await loadActiveRoutines();
            setIsLoadingRoutines(false);
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     if (!isLoadingRoutines && activeRoutines.length > 0) {
    //         console.log()
    //         activeRoutines.forEach(routine => {
    //             routine.exercises.forEach(exercise => {
    //                 console.log(exercise.position);
    //             });
    //         });
    //     }
    // }, [isLoadingRoutines, activeRoutines]);

    if (isRoutines || isLoadingRoutines) {
        return <Loading loadingText='Cargando rutinas activas' />;
    }

    return (
        <View style={ { padding: '3%' } }>
            <Text style={ { color: colors.text, fontSize: 35, fontWeight: '600' } }>Bienvenido!</Text>
            <Text style={ { color: colors.text, fontSize: 20, marginTop: 5 } }>Rutinas activas: { numberOfActiveRoutines }/7</Text>

            { activeRoutines.length === 0 ?
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
                        keyExtractor={ (title) => title.title }
                        showsVerticalScrollIndicator={ false }
                        style={ { marginBottom: 100 } } //Misma altura que exerciceCard

                        //Aqui es porque llamo la pantalla en 2 sitios distintos, entonces si add existe es que estoy en routines si no en ejercicios y por lo tanto no tiene addExercice
                        renderItem={ ({ item }) => <Text>{ item.title }</Text> }
                    />
                </> }


        </View >


    )
}
