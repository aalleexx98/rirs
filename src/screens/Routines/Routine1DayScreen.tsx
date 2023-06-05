import React, { useEffect, useState } from 'react'
import { Text, View, FlatList } from 'react-native'
import { RootStackParamsRoutine } from '../../routes/RoutineStack'
import { StackScreenProps } from '@react-navigation/stack'
import { useExercicesPaginated } from '../../hooks/global/exercices/useExercicesPaginated'
import { Loading } from '../../components/Loading'
import { ExerciceCard } from '../../components/exercices/exerciceCard'
import { exercicePreview } from '../../interfaces/exerciceInterface'

interface Props extends StackScreenProps<RootStackParamsRoutine, 'Routine1DayScreen'> { };

export const Routine1DayScreen = ({ route }: Props) => {

    const { routineDayGenerate, routineDayExercices, isGenerating, isFetching } = useExercicesPaginated();

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
            <Text>{ route.params.gender }</Text>
            <Text>{ route.params.level }</Text>
            <Text>{ route.params.muscles }</Text>
            <Text>{ routineDayExercices.length }</Text>

            <Text>{ routineDayExercices.map((exercise) => exercise.name).join(", ") }</Text>
            <FlatList
                data={ routineDayExercices }
                keyExtractor={ (exercice) => exercice.name }
                showsVerticalScrollIndicator={ false }
                style={ { marginBottom: 100 } } //Misma altura que exerciceCard
                renderItem={ ({ item }) => (<ExerciceCard exercice={ item } />) }
            />

        </View>
    )
}
