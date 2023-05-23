import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ProfilePicture } from '../components/home/ProfilePicture'
import { AuthContext } from '../context/authContext/authContext';
import firestore from '@react-native-firebase/firestore';
import { getItemStorage } from '../helpers/helperStorage';

export const ProfileScreen = () => {
    const { user, logOut } = useContext(AuthContext);
    const [nombreUsuario, setNombreUsuario] = useState('');

    useEffect(() => {
        firestore().collection('users').doc(user?.uid).get()
            .then(querySnapshot => {
                const UserData = querySnapshot.data();
                setNombreUsuario(UserData?.name);
            }).catch(error => console.log(error));
    }, [])


    return (
        <View style={ styles.main }>
            <Text style={ styles.name }>{ nombreUsuario }</Text>
            <ProfilePicture />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        marginBottom: 20,
    }
});
