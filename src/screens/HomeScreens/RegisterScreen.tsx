import React, { useState } from 'react'
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { loginStyles } from '../../theme/loginTheme'
import { LogginLogo } from '../../components/home/Logo'
import { useForm } from '../../hooks/useForm'
import Icon from 'react-native-vector-icons/Ionicons';
import { StackScreenProps } from '@react-navigation/stack'

interface Props extends StackScreenProps<any, any> { }

export const RegisterScreen = ({ navigation }: Props) => {
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);

    const { email, password, name, onChange } = useForm({
        name: '',
        email: '',
        password: ''
    });

    const onRegister = () => {
        console.log({ email, password, name });
        Keyboard.dismiss();
        // signUp({
        //     nombre: name,
        //     correo: email,
        //     password
        // });
    }

    return (
        <>
            <KeyboardAwareScrollView contentContainerStyle={ {
                flex: 1,
                backgroundColor: '#8C03FC',
            } }>

                <View style={ loginStyles.formContainer }>
                    <LogginLogo />
                    <Text style={ loginStyles.title }>Registro</Text>

                    {/* NAME */ }
                    <View style={ {
                        ...loginStyles.inputArea,
                        borderWidth: isFocusedName ? 2 : 0,
                        borderColor: isFocusedName ? '#FFF' : 'rgba(0,0,255,0)',
                        borderRadius: isFocusedName ? 10 : 0,
                        marginBottom: 15
                    } }>
                        <Icon
                            name="person-outline"
                            size={ 20 }
                        />
                        <TextInput
                            placeholder="NickName"
                            placeholderTextColor="rgba(255,255,255,0.4)"

                            style={ loginStyles.inputField }
                            onFocus={ () => setIsFocusedName(true) }
                            onBlur={ () => setIsFocusedName(false) }

                            onChangeText={ (value) => onChange(value, 'name') }
                            value={ name }
                            onSubmitEditing={ onRegister }

                            autoCapitalize="words"
                            autoCorrect={ false }
                        />
                    </View>

                    {/* EMAIL */ }
                    <View style={ {
                        ...loginStyles.inputArea,
                        borderWidth: isFocusedEmail ? 2 : 0,
                        borderColor: isFocusedEmail ? '#FFF' : 'rgba(0,0,255,0)',
                        borderRadius: isFocusedEmail ? 10 : 0,
                        marginBottom: 15
                    } }>
                        <Icon
                            name="mail-outline"
                            size={ 20 }
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            keyboardType="email-address"

                            style={ loginStyles.inputField }
                            onFocus={ () => setIsFocusedEmail(true) }
                            onBlur={ () => setIsFocusedEmail(false) }

                            onChangeText={ (value) => onChange(value, 'email') }
                            value={ email }
                            onSubmitEditing={ onRegister }

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
                        />
                        <TextInput
                            placeholder="******"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            secureTextEntry

                            style={ loginStyles.inputField }
                            onFocus={ () => setIsFocusedPassword(true) }
                            onBlur={ () => setIsFocusedPassword(false) }

                            onChangeText={ (value) => onChange(value, 'password') }
                            value={ email }
                            onSubmitEditing={ onRegister }

                            autoCapitalize="none"
                            autoCorrect={ false }
                        />
                    </View>

                    {/* Crear una nueva cuenta */ }
                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ loginStyles.button }
                            onPress={ onRegister }
                        >
                            <Text style={ loginStyles.buttonText } >Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>

                    {/* BOTON HACIA ATRAS */ }
                    <TouchableOpacity
                        onPress={ () => navigation.replace('LoginScreen') }
                        activeOpacity={ 0.8 }
                        style={ loginStyles.buttonReturn }
                    >
                        <Icon
                            name="arrow-back-outline"
                            size={ 30 }
                            color="white"
                        />
                    </TouchableOpacity>

                </View>
            </KeyboardAwareScrollView>
        </>
    )
}
