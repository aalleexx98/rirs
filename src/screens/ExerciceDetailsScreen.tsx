import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { LogBox, Text, View } from 'react-native'
import { RootStackParams } from '../routes/ExerciceStack'

interface Props extends StackScreenProps<RootStackParams, 'ExerciceDetailsScreen'> { };

export const ExerciceDetailsScreen = (props: Props) => {

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    return (
        <View>
            <Text>ExerciceDetailsScreen</Text>
        </View>
    )
}
