import React, { useEffect, useState } from 'react'
import { Text, View, FlatList } from 'react-native'
import { RootStackParamsRoutine } from '../../routes/RoutineStack'
import { StackScreenProps } from '@react-navigation/stack'
import { useExercicesPaginated } from '../../hooks/global/exercices/useExercicesPaginated'
import { Loading } from '../../components/Loading'
import { ExerciceCardRoutine } from '../../components/exercices/exerciceCardRoutine'
import { routineExercices } from '../../interfaces/exerciceInterface';

interface Props extends StackScreenProps<RootStackParamsRoutine, 'Routine1DayScreen'> { };

export const Routine1DayScreen = ({ route }: Props) => {

    const { routineDayGenerate, routineDayExercices, isGenerating, isFetching, removeRoutineExercise, editRoutineExercise } = useExercicesPaginated();

    useEffect(() => {
        if (!isFetching) {
            routineDayGenerate(route.params.muscles, route.params.level);
        }
    }, [isFetching]);

    if (isGenerating) {
        return <Loading />;
    }

    return (
        <View>
            {/* <Text>{ routineDayExercices.map((exercise) => exercise.exercise.name).join(", ") }</Text> */ }

            <FlatList
                data={ routineDayExercices }
                keyExtractor={ (exercice) => exercice.exercise.name }
                showsVerticalScrollIndicator={ false }
                //style={ { marginBottom: 100 } } //Misma altura que exerciceCard
                renderItem={ ({ item }) => (
                    <ExerciceCardRoutine
                        exercice={ item.exercise }
                        reps={ item.repetitions }
                        restTime={ item.restTime }
                        sets={ item.sets }
                        removeExercise={ removeRoutineExercise }
                        editExercise={ editRoutineExercise }
                    />
                ) }
            />

        </View>
    )
}
