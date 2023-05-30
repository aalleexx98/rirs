import React, { useRef, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


export const RoutineBodyScreen = () => {

    const [isFrontal, setIsFrontal] = useState(true);
    const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
    const [buttonColors, setButtonColors] = useState<{ [key: string]: 'black' | '#8C03FC' }>({
        abdomen: 'black',
        abductores: 'black',
        aductores: 'black',
        antebrazo: 'black',
        biceps: 'black',
        cuadriceps: 'black',
        espalda: 'black',
        gluteos: 'black',
        hombro: 'black',
        isquiosurales: 'black',
        pectoral: 'black',
        trapecio: 'black',
        triceps: 'black',
        gemelos: 'black'
    });

    const handleMuscleClick = (muscleName: string) => {
        if (selectedMuscles.includes(muscleName)) {
            setSelectedMuscles(selectedMuscles.filter((name) => name !== muscleName));
            setButtonColors((prevColors) => ({ ...prevColors, [muscleName]: 'black' }));
        } else {
            setSelectedMuscles([...selectedMuscles, muscleName]);
            setButtonColors((prevColors) => ({ ...prevColors, [muscleName]: '#8C03FC' }));
        }
    };

    return (
        <View style={ styles.container }>
            <ScrollView style={ { flex: 1 } }>

                {/* HUMAN BODY */ }
                <View style={ { flex: 1 } }>

                    <Icon
                        onPress={ () => setIsFrontal(!isFrontal) }
                        name="reload-circle-outline"
                        size={ 40 }
                        color="black"
                        style={ { position: 'absolute', zIndex: 50, right: 0, top: 10 } }
                    />

                    {/* FRONTAL */ }
                    { isFrontal ? (
                        <View style={ { flex: 1, position: 'relative' } }>
                            <Image
                                source={ require('../../assets/frontalBody.png') }
                                style={ { width: 350, height: 700, zIndex: -10 } }
                            />

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '30%', top: '15%' } }
                                onPress={ () => handleMuscleClick('hombro') }
                            >
                                <Text style={ { color: buttonColors['hombro'] } }>Hombro</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '25%', top: '23%' } }
                                onPress={ () => handleMuscleClick('biceps') }
                            >
                                <Text style={ { color: buttonColors['biceps'] } }>Biceps</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '30%', top: '52%' } }
                                onPress={ () => handleMuscleClick('aductores') }
                            >
                                <Text style={ { color: buttonColors['aductores'] } }>Aductores</Text>
                            </TouchableOpacity>

                            <View style={ { ...styles.diagonalLineQuads, position: 'absolute', top: '65%', left: '18%' } }></View>
                            <TouchableOpacity
                                style={ { ...styles.muscleButtonDiagonal, width: '22%', top: '65%' } }
                                onPress={ () => handleMuscleClick('cuadriceps') }
                            >
                                <Text style={ { color: buttonColors['cuadriceps'], ...styles.underlinedText } }>Cuadriceps</Text>
                            </TouchableOpacity>


                            {/* DERECHA */ }
                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '40%', top: '15%', right: '0%' } }
                                onPress={ () => handleMuscleClick('pectoral') }
                            >
                                <Text style={ { color: buttonColors['pectoral'], alignSelf: 'flex-end' } }>Pectoral</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '50%', top: '28%', right: '0%' } }
                                onPress={ () => handleMuscleClick('abdomen') }
                            >
                                <Text style={ { color: buttonColors['abdomen'], alignSelf: 'flex-end' } }>Abs</Text>
                            </TouchableOpacity>

                            <View style={ { ...styles.diagonalLine, position: 'absolute', top: '51%', right: '0%' } }></View>
                            <TouchableOpacity
                                style={ { ...styles.muscleButtonDiagonal, width: '30%', top: '54%', right: '0%' } }
                                onPress={ () => handleMuscleClick('antebrazo') }
                            >
                                <Text style={ { color: buttonColors['antebrazo'], alignSelf: 'flex-end', ...styles.underlinedText } }>Antebrazo</Text>
                            </TouchableOpacity>

                            <View style={ { ...styles.diagonalLineAbductor, position: 'absolute', top: '61%', right: '14%' } }></View>
                            <TouchableOpacity
                                style={ { ...styles.muscleButtonDiagonal, width: '30%', top: '65%', right: '0%' } }
                                onPress={ () => handleMuscleClick('abductores') }
                            >
                                <Text style={ { color: buttonColors['abductores'], alignSelf: 'flex-end', ...styles.underlinedText } }>Abductores</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        // BACK
                        <View style={ { flex: 1 } }>
                            <Image
                                source={ require('../../assets/backBody.png') }
                                style={ { width: 350, height: 700, zIndex: -10 } }
                            />

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '42%', top: '13%' } }
                                onPress={ () => handleMuscleClick('trapecio') }
                            >
                                <Text style={ { color: buttonColors['trapecio'] } }>Trapecio</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '28%', top: '22%' } }
                                onPress={ () => handleMuscleClick('triceps') }
                            >
                                <Text style={ { color: buttonColors['triceps'] } }>Tríceps</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '35%', top: '55%', left: 4 } }
                                onPress={ () => handleMuscleClick('isquiosurales') }
                            >
                                <Text style={ { color: buttonColors['isquiosurales'] } }>Isquiosurales</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '32%', top: '70%', left: 4 } }
                                onPress={ () => handleMuscleClick('gemelos') }
                            >
                                <Text style={ { color: buttonColors['gemelos'] } }>Gemelos</Text>
                            </TouchableOpacity>

                            {/* DERECHA */ }
                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '40%', top: '22%', right: '0%' } }
                                onPress={ () => handleMuscleClick('espalda') }
                            >
                                <Text style={ { color: buttonColors['espalda'], alignSelf: 'flex-end' } }>Espalda</Text>
                            </TouchableOpacity>

                            <View style={ { ...styles.diagonalLineAbductor, position: 'absolute', top: '55%', right: '14%' } }></View>
                            <TouchableOpacity
                                style={ { ...styles.muscleButtonDiagonal, width: '40%', top: '58%', right: '8%' } }
                                onPress={ () => handleMuscleClick('gluteos') }
                            >
                                <Text style={ { color: buttonColors['gluteos'], alignSelf: 'flex-end', ...styles.underlinedText } }>Glúteos</Text>
                            </TouchableOpacity>

                        </View>
                    ) }
                </View>

                <View style={ { marginVertical: 10, flex: 1, width: '80%' } }>
                    <Text style={ { color: 'black', fontWeight: 'bold', fontSize: 18 } }>Músculos seleccionados:</Text>
                    { selectedMuscles.length > 0 ? (
                        <Text style={ { color: 'black', textTransform: 'capitalize' } }>{ selectedMuscles.join(', ') }</Text>
                    ) : (
                        <Text style={ { color: 'black' } }>No se han seleccionado músculos.</Text>
                    ) }
                </View>

            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    muscleButtons: {
        height: 50,
        position: 'absolute',
        borderBottomWidth: 2,
        justifyContent: 'flex-end',

        //Luego borrar
        //borderTopWidth: 1,
    },
    muscleButtonDiagonal: {
        height: 50,
        position: 'absolute',
        justifyContent: 'flex-end',
    },
    diagonalLine: {
        width: 100,
        height: 2,
        backgroundColor: 'black',
        transform: [{ rotate: '70deg' }]
    },
    diagonalLineQuads: {
        width: 90,
        height: 2,
        backgroundColor: 'black',
        transform: [{ rotate: '130deg' }]
    },
    diagonalLineAbductor: {
        width: 130,
        height: 2,
        backgroundColor: 'black',
        transform: [{ rotate: '60deg' }]
    },
    underlinedText: {
        textDecorationStyle: 'solid',
        borderBottomWidth: 2, // Ajusta el valor según el grosor deseado
    }
});