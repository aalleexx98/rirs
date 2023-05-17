import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Button } from '@rneui/themed';
import { Input } from "@rneui/base";

export const LoginScreen = () => {
    return (
        <View>
            <Text>LoginScreen</Text>
            <Icon
                name="at-circle-outline"
                size={ 50 }
                color="grey"
            />
        </View>
    )
}
