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
                    <Text style={ { color: colors.text, fontSize: 20 } }>Generar rutina para: </Text>
                    <View style={ { flexDirection: 'row', columnGap: 15 } }>
                        <ButtonRoutine
                            iconName='sunny-outline'
                            iconType='Ionicons'
                            name='1 Dia'
                            onPress={ () => handleType('day') }
                            opacity={ selectedType === 'day' ? 0.6 : 1 }
                        />

                        <ButtonRoutine
                            iconName='calendar-outline'
                            iconType='Ionicons'
                            name='Semanal'
                            onPress={ () => handleType('week') }
                            opacity={ selectedType === 'week' ? 0.6 : 1 }
                        />
                    </View>
                </View>

                {/* TODO: SOLO MOSTRAR SI ESTAN LOS 3 SELECCIONADOS*/ }
                { selectedGendre && selectedLevel && selectedType && (
                    <TouchableOpacity style={ { ...styles.nextButton, backgroundColor: colors.primary } }
                        activeOpacity={ 0.7 }
                        onPress={ () => selectedType === 'day' ?
                            navigation.navigate('RoutineBodyScreen', { gender: selectedGendre, level: selectedLevel }) :
                            navigation.navigate('RoutineWeeklyScreen', { gender: selectedGendre, level: selectedLevel }) }
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