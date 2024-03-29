import React, { useContext, useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RoutineContext } from '../context/routineContext/routineContext';
import { RootStackParamsHome } from '../routes/HomeStack';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { ExerciceHistorial, ExerciceSetsData, routineExercices, setsData } from '../interfaces/exerciceInterface';
import { FadeInImage } from '../components/FadeInImage';
import { useNavigation } from '@react-navigation/native';
import BackgroundTimer from 'react-native-background-timer';
import { LogBox } from 'react-native';
import { useForm } from '../hooks/global/useForm';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Dialog, PaperProvider, Portal } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useExecuteRoutine } from '../hooks/routines/useExecuteRoutine';
import { formatRestTime, formatTime } from '../helpers/formatters';


LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message


interface Props extends StackScreenProps<RootStackParamsHome, 'ExecuteRoutineScreen'> { };

export const ExecuteRoutineScreen = ({ route }: Props) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamsHome>>();

    const { routineExercices, setActiveRoutine } = useContext(RoutineContext);
    const { theme: { colors, textSecondary } } = useContext(ThemeContext);
    const { saveHistorialRoutine, getHistorialExerice } = useExecuteRoutine();

    const [totalTime, setTotalTime] = useState(0);
    const [secondsRestTime, setSecondsRestTime] = useState(0);
    const [additionalCounter, setAdditionalCounter] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentItem, setCurrentItem] = useState<routineExercices>();
    const [currentSeriesIndex, setCurrentSeriesIndex] = useState(0);
    const [setsData, setSetsData] = useState<setsData[]>([]);
    const [exerciceSetsData, setExerciceSetsData] = useState<ExerciceSetsData[]>([]);
    const [exerciceHistorialArray, setExerciceHistorialArray] = useState<ExerciceHistorial[]>([]);

    const [isLast, setIsLast] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const [isRestTimeOver, setIsRestTimeOver] = useState(false);
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [visibleDialogTime, setVisibleDialogTime] = useState(false);
    const [visibleDialogHistorial, setVisibleDialogHistorial] = useState(false);

    const nextExercises = routineExercices.slice(currentIndex + 1).map((exercise) => exercise.exercise);

    const { repsForm, kgForm, onChange } = useForm({
        repsForm: '',
        kgForm: '',
    });

    const nextExercice = () => {
        setIsLoading(false);
        if (currentItem) {
            const newExerciceSetsData: ExerciceSetsData = {
                exercice_id: currentItem?.exercise.ref.id,
                name: currentItem.exercise.name,
                restTime: currentItem.restTime,
                reps_planned: currentItem.repetitions,
                sets_planned: currentItem.sets,
                setsData: setsData
            }
            setExerciceSetsData(prevSetsData => [...prevSetsData, newExerciceSetsData]);
            setSetsData([])
        }
        if (currentIndex < routineExercices.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
            setIsLast(true)
        }
    };


    useEffect(() => {
        if (isLast) {
            saveHistorialRoutine(exerciceSetsData, totalTime, route.params.title)
            navigation.reset({
                index: 0,
                routes: [{ name: 'HistorialInfoScreen', params: { exercices: exerciceSetsData, name: 'Resumen de la Rutina', totalTime, finish: true } }]
            });
        }

    }, [isLast])


    const handleNextSet = (index: number) => {
        setSecondsRestTime(currentItem?.restTime ?? 0)
        setIsRestTimeOver(false);
        setAdditionalCounter(0);

        const isValidRepsForm = /^\d{1,3}$/.test(repsForm);
        const normalizedKgForm = kgForm.replace(/,/g, '.');
        const isValidKgForm = /^(\d{1,6}|\d{1,3}\.\d{1,3}|\.\d{1,3})$/.test(normalizedKgForm);

        if (isValidRepsForm && isValidKgForm) {
            const newSetData: setsData = {
                set_number: index + 1,
                reps: parseInt(repsForm),
                kg: parseFloat(normalizedKgForm),
            }
            onChange('', 'repsForm')
            onChange('', 'kgForm')

            setSetsData(prevSetsData => [...prevSetsData, newSetData]);
            setCurrentSeriesIndex(prevIndex => prevIndex + 1);
            setVisibleDialogTime(true);
        } else {
            setVisibleDialog(true)
        }
    };

    const handleCloseModalTime = () => {
        setVisibleDialogTime(false);
    }

    const getHistorial = async () => {

        const name = currentItem?.exercise.name;
        if (name) {
            const result = await getHistorialExerice(name);
            if (result) setExerciceHistorialArray(result);
        }
        setIsLoading(true);
    }


    useEffect(() => {
        setActiveRoutine(route.params.id!);
    }, [])

    useEffect(() => {
        setCurrentItem(routineExercices[currentIndex]);
    }, [routineExercices, currentIndex])

    useEffect(() => {
        setCurrentSeriesIndex(0);
    }, [currentItem]);

    useEffect(() => {
        if (visibleDialogHistorial && currentItem?.exercise) {
            getHistorialExerice(currentItem.exercise.name)
        }
    }, [visibleDialogHistorial])


    // GENERAL TIME
    useEffect(() => {
        const interval = BackgroundTimer.setInterval(() => {
            setTotalTime(prevCount => prevCount + 1);
        }, 1000);

        return () => {
            BackgroundTimer.clearInterval(interval);
        };
    }, []);

    //REST TIME
    useEffect(() => {
        const timer = BackgroundTimer.setInterval(() => {
            setSecondsRestTime(prevSeconds => prevSeconds! - 1);
        }, 1000);

        return () => BackgroundTimer.clearInterval(timer);
    }, []);

    useEffect(() => {
        if (secondsRestTime === 1) {
            // El tiempo de descanso ha terminado, inicia otro contador
            setTimeout(() => {
                setIsRestTimeOver(true);
            }, 1000);
        }
    }, [secondsRestTime]);

    useEffect(() => {
        if (isRestTimeOver) {
            const additionalTimer = setInterval(() => {
                setAdditionalCounter(prevCounter => prevCounter + 1);
            }, 1000);

            return () => clearInterval(additionalTimer);
        }
    }, [isRestTimeOver]);


    return (
        <PaperProvider>
            <View style={ { flex: 1 } }>
                { currentItem && (
                    <>
                        {/* TODO: Ponerlo en position absolute */ }
                        <View style={ { flexDirection: 'row', backgroundColor: 'white' } }>

                            <TouchableOpacity
                                style={ { position: 'absolute', left: 10, top: 10 } }
                                activeOpacity={ 0.8 }
                            >
                                <Text style={ { ...styles.textHeader, color: 'black', paddingRight: 20 } }>Salir</Text>
                            </TouchableOpacity>

                            <View
                                style={ { justifyContent: 'center', flex: 1, paddingTop: 10 } }
                            >
                                <Text style={ { ...styles.textHeader, color: 'black', textAlign: 'center' } }>{ currentIndex + 1 }/{ routineExercices.length }</Text>
                            </View>

                            <View style={ { position: 'absolute', right: 10, top: 10 } }>
                                <Text style={ { ...styles.textHeader, color: 'black', zIndex: 20 } }>{ formatTime(totalTime) }</Text>
                            </View>

                        </View>

                        <View style={ styles.imageBox }>
                            <FadeInImage
                                uri={ currentItem?.exercise.img }
                                style={ { height: 200, width: 200 } }
                            />
                        </View>

                        <KeyboardAwareScrollView
                            keyboardShouldPersistTaps='always'
                            style={ { padding: 10, flex: 1 } } showsVerticalScrollIndicator={ false }>

                            <Text style={ { ...styles.title, color: colors.text } }>{ currentItem.exercise.name }</Text>

                            <TouchableOpacity
                                onPress={ () => navigation.navigate('ExerciceDetailsScreen', { ref: currentItem.exercise.ref.id }) }
                                style={ { ...styles.botonYT, backgroundColor: colors.primary } }
                                activeOpacity={ 0.8 }
                            >
                                <Text style={ { color: textSecondary } }>Ver información del ejercicio</Text>
                            </TouchableOpacity>

                            { currentItem?.sets && (
                                Array.from({ length: currentItem.sets }, (_, index) => (
                                    <View key={ index }>
                                        { index === currentSeriesIndex ? (
                                            <View style={ { ...styles.inputBox, borderColor: '#6202B0', paddingVertical: 15 } }>
                                                <Text style={ { color: textSecondary, alignSelf: 'center' } }>{ `Serie ${ index + 1 }` }</Text>
                                                <View>
                                                    <View style={ { flexDirection: 'row', columnGap: 8, alignItems: 'center' } }>
                                                        <Text style={ { color: textSecondary } }>Reps:</Text>
                                                        <TextInput
                                                            onChangeText={ (value) => onChange(value, 'repsForm') }
                                                            style={ { width: 30, ...styles.inputText } }
                                                            keyboardType='numeric'
                                                        />
                                                        <Text style={ { color: textSecondary } }>KG:</Text>
                                                        <TextInput
                                                            onChangeText={ (value) => onChange(value, 'kgForm') }
                                                            style={ { width: 60, ...styles.inputText } }
                                                            keyboardType='numeric'
                                                        />
                                                        {/* <TouchableOpacity onPress={ () => handleNextSet(index) }>
                                                            <Text style={ { color: textSecondary } }>Enviar</Text>
                                                        </TouchableOpacity> */}
                                                        <Icon
                                                            color='white'
                                                            name='play-forward-outline'
                                                            size={ 20 }
                                                            onPress={ () => handleNextSet(index) }
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        ) :
                                            (
                                                <View style={ { ...styles.inputBox, borderColor: '#6202B0' } }>
                                                    <Text>{ `Serie ${ index + 1 }` }</Text>
                                                    <View style={ { flexDirection: 'row', columnGap: 8 } }>
                                                        { setsData[index] && (
                                                            <>
                                                                <Text>{ 'Reps: ' + setsData[index].reps }</Text>
                                                                <Text>{ 'KG: ' + setsData[index].kg }</Text>
                                                            </>
                                                        ) }
                                                    </View>
                                                </View>
                                            ) }
                                    </View>
                                ))
                            ) }

                            { (currentSeriesIndex === currentItem.sets && currentIndex + 1 !== routineExercices.length) && (
                                <View style={ { marginTop: 20 } }>
                                    <TouchableOpacity onPress={ nextExercice } style={ { alignItems: 'flex-end' } }>
                                        <Text style={ { color: colors.primary } }>SIGUIENTE EJERCICIO</Text>
                                    </TouchableOpacity>
                                </View>
                            ) }

                            { (currentSeriesIndex === currentItem.sets && currentIndex + 1 === routineExercices.length) && (
                                <View style={ { marginTop: 20 } }>
                                    <TouchableOpacity onPress={ nextExercice } style={ { alignItems: 'flex-end' } }>
                                        <Text style={ { color: colors.primary } }>FINALIZAR</Text>
                                    </TouchableOpacity>
                                </View>
                            ) }

                            <TouchableOpacity
                                style={ { marginTop: 50 } }
                                onPress={ () => { setVisibleDialogHistorial(true), getHistorial() } }
                            >
                                <Text style={ { textAlign: 'center', color: colors.text } }>Ver Historial</Text>
                            </TouchableOpacity>


                            { nextExercises.length > 0 && (
                                <View style={ { marginTop: 50, marginBottom: 30 } }>
                                    <Text style={ { fontSize: 16, color: colors.text } }>Próximos Ejercicios:</Text>
                                    { nextExercises.map((exerciseName, index) => (
                                        <Text key={ index } style={ { color: colors.text, marginTop: 5 } }>
                                            - { exerciseName.name }
                                        </Text>
                                    )) }
                                </View>
                            ) }


                        </KeyboardAwareScrollView>

                    </>
                ) }
            </View>

            {/* MODAL HISTORIAL*/ }
            <Portal>
                <Dialog visible={ visibleDialogHistorial } onDismiss={ () => setVisibleDialogHistorial(false) }>
                    <Dialog.Title>Historial</Dialog.Title>
                    <Dialog.Content>
                        { loading ? (
                            exerciceHistorialArray.length > 1 ? (
                                <ScrollView style={ { height: '60%' } }>
                                    { exerciceHistorialArray.map((exerciceHistorial, index) => (
                                        <View key={ index } style={ { marginBottom: 25 } }>
                                            <Text style={ { fontSize: 16, fontWeight: '600' } }>Rutina: { exerciceHistorial.rutineName }</Text>
                                            <Text style={ { fontSize: 16, fontWeight: '600' } }>Dia: { exerciceHistorial.formattedDate }</Text>
                                            <View style={ { flexDirection: 'column' } }>
                                                { exerciceHistorial.setsData.map((sets, index) => (
                                                    <View key={ index } style={ { flexDirection: 'row', columnGap: 30 } }>
                                                        <Text>{ `Serie: ${ sets.set_number }` }</Text>
                                                        <Text>{ `Reps: ${ sets.reps }` }</Text>
                                                        <Text style={ { textAlign: 'left' } }>{ `Kg: ${ sets.kg }` }</Text>
                                                    </View>
                                                )) }
                                            </View>
                                        </View>
                                    )) }
                                </ScrollView>)
                                : (<Text>No tienes todabia historial en este ejercicio</Text>)

                        ) : (<Text>Cargando...</Text>) }

                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={ () => setVisibleDialogHistorial(false) }>Cerrar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            {/* MODAL ERROR*/ }
            <Portal>
                <Dialog visible={ visibleDialog } onDismiss={ () => setVisibleDialog(false) }>
                    <Dialog.Content>
                        <Text>Rellena las repeticiones y kilos</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={ () => setVisibleDialog(false) }>Cerrar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            {/* MODAL TIME*/ }
            <Portal>
                <Dialog visible={ visibleDialogTime } onDismiss={ handleCloseModalTime }>
                    <Dialog.Title style={ { textAlign: 'center' } }>{ secondsRestTime < 0 ? 'Se acabo el tiempo' : 'Tiempo de descanso' }</Dialog.Title>
                    <Dialog.Content>
                        <Text style={ { textAlign: 'center', fontSize: 24 } }>{ secondsRestTime < 0 ? '00:00' : formatRestTime(secondsRestTime!) }</Text>
                        { isRestTimeOver ? (
                            <Text style={ { textAlign: 'center', fontSize: 14, marginTop: 10 } }>{ 'Te has pasado: ' + additionalCounter + ' segundos' }</Text>
                        ) : null }
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={ handleCloseModalTime }>{ secondsRestTime < 0 ? 'Cerrar' : 'Omitir' }</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 18,
    },
    imageBox: {
        backgroundColor: 'white',
        justifyContent: 'center',
        zIndex: -10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingVertical: 5
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10
    },
    botonYT: {
        alignItems: 'center',
        padding: 8,
        borderRadius: 10,
        marginBottom: 10
    },
    inputBox: {
        flex: 1,
        borderWidth: 3,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#AC49FC'
    },
    inputText: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
        paddingVertical: 0,
        color: 'white',
        marginRight: 20,
    },
    timeOverText: {

    }
});
