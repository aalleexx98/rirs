import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParams } from '../routes/ExerciceStack'
import firestore from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { FadeInImage } from '../components/FadeInImage';


const windowWith = Dimensions.get('window').width

interface Props extends StackScreenProps<RootStackParams, 'ExerciceDetailsScreen'> { };

export const ExerciceDetailsScreen = ({ navigation, route }: Props) => {

    const [exercice, setExercice] = useState<FirebaseFirestoreTypes.DocumentData | undefined>();
    const { theme: { colors } } = useContext(ThemeContext);
    const { top } = useSafeAreaInsets();

    const getFullExercice = async () => {
        try {
            const documentSnapshot = await firestore().collection('exercices').doc(route.params.ref).get();
            if (documentSnapshot.exists) {
                const documentData = documentSnapshot.data();
                setExercice(documentData);
                console.log(exercice);
            }
        } catch (error) {
            console.log('Error al obtener el documento:', error);
        }
    }

    useEffect(() => {
        getFullExercice();
    }, [])

    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //         title: exercice?.name,
    //     });
    // }, [navigation]);

    return (
        <>
            {/* Backbutton */ }
            <TouchableOpacity
                onPress={ () => navigation.pop() }
                activeOpacity={ 0.8 }
                style={ {
                    ...styles.backButton,
                    top: top + 5,
                    zIndex: 10
                } }
            >
                <Icon
                    name="arrow-back-outline"
                    color="black"
                    size={ 35 }
                />
            </TouchableOpacity>
            { exercice ?
                (
                    <View style={ { ...styles.containerImage, width: windowWith } }>
                        <FadeInImage
                            uri={ exercice.image }
                            style={ { height: 250, width: 250 } }
                        />
                    </View>
                )
                :
                (
                    <View>
                        <Text style={ { color: colors.text } }>Ejercicio no encontrado</Text>
                    </View>
                )
            }

        </>
    )
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        left: 10
    },
    containerImage: {
        backgroundColor: 'white',
        height: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {

    }
});
