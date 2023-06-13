import React, { useEffect, useState } from 'react'
import { Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../../hooks/exercices/useDebouncedValue';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
    onDebounce: (value: string) => void; //Funcion que se ejecuta cuando se cambia el valor se hace debounde
    style?: StyleProp<ViewStyle>
}

export const SearchInput = ({ style, onDebounce }: Props) => {

    const [textValue, setTextValue] = useState('');

    const debouncedValue = useDebouncedValue(textValue);

    useEffect(() => {
        onDebounce(debouncedValue); //Regresamos el deboundedValue
    }, [debouncedValue])


    return (

        <View style={ {
            ...style as any
        } }>
            <View style={ styles.textBg }>
                <TextInput
                    placeholder='Buscar Ejercicio...'
                    placeholderTextColor="grey"
                    style={ { ...styles.textInput, top: (Platform.OS === 'ios') ? 0 : 2 } }
                    autoCapitalize='none'
                    autoCorrect={ false }
                    value={ textValue }
                    onChangeText={ setTextValue }
                />

                <Icon
                    name="search-outline"
                    color="grey"
                    size={ 30 }
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    textBg: {
        backgroundColor: '#F3F1F3',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        color: 'black'
    }
});
