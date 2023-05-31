import React from 'react'
import { Text, View } from 'react-native'
import { RootStackParamsRoutine } from '../../routes/RoutineStack'
import { StackScreenProps } from '@react-navigation/stack'

interface Props extends StackScreenProps<RootStackParamsRoutine, 'Routine1DayScreen'> { };

export const Routine1DayScreen = ({ route }: Props) => {
    return (
        <View>
            <Text>{ route.params.gender }</Text>
            <Text>{ route.params.level }</Text>
            <Text>{ route.params.muscles }</Text>
        </View>
    )
}
