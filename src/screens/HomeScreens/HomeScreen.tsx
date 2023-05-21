import React, { useContext } from 'react'
import { Button, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../context/authContext/authContext';

export const HomeScreen = () => {
    const { user, logOut } = useContext(AuthContext);

    return (
        <View>
            <Text>
                { JSON.stringify(user, null, 5) }
            </Text>
            <Button
                title="logout"
                color="#5856D6"
                onPress={ logOut }
            />
        </View>
    )
}
