import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
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
                console.log(documentData);
            }
        } catch (error) {
            console.log('Error al obtener el documento:', error);
        }
    }

    const handlePress = () => {
        const youtubeURL = exercice?.video_link;
        Linking.openURL(youtubeURL);
    };

    useEffect(() => {
        getFullExercice();
    }, [])

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
                    <>
                        <View style={ { ...styles.containerImage, width: windowWith } }>
                            <FadeInImage
                                uri={ exercice.image }
                                style={ { height: 250, width: 250 } }
                            />
                        </View>
                        <View style={ { ...styles.containerDetails } }>
                            <Text style={ { ...styles.title, color: colors.text } }>{ exercice.name }</Text>

                            <TouchableOpacity onPress={ handlePress } style={ { ...styles.botonYT, borderColor: colors.text } }>
                                <Text style={ { color: colors.text } }>Ver video en YouTube</Text>
                            </TouchableOpacity>

                            <View style={ { rowGap: 5 } }>
                                <Text style={ { ...styles.sectionTitle, color: colors.text } }>Ejecucción.</Text>
                                <FlatList
                                    data={ exercice.execution }
                                    renderItem={ ({ item }) => <Text style={ { color: colors.text } }>{ item }</Text> }
                                    keyExtractor={ (item, index) => index.toString() }
                                />
                            </View>

                            <View style={ { rowGap: 5 } }>
                                <Text style={ { ...styles.sectionTitle, color: colors.text } }>Tips.</Text>
                                <FlatList
                                    data={ exercice.tips }
                                    renderItem={ ({ item }) => <Text style={ { color: colors.text } }> - { item }</Text> }
                                    keyExtractor={ (item, index) => index.toString() }
                                />
                            </View>

                            <View style={ { rowGap: 5 } }>
                                <Text style={ { ...styles.sectionTitle, color: colors.text } }>Músculo Principal:</Text>
                                <Text style={ { color: colors.text, textTransform: 'capitalize' } }>{ exercice.primaryMuscle }</Text>
                            </View>

                            <View style={ { rowGap: 5 } }>
                                <Text style={ { ...styles.sectionTitle, color: colors.text } }>Músculos Secundarios:</Text>
                                <FlatList
                                    data={ exercice.tips }
                                    renderItem={ ({ item }) => <Text style={ { color: colors.text } }> Poner musculo, musculo</Text> }
                                    keyExtractor={ (item, index) => index.toString() }
                                />
                            </View>

                        </View>
                    </>
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
    containerDetails: {
        flex: 1,
        padding: 15,
        rowGap: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '600'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600'
    },
    botonYT: {
        alignItems: 'center',
        borderWidth: 1,
        padding: 4,
        borderRadius: 10,
    }
});
