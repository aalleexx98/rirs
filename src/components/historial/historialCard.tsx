import React, { useContext } from 'react'
import { LogBox, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, TurboModuleRegistry } from 'react-native';
import { exercicePreview } from '../../interfaces/exerciceInterface'
import { ThemeContext } from '../../context/themeContext/ThemeContext'
import { FadeInImage } from '../FadeInImage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../routes/ExerciceStack'
import Icon from 'react-native-vector-icons/Ionicons';
import { RoutineContext } from '../../context/routineContext/routineContext';
import { formatTime } from '../../helpers/formatters';


interface Props {
    name: string,
    day: Date,
    totalTime: number
}

export const HistorialCard = ({ name, day, totalTime }: Props) => {

    const { theme: { colors } } = useContext(ThemeContext);



    return (
        <TouchableOpacity>
            <View style={ { ...styles.box, backgroundColor: colors.primary } }>
                <View style={ { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 } }>
                    <Text>{ name }</Text>
                    <Text>Tiempo: { formatTime(totalTime) }</Text>
                </View>
                <Text>{ day.toLocaleDateString() }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    box: {
        marginBottom: 30,
        padding: 10,
        borderRadius: 10
    }
});