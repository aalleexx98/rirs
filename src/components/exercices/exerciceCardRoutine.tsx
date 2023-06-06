import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, LogBox, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { exercicePreview } from '../../interfaces/exerciceInterface'
import { ThemeContext } from '../../context/themeContext/ThemeContext'
import { FadeInImage } from '../FadeInImage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../routes/ExerciceStack'
import Icon from 'react-native-vector-icons/Ionicons';
import { HelperText, TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from '../../hooks/global/useForm'

interface Props {
    exercice: exercicePreview,
    reps: string,
    restTime: number,
    sets: number,
    removeExercise: (exerciseId: string) => void,
    editExercise: (exerciseId: string, sets: number, reps: string, time: number) => void,
}

export const ExerciceCardRoutine = ({ exercice, reps, restTime, sets, removeExercise, editExercise }: Props) => {

    const { theme: { colors } } = useContext(ThemeContext);
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentReps, setCurrentReps] = useState(reps);
    const [currentRestTime, setCurrentRestTime] = useState(restTime);
    const [currentSets, setCurrentSets] = useState(sets);

    const [errorTime, setErrorTime] = useState(false);
    const [errorSets, setErrorSets] = useState(false);
    const [errorReps, setErrorReps] = useState(false);

    const { setsForm, repsForm, timeForm, onChange } = useForm({
        setsForm: sets,
        repsForm: reps,
        timeForm: restTime,
    });

    const handleUpdate = () => {
        if (setsForm.toString() === '' || !/^(?:[1-9]|1\d|20)$/.test(setsForm.toString())) {
            setErrorSets(true);
            return;
        }

        if (repsForm === '' || !/^\d+(-\d+)?$/.test(repsForm)) {
            setErrorReps(true);
            return;
        }

        if (timeForm.toString() === '' || !/^(?:[0-5]?[0-9]{1,2}|600)?$/.test(timeForm.toString())) {
            setErrorTime(true);
            return;
        }

        setErrorSets(false);
        setCurrentSets(setsForm);
        setErrorReps(false);
        setCurrentReps(repsForm);
        setErrorTime(false);
        setCurrentRestTime(timeForm);

        //editExercise(exercice.ref.id, setsForm, repsForm, timeForm);
        setIsModalVisible(false);
    };

    useEffect(() => {
        editExercise(exercice.ref.id, currentSets, currentReps, currentRestTime);
    }, [currentReps, currentSets, currentRestTime])



    return (
        <TouchableOpacity
            activeOpacity={ 0.6 }

        >
            <View style={ { ...styles.card, backgroundColor: colors.primary } }>
                <View style={ styles.containerImage }>
                    <FadeInImage
                        uri={ exercice.img }
                        style={ { height: 100, width: 100 } }
                    />
                </View>

                <View style={ styles.containerText }>
                    <Text style={ styles.title }>{ exercice.name }</Text>
                    <View>
                        <Text style={ styles.muscle }>
                            <Text style={ { fontWeight: '600' } }>Series:</Text> { sets }
                        </Text>
                        <Text style={ styles.muscle }>
                            <Text style={ { fontWeight: '600' } }>Repeticiones:</Text> { reps }
                        </Text>
                        <Text style={ styles.muscle }>
                            <Text style={ { fontWeight: '600' } }>Descanso:</Text> { restTime }
                        </Text>
                        <Text style={ styles.muscle }>
                            <Text style={ { fontWeight: '600' } }>Equipamiento:</Text> { exercice.equipment }
                        </Text>
                        <Text style={ styles.muscle }>
                            <Text style={ { fontWeight: '600' } }>Músculo:</Text> { exercice.muscle }
                        </Text>
                    </View>
                </View>

                <View style={ styles.containerButtons }>
                    <TouchableOpacity
                        style={ styles.containterEdit }
                        activeOpacity={ 0.8 }
                        onPress={ () => setIsModalVisible(true) }
                    >
                        <Icon
                            color='black'
                            size={ 30 }
                            name="create-outline"
                        />

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ styles.containerDelete }
                        activeOpacity={ 0.8 }
                        onPress={ () => removeExercise(exercice.ref.id) }
                    >
                        <Icon
                            color='black'
                            size={ 30 }
                            name="trash-outline"
                        />
                    </TouchableOpacity>
                </View>

                <Modal
                    visible={ isModalVisible }
                    onRequestClose={ () => setIsModalVisible(false) }
                    transparent={ true }
                    animationType='fade'
                >
                    <View style={ styles.modalBox }>

                        <View style={ styles.modalContent }>

                            <>
                                <TextInput
                                    label="Series"
                                    mode="outlined"
                                    value={ setsForm.toString() }
                                    onChangeText={ (value) => onChange(value, 'setsForm') }
                                    keyboardType="numeric"
                                    error={ errorSets }
                                />
                                { errorSets && <HelperText type="error" visible={ true }>Solo se permiten entre 1 y 20 series</HelperText> }
                            </>

                            <>
                                <TextInput
                                    label="Repeticiones"
                                    mode="outlined"
                                    value={ repsForm.toString() }
                                    onChangeText={ (value) => onChange(value, 'repsForm') }
                                    keyboardType="numeric"
                                    error={ errorReps }
                                />
                                { errorReps && <HelperText type="error" visible={ true }>Solo se permite poner números o intervalo Ex: 6-8</HelperText> }
                            </>

                            <>
                                <TextInput
                                    label="Tiempo en segundos"
                                    mode="outlined"
                                    value={ timeForm.toString() }
                                    onChangeText={ (value) => onChange(value, 'timeForm') }
                                    keyboardType="numeric"
                                    error={ errorTime }
                                />
                                { errorTime && <HelperText type="error" visible={ true }>Solo se permiten segundos entre 0 y 10 minutos</HelperText> }
                            </>


                            <Button
                                onPress={ handleUpdate }
                                style={ { backgroundColor: colors.primary, borderRadius: 10 } }
                                textColor='white'
                            >
                                Actualizar
                            </Button>

                        </View>

                    </View>

                </Modal>

            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    card: {
        height: 180,
        marginBottom: 15,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        borderColor: 'black',
        borderWidth: 1,
    },
    containerText: {
        width: '55%',
        height: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    containerImage: {
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    containerButtons: {
        height: '100%',
        flex: 1,
    },
    containterEdit: {
        width: 'auto',
        height: '50%',
        backgroundColor: '#7E02E2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerDelete: {
        width: 'auto',
        height: '50%',
        backgroundColor: 'rgba(236, 24, 7, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    muscle: {
        fontSize: 14,
        marginTop: 'auto',
        color: 'white',
        textTransform: 'capitalize'
    },
    modalBox: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '80%',
        height: 'auto',
        paddingHorizontal: 10,
        paddingVertical: 10,
        rowGap: 10,


        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        elevation: 10,
        borderRadius: 10,
    },
});
