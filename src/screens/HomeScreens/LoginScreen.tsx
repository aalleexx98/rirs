import React, { useContext, useState } from 'react'
import { TouchableOpacity, Text, TextInput, View, Keyboard } from 'react-native'
import { Background } from '../../components/home/Background';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { loginStyles } from '../../theme/loginTheme';
import { LogginLogo } from '../../components/home/Logo';
import Icon from 'react-native-vector-icons/Ionicons';
import { useForm } from '../../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface Props extends StackScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {

    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    });

    const onLogin = async () => {
        console.log({ email, password });
        Keyboard.dismiss();

        try {
            await auth()
                .signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    const user = userCredential.user;

                    if (user) {
                        console.log(user);
                        //setIsLogin(true);
                    }
                });
        } catch (error) {
            console.log('can not login: ', error);
        }
    }

    return (
        <>
            <Background />

            <KeyboardAwareScrollView>

                <View style={ loginStyles.formContainer }>
                    <LogginLogo />

                    <Text style={ loginStyles.title }>Login</Text>

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
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            keyboardType="email-address"

                            style={ loginStyles.inputField }
                            onFocus={ () => setIsFocused(true) }
                            onBlur={ () => setIsFocused(false) }

                            onChangeText={ (value) => onChange(value, 'email') }
                            // value={ email }
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
                        />
                        <TextInput
                            placeholder="******"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            secureTextEntry

                            style={ loginStyles.inputField }
                            onFocus={ () => setIsFocusedPassword(true) }
                            onBlur={ () => setIsFocusedPassword(false) }

                            onChangeText={ (value) => onChange(value, 'password') }
                            // value={ email }
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


                </View>

            </KeyboardAwareScrollView>

        </>
    )
}
