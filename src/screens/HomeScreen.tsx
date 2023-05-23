import React, { useContext } from 'react'
import { Button, Text, View } from 'react-native'
import { AuthContext } from '../context/authContext/authContext';
import { ProfilePicture } from '../components/home/ProfilePicture';
import { ThemeContext } from '../context/themeContext/ThemeContext';

export const HomeScreen = () => {
    const { user, logOut } = useContext(AuthContext);
    const { theme: { colors, backgroundTab } } = useContext(ThemeContext);


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


        </View >
    )
}
