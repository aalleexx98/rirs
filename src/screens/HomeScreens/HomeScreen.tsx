import React, { useContext } from 'react'
import { Button, Text, View } from 'react-native'
import { AuthContext } from '../../context/authContext/authContext';
import { ProfilePicture } from '../../components/home/ProfilePicture';



export const HomeScreen = () => {
    const { user, logOut } = useContext(AuthContext);

    return (
        <View>
            <Text>
                {/* { JSON.stringify(user, null, 5) } */ }
                { user?.email }
            </Text>
            <Button
                title="logout"
                color="#5856D6"
                onPress={ logOut }
            />

            <ProfilePicture />


        </View>
    )
}
