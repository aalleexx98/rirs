import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { ThemeContext } from '../../context/themeContext/ThemeContext';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RoutineContext } from '../../context/routineContext/routineContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsHome } from '../../routes/HomeStack';
import { useNavigation } from '@react-navigation/native';

interface Props {
    title: string,
    id: string,
}

export const RoutinePreview = ({ title, id }: Props) => {

    const { theme: { colors } } = useContext(ThemeContext);
    const { removeRoutine } = useContext(RoutineContext);

    const navigation = useNavigation<StackNavigationProp<RootStackParamsHome>>();

    return (
        <View style={ { ...styles.Box } }>
            <Text style={ { ...styles.Title, color: 'white' } }>{ title }</Text>

            <View style={ { ...styles.Options, backgroundColor: colors.primary } }>
                <View style={ { flex: 1 } }>
                    <TouchableOpacity
                        style={ { ...styles.OptionBox, borderRightWidth: 1 } }
                        activeOpacity={ 0.8 }
                        onPress={ () => navigation.navigate("ExecuteRoutineScreen", { id, title }) }
                    >
                        <Text style={ styles.OptionText }>Iniciar</Text>
                    </TouchableOpacity>
                </View>

                <View style={ { flex: 1 } }>
                    <TouchableOpacity
                        style={ { ...styles.OptionBox, borderRightWidth: 1 } }
                        activeOpacity={ 0.8 }
                        onPress={ () => navigation.navigate("Routine1DayScreen", { type: 'Edit', id, title }) }
                    >
                        <Text style={ styles.OptionText }>Editar</Text>
                    </TouchableOpacity>
                </View>


                <View style={ { flex: 1 } }>
                    <TouchableOpacity
                        style={ styles.OptionBox }
                        activeOpacity={ 0.8 }
                        onPress={ () => removeRoutine(id) }
                    >
                        <Text style={ styles.OptionText }>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Box: {
        marginBottom: 20,
        height: 120,
        borderRadius: 10,
        justifyContent: 'space-between',
        overflow: 'hidden',
        backgroundColor: '#A335FC'
    },
    Title: {
        padding: 10,
        fontSize: 20,
        fontWeight: '600'
    },
    Options: {
        flexDirection: 'row',
    },
    OptionBox: {
        paddingVertical: 8,
        borderColor: 'white',
        borderTopWidth: 1
    },
    OptionText: {
        color: 'white',
        textAlign: 'center'
    }

});
