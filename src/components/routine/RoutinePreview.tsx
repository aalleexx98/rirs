import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { ThemeContext } from '../../context/themeContext/ThemeContext';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    title: string,
    id: string,
}

export const RoutinePreview = ({ title, id }: Props) => {

    const { theme: { colors } } = useContext(ThemeContext);

    return (
        <View style={ { ...styles.Box, backgroundColor: colors.primary } }>
            <Text style={ { ...styles.Title, color: colors.text } }>{ title }</Text>

            <View style={ { ...styles.Options } }>
                <View style={ { flex: 1 } }>
                    <TouchableOpacity
                        style={ { ...styles.OptionBox, borderRightWidth: 1 } }
                        activeOpacity={ 0.8 }
                    >
                        <Text style={ styles.OptionText }>Iniciar</Text>
                    </TouchableOpacity>
                </View>

                <View style={ { flex: 1 } }>
                    <TouchableOpacity
                        style={ { ...styles.OptionBox, borderRightWidth: 1 } }
                        activeOpacity={ 0.8 }
                    >
                        <Text style={ styles.OptionText }>Editar</Text>
                    </TouchableOpacity>
                </View>


                <View style={ { flex: 1 } }>
                    <TouchableOpacity
                        style={ styles.OptionBox }
                        activeOpacity={ 0.8 }
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
    },
    Title: {
        padding: 10,
        fontSize: 20,
        fontWeight: '600'
    },
    Options: {
        backgroundColor: '#A335FC',
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
