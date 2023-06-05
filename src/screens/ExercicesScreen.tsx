import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Dimensions, FlatList, Platform, ScrollView, Text, View } from 'react-native'
import { globalStyles } from '../theme/globalTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { useExercicesPaginated } from '../hooks/global/exercices/useExercicesPaginated';
import { Loading } from '../components/Loading';
import { ExerciceCard } from '../components/exercices/exerciceCard';
import { SearchInput } from '../components/exercices/searchInput';
import DropDownPicker from 'react-native-dropdown-picker';

const screenWidth = Dimensions.get('window').width;


export const ExercicesScreen = () => {
    const { theme: { colors } } = useContext(ThemeContext);
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

    const { isFetching, searchExercice, exerciceFiltered } = useExercicesPaginated();

    useEffect(() => {
        searchExercice(term, equipmentValue, muscleValue);
    }, [term, equipmentValue, muscleValue])

    if (isFetching) {
        return <Loading />
    }

    return (
        <View style={ { ...globalStyles.globalMargin } }>

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
                renderItem={ ({ item }) => (<ExerciceCard exercice={ item } />) }
            />

        </View>
    )
}
