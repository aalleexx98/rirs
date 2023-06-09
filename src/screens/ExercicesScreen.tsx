import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Dimensions, FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../theme/globalTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { Loading } from '../components/Loading';
import { ExerciceCard } from '../components/exercices/exerciceCard';
import { SearchInput } from '../components/exercices/searchInput';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsRoutine } from '../routes/RoutineStack';
import Icon from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';
import { RoutineContext } from '../context/routineContext/routineContext';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);


const screenWidth = Dimensions.get('window').width;
interface Props extends StackScreenProps<RootStackParamsRoutine, 'ExercicesScreen'> { };

export const ExercicesScreen = ({ navigation, route }: Props) => {

    const { add = false } = route.params || {}; // Miro si add existe para sabe si viene de routine o de ejercicios.

    const { theme: { colors } } = useContext(ThemeContext);
    const { exerciceFiltered, isFetching, searchExercice } = useContext(RoutineContext);

    const [term, setTerm] = useState('');

    const [muscleOpen, setMuscleOpen] = useState(false);
    const [muscleValue, setMuscleValue] = useState('todos');
    const [muscleItems, setMuscleItems] = useState([
        { label: 'Todos los musculos', value: 'todos' },
        { label: 'Abdomen', value: 'abdomen' },
        { label: 'Abductores', value: 'abductores' },
        { label: 'Aductores', value: 'aductores' },
        { label: 'Antebrazo', value: 'antebrazo' },
        { label: 'Biceps', value: 'biceps' },
        { label: 'Cuadriceps', value: 'cuadriceps' },
        { label: 'Espalda', value: 'espalda' },
        { label: 'Gluteos', value: 'gluteos' },
        { label: 'Hombro', value: 'hombro' },
        { label: 'Isquiosurales', value: 'isquiosurales' },
        { label: 'Pectoral', value: 'pectoral' },
        { label: 'Trapecio', value: 'trapecio' },
        { label: 'Triceps', value: 'triceps' }
    ]);

    const [equipmentOpen, setEquipmentOpen] = useState(false);
    const [equipmentValue, setEquipmentValue] = useState('todos');
    const [equipmentItems, setEquipmentItems] = useState([
        { label: 'Todos los equipamientos', value: 'todos' },
        { label: 'Barra', value: 'barra' },
        { label: 'Mancuerna', value: 'mancuerna' },
        { label: 'Maquina', value: 'maquina' },
        { label: 'Multipower', value: 'multipower' },
        { label: 'Polea', value: 'polea' },
        { label: 'Peso Libre', value: 'peso_libre' },
    ]);

    useEffect(() => {
        searchExercice(term, equipmentValue, muscleValue);
    }, [term, equipmentValue, muscleValue])

    if (isFetching) {
        return <Loading loadingText='Cargando Ejercicios' />
    }

    return (
        <View style={ { ...globalStyles.globalMargin } }>

            { add && <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                <TouchableOpacity
                    onPress={ () => navigation.pop() }
                    activeOpacity={ 0.8 }
                >
                    <Icon
                        name="arrow-back-outline"
                        color={ colors.text }
                        size={ 30 }
                    />
                </TouchableOpacity>

                <Text style={ { color: colors.text, fontWeight: '600', fontSize: 20, marginLeft: 10 } }>Agregar Ejercicio</Text>

            </View> }


            <SearchInput
                //Cada vez qe recoga un term nuevo
                onDebounce={ (value) => setTerm(value) }//recoge el valor del onDebounce del useEffect y lo cambia al usestate de term
                style={ {
                    zIndex: 999,
                    width: screenWidth - 40, //-20 del horizontal + 20 para derecha
                    marginTop: 10,
                    marginBottom: 15,
                } }
            />

            <View style={ { zIndex: 20, flexDirection: 'row', marginBottom: 15, columnGap: 5 } }>
                <DropDownPicker
                    open={ muscleOpen }
                    value={ muscleValue }
                    items={ muscleItems }
                    setOpen={ setMuscleOpen }
                    setValue={ setMuscleValue }
                    setItems={ setMuscleItems }
                    placeholder="Musculo"
                    //onOpen={ onMuscleOpen }
                    containerStyle={ { flex: 1 } }
                    modalAnimationType="slide"
                    listMode="MODAL"
                />

                <DropDownPicker
                    open={ equipmentOpen }
                    value={ equipmentValue }
                    items={ equipmentItems }
                    setOpen={ setEquipmentOpen }
                    setValue={ setEquipmentValue }
                    setItems={ setEquipmentItems }
                    //onOpen={ onEquipamentOpen }
                    containerStyle={ { flex: 1 } }
                    placeholder="Equipamiento"
                    modalAnimationType="slide"
                    listMode="MODAL"
                />
            </View>

            <FlatList
                data={ exerciceFiltered }
                keyExtractor={ (exercice) => exercice.name }
                showsVerticalScrollIndicator={ false }
                style={ { marginBottom: 100 } } //Misma altura que exerciceCard

                //Aqui es porque llamo la pantalla en 2 sitios distintos, entonces si add existe es que estoy en routines si no en ejercicios y por lo tanto no tiene addExercice
                renderItem={ ({ item }) => add ?
                    <ExerciceCard exercice={ item } add={ true } />
                    :
                    <ExerciceCard exercice={ item } /> }
            />

        </View>
    )
}