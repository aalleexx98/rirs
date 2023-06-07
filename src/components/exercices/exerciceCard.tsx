import React, { useContext } from 'react'
import { LogBox, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import { exercicePreview } from '../../interfaces/exerciceInterface'
import { ThemeContext } from '../../context/themeContext/ThemeContext'
import { FadeInImage } from '../FadeInImage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../routes/ExerciceStack'
import Icon from 'react-native-vector-icons/Ionicons';
import { useExercicesPaginated } from '../../hooks/global/exercices/useExercicesPaginated';


interface Props {
    exercice: exercicePreview,
    add?: boolean
}

export const ExerciceCard = ({ exercice }: Props) => {

    const { theme: { colors } } = useContext(ThemeContext);
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const { addRoutineExercise, routineDayExercices } = useExercicesPaginated();

    const addExercice = () => {
        console.log(routineDayExercices);
        addRoutineExercise(exercice.ref.id)
        console.log(exercice.ref.id)
        //navigation.pop()
    }

    return (
        <TouchableOpacity
            activeOpacity={ 0.6 }
            onPress={ () => navigation.navigate('ExerciceDetailsScreen', { ref: exercice.ref.id }) }
        >
            <View style={ { ...styles.card, backgroundColor: colors.primary } }>
                <FadeInImage
                    uri={ exercice.img }
                    style={ { height: 100, width: 100 } }
                />

                <View style={ styles.containerText }>
                    <Text style={ styles.title }>{ exercice.name }</Text>
                    <Text style={ styles.muscle }>{ exercice.muscle } / { exercice.equipment }</Text>
                </View>

                <TouchableOpacity
                    style={ { backgroundColor: '#540197', flex: 1, justifyContent: 'center', alignItems: 'center' } }
                    activeOpacity={ 0.6 }
                    onPress={ addExercice }
                >
                    <Icon
                        name="add-circle-outline"
                        color={ colors.text }
                        size={ 30 }
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 100,
        marginBottom: 15,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        borderColor: 'black',
        borderWidth: 1,
    },
    containerText: {
        width: '55%',
        height: 100,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    muscle: {
        fontSize: 14,
        marginTop: 'auto',
        color: 'white',
        textTransform: 'capitalize'
    }
});
