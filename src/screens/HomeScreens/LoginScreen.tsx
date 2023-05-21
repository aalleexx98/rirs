import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, Text, TextInput, View, Keyboard, Alert, Button, Modal, StyleSheet } from 'react-native'
import { Background } from '../../components/home/Background';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { loginStyles } from '../../theme/loginTheme';
import { LogginLogo } from '../../components/home/Logo';
import Icon from 'react-native-vector-icons/Ionicons';
import { useForm } from '../../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../../context/authContext/authContext';
import { ThemeContext } from '../../context/themeContext/ThemeContext';
import auth from '@react-native-firebase/auth';

interface Props extends StackScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {

    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [pswModal, setpswModal] = useState(false);
    const { theme: { colors } } = useContext(ThemeContext);

    const { signIn, errorMessage, removeError } = useContext(AuthContext);

    const { email, password, emailReset, onChange } = useForm({
        email: '',
        password: '',
        emailReset: '',
    });

    useEffect(() => {
        if (errorMessage.length === 0) return;

        Alert.alert('Login incorrecto', errorMessage, [{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [errorMessage])

    const onLogin = async () => {
        console.log({ email, password });
        Keyboard.dismiss();
        signIn({ email, password });
    }

    const resetPassword = async () => {
        Keyboard.dismiss();
        await auth().sendPasswordResetEmail(emailReset).then(() => {
            Alert.alert('Éxito', 'Se ha enviado un correo electrónico para restablecer la contraseña.');
        }).catch(error => {
            if (error.code === 'auth/invalid-email') {
                Alert.alert('Error', 'El email no es valido');
            }
            if (error.code === 'auth/user-not-found') {
                Alert.alert('Error', 'No existe usuario con el email introducido');
            }
        })
        setpswModal(false);
    }

    return (
        <>
            <Background />

            <KeyboardAwareScrollView>

                <View style={ loginStyles.formContainer }>
                    <LogginLogo />

                    {/* EMAIL */ }
                    <View style={ {
                        ...loginStyles.inputArea,
                        borderWidth: isFocused ? 2 : 0,
                        borderColor: isFocused ? '#FFF' : 'rgba(0,0,255,0)',
                        borderRadius: isFocused ? 10 : 0,
                        marginBottom: 15
                    } }>
                        <Icon
                            name="mail-outline"
                            size={ 20 }
                            color="white"
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            keyboardType="email-address"

                            style={ loginStyles.inputField }
                            onFocus={ () => setIsFocused(true) }
                            onBlur={ () => setIsFocused(false) }

                            onChangeText={ (value) => onChange(value, 'email') }
                            onSubmitEditing={ onLogin }

                            autoCapitalize="none"
                            autoCorrect={ false }
                        />
                    </View>

                    {/* PASSWORD */ }
                    <View style={ {
                        ...loginStyles.inputArea,
                        borderWidth: isFocusedPassword ? 2 : 0,
                        borderColor: isFocusedPassword ? '#FFF' : 'rgba(0,0,255,0)',
                        borderRadius: isFocusedPassword ? 10 : 0,
                    } }>
                        <Icon
                            name="key-outline"
                            size={ 20 }
                            color="white"
                        />
                        <TextInput
                            placeholder="******"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            secureTextEntry

                            style={ loginStyles.inputField }
                            onFocus={ () => setIsFocusedPassword(true) }
                            onBlur={ () => setIsFocusedPassword(false) }

                            onChangeText={ (value) => onChange(value, 'password') }
                            onSubmitEditing={ onLogin }

                            autoCapitalize="none"
                            autoCorrect={ false }
                        />
                    </View>

                    {/* BOTON LOGIN */ }
                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ loginStyles.button }
                            onPress={ onLogin }
                        >
                            <Text style={ loginStyles.buttonText } >Login</Text>
                        </TouchableOpacity>
                    </View>


                    {/* BOTON REGISTRER */ }
                    <View style={ loginStyles.newUserContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            onPress={ () => navigation.replace('RegisterScreen') }//Replace x navigate asi no puedo regresar
                        >
                            <Text style={ loginStyles.buttonText }>Nueva cuenta </Text>
                        </TouchableOpacity>
                    </View>

                    {/* RESET PASSWORD */ }
                    <View style={ loginStyles.resetContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            onPress={ () => setpswModal(true) }//Replace x navigate asi no puedo regresar
                        >
                            <Text style={ loginStyles.textReset }>Recuperar contraseña</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType='fade'
                        visible={ pswModal }
                        transparent={ true }
                    //Supongo que se podra hacer que al hacer click fuera se quite?
                    >
                        {/* BG del Modal */ }
                        <View style={ loginStyles.modalBgOut }>
                            {/* Contenido del Modal */ }
                            <View style={ loginStyles.modalContent }>
                                <View style={ loginStyles.inputAreaReset }>
                                    <TextInput
                                        placeholder="Introduce email"
                                        placeholderTextColor="rgba(175, 175, 175, 0.6)"
                                        keyboardType="email-address"
                                        style={ loginStyles.inputFieldReset }
                                        onSubmitEditing={ resetPassword }
                                        onChangeText={ (value) => onChange(value, 'emailReset') }
                                        autoCapitalize="none"
                                        autoCorrect={ false }
                                    />
                                </View>
                                <TouchableOpacity
                                    activeOpacity={ 0.8 }
                                    onPress={ resetPassword }
                                    style={ { alignSelf: 'flex-end' } }
                                >
                                    <Text style={ { color: 'black', fontSize: 18, marginTop: 40 } }>Enviar</Text>
                                </TouchableOpacity>

                                <Icon
                                    name="close-outline"
                                    size={ 25 }
                                    color="black"
                                    style={ { position: 'absolute', right: 5, top: 5 } }
                                    onPress={ () => setpswModal(false) }
                                />
                            </View>

                        </View>
                    </Modal>


                </View>

            </KeyboardAwareScrollView>

        </>
    )
}

