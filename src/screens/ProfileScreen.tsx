import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { ProfilePicture } from '../components/home/ProfilePicture'
import { AuthContext } from '../context/authContext/authContext';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { getItemStorage } from '../helpers/helperStorage';
import { ThemeContext } from '../context/themeContext/ThemeContext';

export const ProfileScreen = () => {
    const { user, logOut } = useContext(AuthContext);
    const [nombreUsuario, setNombreUsuario] = useState('');
    const { theme: { colors, currentTheme }, setDarkTheme, theme, setLightTheme } = useContext(ThemeContext);

    useEffect(() => {
        firestore().collection('users').doc(user?.uid).get()
            .then(querySnapshot => {
                const UserData = querySnapshot.data();
                setNombreUsuario(UserData?.name);
            }).catch(error => console.log(error));
    }, [])

    return (
        <View style={ styles.main }>
            <ProfilePicture />
            <View style={ styles.menu }>
                <Text style={ { ...styles.name, color: colors.text } }>Username: { nombreUsuario }</Text>
                <Text style={ { ...styles.name, color: colors.text } }>Email: { user?.email }</Text>
                <TouchableOpacity activeOpacity={ 0.6 } onPress={ currentTheme === 'dark' ? setLightTheme : setDarkTheme }>
                    <Text style={ { ...styles.name, color: colors.primary } }>{ `Cambiar tema a ${ currentTheme === 'dark' ? 'claro' : 'oscuro' }` }</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={ 0.6 } onPress={ logOut }>
                    <Text style={ { ...styles.name, color: colors.primary } }>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu: {
        marginTop: 50,
        rowGap: 20,
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
    }
});
