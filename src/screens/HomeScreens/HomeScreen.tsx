import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Text, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from '../../context/authContext/authContext';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { Image } from '@rneui/base';
import { FadeInImage } from '../../components/global/FadeInImage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';



export const HomeScreen = () => {
    const { user, logOut, uid } = useContext(AuthContext);

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
                if (uid) storage().ref(uid).delete

            } else {
                console.log('El usuario no está autenticado');
            }
        } catch (error) {
            Alert.alert('Error', 'Error al actualizar la URL de foto' + error);
        }
    };

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

            {/* CUANDO CREE EL APARTADO DE PERFIL PONER LOS ESTILOS POR SEPARADOS YA QUE SE DUPLICA */ }
            { tempUri ? (
                <View style={ { borderRadius: 200, overflow: 'hidden', height: 200, width: 200 } }>
                    <TouchableOpacity onPress={ takePhotoFromGallery }>
                        <FadeInImage
                            key={ tempUri }
                            uri={ tempUri }
                            style={ { width: 200, height: 200, resizeMode: 'cover' } }
                        />

                    </TouchableOpacity>
                </View>
            ) : (
                <View style={ { borderRadius: 200, overflow: 'hidden', height: 200, width: 200 } }>
                    <TouchableOpacity onPress={ takePhotoFromGallery }>
                        <Image
                            source={ require('../../assets/blank-profile.png') }
                            style={ { width: 200, height: 200, resizeMode: 'cover' } }
                        />
                    </TouchableOpacity>
                </View>
            ) }


        </View>
    )
}
