import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../theme/globalTheme';
import { ThemeContext } from '../../context/themeContext/ThemeContext';
import { ButtonRoutine } from '../../components/routine/ButtonRoutine';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsRoutine } from '../../routes/RoutineStack';
import { StackNavigationProp } from '@react-navigation/stack';

export const RoutineScreen = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamsRoutine>>();

    const { theme: { colors, textSecondary } } = useContext(ThemeContext);

    const [selectedGendre, setSelectedGendre] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const handleGendre = (gendre: string) => {
        setSelectedGendre(gendre);
    };

    const handleLevel = (level: string) => {
        setSelectedLevel(level);
    };

    const handleType = (type: string) => {
        setSelectedType(type);
    };

    return (
        <View style={ { ...globalStyles.globalMargin } }>

            <View style={ { alignItems: 'center', rowGap: 50 } }>

                <View style={ styles.rowButtons }>
                    <Text style={ { color: colors.text, fontSize: 20 } }>Género:</Text>
                    <View style={ { flexDirection: 'row', columnGap: 15 } }>
                        <ButtonRoutine
                            iconName='man-outline'
                            iconType='Ionicons'
                            name='Hombre'
                            onPress={ () => handleGendre('hombre') }
                            opacity={ selectedGendre === 'hombre' ? 0.6 : 1 }
                        />

                        <ButtonRoutine
                            iconName='woman-outline'
                            iconType='Ionicons'
                            name='Mujer'
                            onPress={ () => handleGendre('mujer') }
                            opacity={ selectedGendre === 'mujer' ? 0.6 : 1 }
                        />
                    </View>
                </View>

                <View style={ styles.rowButtons }>
                    <Text style={ { color: colors.text, fontSize: 20 } }>Nivel en el gimnasio:</Text>
                    <View style={ { flexDirection: 'row', columnGap: 15 } }>
                        <ButtonRoutine
                            iconName='walk'
                            iconType='Icon'
                            name='Principiante'
                            onPress={ () => handleLevel('beginner') }
                            opacity={ selectedLevel === 'beginner' ? 0.6 : 1 }
                        />

                        <ButtonRoutine
                            iconName='dumbbell'
                            iconType='Icon'
                            name='Intermedio'
                            onPress={ () => handleLevel('middle') }
                            opacity={ selectedLevel === 'middle' ? 0.6 : 1 }
                        />

                        <ButtonRoutine
                            iconName='weight-lifter'
                            iconType='Icon'
                            name='Avanzado'
                            onPress={ () => handleLevel('advanced') }
                            opacity={ selectedLevel === 'advanced' ? 0.6 : 1 }
                        />
                    </View>
                </View>

                <View style={ styles.rowButtons }>
                    <Text style={ { color: colors.text, fontSize: 20 } }>Generar rutina o Crear de 0: </Text>
                    <View style={ { flexDirection: 'row', columnGap: 15 } }>
                        <ButtonRoutine
                            iconName='shuffle-outline'
                            iconType='Ionicons'
                            name='Generar'
                            onPress={ () => handleType('day') }
                            opacity={ selectedType === 'day' ? 0.6 : 1 }
                        />

                        <ButtonRoutine
                            iconName='desktop-outline'
                            iconType='Ionicons'
                            name='Crear'
                            onPress={ () => handleType('week') }
                            opacity={ selectedType === 'week' ? 0.6 : 1 }
                        />
                    </View>
                </View>

                { selectedGendre && selectedLevel && selectedType && (
                    <TouchableOpacity style={ { ...styles.nextButton, backgroundColor: colors.primary } }
                        activeOpacity={ 0.7 }
                        onPress={ () => selectedType === 'day' ?
                            navigation.navigate('RoutineBodyScreen', { gender: selectedGendre, level: selectedLevel }) :
                            navigation.navigate("Routine1DayScreen", { type: 'New' }) }
                    >
                        <Text style={ { fontSize: 16, color: textSecondary } }>Siguiente</Text>
                    </TouchableOpacity>
                ) }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    rowButtons: {
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 15
    },
    nextButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
    }
});