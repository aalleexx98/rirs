import React, { useContext } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext';

interface LoadingProps {
    loadingText: string; // Prop para el texto de carga
}

export const Loading = ({ loadingText }: LoadingProps) => {

    const { theme: { colors } } = useContext(ThemeContext);

    return (
        <View style={ styles.activityContainer }>
            <ActivityIndicator
                size={ 50 }
                color={ colors.text }
            />

            <Text style={ { color: colors.text } }>{ loadingText }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    activityContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});