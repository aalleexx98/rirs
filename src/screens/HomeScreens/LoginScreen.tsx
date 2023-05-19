import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Button } from '@rneui/themed';
import { Input } from "@rneui/base";
import { ThemeContext } from '../../context/themeContext/ThemeContext';

export const LoginScreen = () => {

    const { theme } = useContext(ThemeContext);

    return (
        <View>
            <Text style={ { color: theme.colors.text } }>LoginScreen</Text>
            <Icon
                name="at-circle-outline"
                size={ 50 }
                color="grey"
            />
        </View>
    )
}
