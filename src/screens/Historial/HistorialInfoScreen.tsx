import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamsHistorial } from '../../routes/HistorialStack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/themeContext/ThemeContext'
import { globalStyles } from '../../theme/globalTheme'
import { formatTime } from '../../helpers/formatters'
import { RootStackParamsHome } from '../../routes/HomeStack'

type RootStackParams = RootStackParamsHistorial | RootStackParamsHome;

interface Props extends StackScreenProps<RootStackParams, 'HistorialInfoScreen'> { };

export const HistorialInfoScreen = ({ navigation, route }: Props) => {

    const { theme: { colors } } = useContext(ThemeContext);


    return (
        <View style={ { margin: 10 } }>
            <View style={ styles.titleBox }>
                <Icon
                    name="arrow-back-outline"
                    color={ colors.text }
                    size={ 30 }
                    onPress={ () => route.params.finish ? navigation.navigate('HomeScreen') : navigation.navigate('HistorialScreen') }
                />
                <Text style={ { color: colors.text, ...styles.title } }>{ route.params.name }</Text>
            </View>

            <View style={ { marginTop: 10 } }>
                { route.params.day && (<Text style={ { color: colors.text } }>Dia: { route.params.day.toLocaleDateString() }</Text>) }
                <Text style={ { color: colors.text } }>Tiempo: { formatTime(route.params.totalTime) }</Text>
            </View>

            <ScrollView style={ { marginBottom: 55, marginTop: 20 } }>
                { route.params.exercices.map((exerciceHistorial, index) => (
                    <View key={ index } style={ { marginBottom: 35 } }>
                        <Text style={ { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 5 } }>{ index + 1 }. { exerciceHistorial.name }</Text>

                        <View style={ { flexDirection: 'column' } }>
                            { exerciceHistorial.setsData.map((sets, index) => (
                                <View key={ index } style={ { flexDirection: 'row', columnGap: 40 } }>
                                    <Text style={ { color: colors.text } }>{ `Serie: ${ sets.set_number }` }</Text>
                                    <Text style={ { color: colors.text } }>{ `Reps: ${ sets.reps }` }</Text>
                                    <Text style={ { textAlign: 'left', color: colors.text } }>{ `Kg: ${ sets.kg }` }</Text>
                                </View>
                            )) }
                        </View>
                    </View>
                )) }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    titleBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginLeft: 5,

    }

});
