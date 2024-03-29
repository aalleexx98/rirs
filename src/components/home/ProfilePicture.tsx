import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from '../../context/authContext/authContext';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { Image } from '@rneui/base';
import { FadeInImage } from '../FadeInImage';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ProfilePicture = () => {

    const { user, uid } = useContext(AuthContext);
    const [tempUri, setTempUri] = useState<string>()

    useEffect(() => {
        if (user?.photoURL) {
            setTempUri(user.photoURL);
        }
    }, [])

    const takePhotoFromGallery = async () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5
        }, async (resp) => {
            if (resp.didCancel) return;
            if (resp.assets) {
                if (!resp.assets[0].uri) return;

                const imageURL = await uploadImage(resp.assets[0].uri);
                if (imageURL) {
                    setTempUri(imageURL);
                    updateProfilePhotoURL(imageURL);
                }
            }
        })
    }

    const uploadImage = async (uri: string) => {
        try {
            const fileName = uid;
            if (fileName) {
                const reference = storage().ref(fileName);

                await reference.putFile(uri);
                const url = await reference.getDownloadURL();

                return url;
            }
        } catch (error: any) {
            Alert.alert('Error', 'Error al subir la imagen');
        }
    }

    const updateProfilePhotoURL = async (photoURL: string) => {
        const user = auth().currentUser;

        try {
            if (user) {
                await user.updateProfile({
                    photoURL: photoURL
                });
            } else {
                console.log('El usuario no está autenticado');
            }
        } catch (error) {
            Alert.alert('Error', 'Error al actualizar la URL de foto');
        }
    };

    return (
        <>
            { tempUri ? (
                <View style={ styles.containerPicture }>
                    <TouchableOpacity onPress={ takePhotoFromGallery }>
                        <FadeInImage
                            key={ tempUri }
                            uri={ tempUri }
                            style={ styles.picture }
                        />

                    </TouchableOpacity>
                </View>
            ) : (
                <View style={ styles.containerPicture }>
                    <TouchableOpacity onPress={ takePhotoFromGallery }>
                        <Image
                            source={ require('../../assets/blank-profile.png') }
                            style={ styles.picture }
                        />
                    </TouchableOpacity>
                </View>
            ) }
        </>
    )
}

const styles = StyleSheet.create({
    containerPicture: {
        borderRadius: 200,
        overflow: 'hidden',
        height: 200,
        width: 200,
    },
    picture: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
    }
});