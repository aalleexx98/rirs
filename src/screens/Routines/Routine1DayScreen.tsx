import React, { memo, useContext, useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { RootStackParamsRoutine } from '../../routes/RoutineStack'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { useExercicesPaginated } from '../../hooks/global/exercices/useExercicesPaginated'
import { Loading } from '../../components/Loading'
import { ExerciceCardRoutine } from '../../components/exercices/exerciceCardRoutine'
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/themeContext/ThemeContext'
import { useForm } from '../../hooks/global/useForm'
import { Button, TextInput } from 'react-native-paper'
import { globalStyles } from '../../theme/globalTheme'
import { useNavigation } from '@react-navigation/native'

interface Props extends StackScreenProps<RootStackParamsRoutine, 'Routine1DayScreen'> { };

export const Routine1DayScreen = ({ route }: Props) => {

    const { theme: { colors } } = useContext(ThemeContext);
    const navigation = useNavigation<StackNavigationProp<RootStackParamsRoutine>>();

    const { routineDayGenerate, routineDayExercices, isGenerating, isFetching, removeRoutineExercise, editRoutineExercise, addRoutineExercise, moveExerciseUp, moveExerciseDown } = useExercicesPaginated();

    const [routineTitle, setRoutineTitle] = useState<string>("");
    const { titleForm, onChange } = useForm({
        titleForm: '',
    });

    useEffect(() => {
        if (!isFetching) {
            routineDayGenerate(route.params.muscles, route.params.level);
        }
    }, [isFetching]);

    if (isGenerating) {
        return <Loading />;
    }

    const renderFooter = () => {
        return (
            <Icon
                color={ colors.primary }
                size={ 50 }
                name="add-circle-outline"
                onPress={ () => navigation.navigate('ExercicesScreen', { add: true, addExercice: addRoutineExercise }) }
                style={ { alignSelf: 'center', marginBottom: 100, marginTop: 20 } }
            />
        );
    };

    return (
        <View style={ { padding: 10 } }>

            <View style={ { flexDirection: 'row', alignItems: 'flex-end', columnGap: 5, paddingBottom: 10, } }>
                <TextInput
                    placeholder='Titulo de la rutina'
                    mode="flat"
                    cursorColor='black'
                    onChangeText={ (value) => onChange(value, 'titleForm') }
                    style={ { flex: 1, height: 60, borderRadius: 5, backgroundColor: 'white' } }
                />

                <TouchableOpacity
                    style={ { backgroundColor: colors.primary, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 5, paddingHorizontal: 10 } }
                    activeOpacity={ 0.8 }
                    onPress={ () => console.log("Hola") }
                >
                    <Text style={ { color: colors.text } }>Guardar</Text>
                </TouchableOpacity>

            </View>

            <FlatList
                data={ routineDayExercices }
                keyExtractor={ (exercice) => exercice.exercise.name }
                showsVerticalScrollIndicator={ false }
                renderItem={ ({ item, index }) => (
                    <ExerciceCardRoutine
                        exercice={ item.exercise }
                        reps={ item.repetitions }
                        restTime={ item.restTime }
                        sets={ item.sets }
                        removeExercise={ removeRoutineExercise }
                        editExercise={ editRoutineExercise }
                        moveExerciseUp={ moveExerciseUp }
                        moveExerciseDown={ moveExerciseDown }
                        index={ index }
                        isLast={ routineDayExercices.length - 1 }
                    />
                ) }

                ListFooterComponent={ renderFooter }

            />

        </View>
    )
}
