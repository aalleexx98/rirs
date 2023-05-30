import React, { useContext, useRef, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../theme/globalTheme';
import { ThemeContext } from '../../context/themeContext/ThemeContext';
import { Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;

interface Props {
    name: string,
    iconType: string,
    iconName: string,
    onPress: () => void,
    opacity: number
}

export const ButtonRoutine = ({ name, iconName, iconType, onPress, opacity }: Props) => {

    const { theme: { colors, textSecondary } } = useContext(ThemeContext);

    return (
        <TouchableOpacity
            activeOpacity={ 0.7 }
            style={ { ...styles.gendreButton, backgroundColor: colors.primary, width: windowWidth * 0.25, height: windowWidth * 0.25, opacity: opacity } }
            onPress={ onPress }
        >
            <Text style={ { color: textSecondary, fontSize: 16, fontWeight: '700' } }>{ name }</Text>

            {
                iconType.includes('Ionicons') ? (
                    <Ionicons
                        name={ iconName }
                        size={ 40 }
                        color="white"
                    />
                ) : (
                    <Icon
                        name={ iconName }
                        size={ 40 }
                        color="white"
                    />
                )
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    gendreButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        rowGap: 10,
    }
});