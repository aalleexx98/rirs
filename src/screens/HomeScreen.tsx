import React, { useContext } from 'react'
import { Button, Text, View } from 'react-native'
import { AuthContext } from '../context/authContext/authContext';
import { ThemeContext } from '../context/themeContext/ThemeContext';

export const HomeScreen = () => {
    const { user } = useContext(AuthContext);
    const { theme: { colors, backgroundTab } } = useContext(ThemeContext);

    return (
        <View>
            <Text>
                { JSON.stringify(user, null, 5) }
            </Text>
        </View >
    )
}
