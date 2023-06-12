import React, { memo, useContext, useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { RootStackParamsRoutine } from '../../routes/RoutineStack'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { Loading } from '../../components/Loading'
import { ExerciceCardRoutine } from '../../components/exercices/exerciceCardRoutine'
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/themeContext/ThemeContext'
import { useForm } from '../../hooks/global/useForm'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { globalStyles } from '../../theme/globalTheme'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native';
import { RoutineContext } from '../../context/routineContext/routineContext'
import { RootStackParamsHome } from '../../routes/HomeStack'

type RootStackParams = RootStackParamsHome | RootStackParamsRoutine;

interface Props extends StackScreenProps<RootStackParams, 'Routine1DayScreen'> { };

export const Routine1DayScreen = ({ route }: Props) => {
    const isFocused = useIsFocused();

    const { theme: { colors } } = useContext(ThemeContext);
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const { routineDayGenerate, routineExercices, isGenerating, isFetching, addRoutineExercise, saveRoutine, numberOfActiveRoutines, setActiveRoutine } = useContext(RoutineContext);

    const [errorTime, setErrorTime] = useState(false);
    const { titleForm, onChange } = useForm({
        titleForm: route.params.title ? route.params.title : '',
    });

    const handleSave = async () => {
        if (!/^.{1,20}$/.test(titleForm)) {
            Alert.alert('Error', 'El título debe tener entre 1 y 20 caracteres');
            setErrorTime(true);
            return;
        }
        if (numberOfActiveRoutines < 7) {
            saveRoutine(titleForm);
            route.params.title ? navigation.navigate('HomeScreen') : navigation.navigate('HomeStack');
        } else {
            Alert.alert('Error', 'Has alcanzado el máximo de rutinas activas (7), elimina una rutina para poder crear más.');
        }
        setErrorTime(false);
    };

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


    useEffect(() => {
        if (!isFetching) {
            switch (route.params.type) {
                case 'Generate':
                    console.log("Añadir")
                    routineDayGenerate(route.params.muscles!, route.params.level!);
                    break;
                case 'Edit':
                    setActiveRoutine(route.params.id!);
                    console.log("Edit")
                    break;
                case 'New':
                    console.log("New")
                    break;
            }
        }
    }, [isFetching]);


    if (isGenerating) {
        return <Loading loadingText='Generando Rutina' />;
    }


    return (
        <View style={ { padding: 10 } }>

            <View style={ { flexDirection: 'row', alignItems: 'flex-end', columnGap: 5, paddingBottom: 20, } }>
                <>
                    <TextInput
                        value={ titleForm }
                        placeholder='Titulo de la rutina'
                        mode="flat"
                        cursorColor='black'
                        onChangeText={ (value) => onChange(value, 'titleForm') }
                        style={ { flex: 1, height: 60, borderRadius: 5, backgroundColor: 'white' } }
                        error={ errorTime }
                    />
                </>

                <TouchableOpacity
                    style={ { backgroundColor: colors.primary, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 5, paddingHorizontal: 10 } }
                    activeOpacity={ 0.8 }
                    onPress={ handleSave }
                >
                    <Text style={ { color: 'white' } }>Guardar</Text>
                </TouchableOpacity>

            </View>

            <FlatList
                data={ routineExercices }
                keyExtractor={ (exercice, index) => exercice.exercise.name + index }
                showsVerticalScrollIndicator={ false }
                renderItem={ ({ item, index }) => (
                    <ExerciceCardRoutine
                        exercice={ item.exercise }
                        reps={ item.repetitions }
                        restTime={ item.restTime }
                        sets={ item.sets }
                        index={ index }
                        isLast={ routineExercices.length - 1 }
                    />
                ) }

                ListFooterComponent={ renderFooter }

            />

        </View>
    )
}
