import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ExerciceSetsData } from '../../interfaces/exerciceInterface'
import { ThemeContext } from '../../context/themeContext/ThemeContext'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { formatTime } from '../../helpers/formatters';
import { RootStackParamsHistorial } from '../../routes/HistorialStack';


interface Props {
    name: string,
    day: Date,
    totalTime: number,
    exercices: ExerciceSetsData[]
}

export const HistorialCard = ({ name, day, totalTime, exercices }: Props) => {

    const { theme: { colors, textSecondary } } = useContext(ThemeContext);
    const navigation = useNavigation<StackNavigationProp<RootStackParamsHistorial>>();

    return (
        <TouchableOpacity
            activeOpacity={ 0.8 }
            onPress={ () => navigation.navigate('HistorialInfoScreen', { exercices, name, totalTime, day }) }
        >
            <View style={ { ...styles.box, backgroundColor: colors.primary } }>
                <View style={ { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 } }>
                    <Text style={ { color: textSecondary } }>{ name }</Text>
                    <Text style={ { color: textSecondary } }>Tiempo: { formatTime(totalTime) }</Text>
                </View>
                <Text style={ { color: textSecondary } }>{ day.toLocaleDateString() }</Text>
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