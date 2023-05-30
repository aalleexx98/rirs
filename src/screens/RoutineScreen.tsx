import React, { useRef, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


export const RoutineScreen = () => {

    const [isFrontal, setIsFrontal] = useState(true);
    const [selectedMuscle, setSelectedMuscle] = useState('');


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
                        <View style={ { flex: 1 } }>
                            <Image
                                source={ require('../assets/frontalBody.png') }
                                style={ { width: 350, height: 700, zIndex: -10 } }
                            />

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '30%', top: '15%' } }
                            >
                                <Text style={ { color: 'black' } }>Hombro</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '25%', top: '23%' } }
                            >
                                <Text style={ { color: 'black' } }>Biceps</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '30%', top: '52%' } }
                            >
                                <Text style={ { color: 'black' } }>Aductores</Text>
                            </TouchableOpacity>

                            <View style={ { ...styles.diagonalLineQuads, position: 'absolute', top: '65%', left: '18%' } }></View>
                            <TouchableOpacity
                                style={ { ...styles.muscleButtonDiagonal, width: '22%', top: '65%' } }
                            >
                                <Text style={ { color: 'black', ...styles.underlinedText } }>Cuadriceps</Text>
                            </TouchableOpacity>


                            {/* DERECHA */ }
                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '40%', top: '15%', right: '0%' } }
                            >
                                <Text style={ { color: 'black', alignSelf: 'flex-end' } }>Pecho</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '50%', top: '28%', right: '0%' } }
                            >
                                <Text style={ { color: 'black', alignSelf: 'flex-end' } }>Abs</Text>
                            </TouchableOpacity>

                            <View style={ { ...styles.diagonalLine, position: 'absolute', top: '51%', right: '0%' } }></View>
                            <TouchableOpacity
                                style={ { ...styles.muscleButtonDiagonal, width: '30%', top: '54%', right: '0%' } }
                            >
                                <Text style={ { color: 'black', alignSelf: 'flex-end', ...styles.underlinedText } }>Antebrazo</Text>
                            </TouchableOpacity>

                            <View style={ { ...styles.diagonalLineAbductor, position: 'absolute', top: '61%', right: '14%' } }></View>
                            <TouchableOpacity
                                style={ { ...styles.muscleButtonDiagonal, width: '30%', top: '65%', right: '0%' } }
                            >
                                <Text style={ { color: 'black', alignSelf: 'flex-end', ...styles.underlinedText } }>Abductores</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        // BACK
                        <View style={ { flex: 1 } }>
                            <Image
                                source={ require('../assets/backBody.png') }
                                style={ { width: 350, height: 700, zIndex: -10 } }
                            />

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '42%', top: '13%' } }
                            >
                                <Text style={ { color: 'black' } }>Trapecio</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '28%', top: '22%' } }
                            >
                                <Text style={ { color: 'black' } }>Tríceps</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '35%', top: '55%', left: 4 } }
                            >
                                <Text style={ { color: 'black' } }>Isquiotibiales</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '32%', top: '70%', left: 4 } }
                            >
                                <Text style={ { color: 'black' } }>Gemelo</Text>
                            </TouchableOpacity>

                            {/* DERECHA */ }
                            <TouchableOpacity
                                style={ { ...styles.muscleButtons, width: '40%', top: '22%', right: '0%' } }
                            >
                                <Text style={ { color: 'black', alignSelf: 'flex-end' } }>Espalda</Text>
                            </TouchableOpacity>

                            <View style={ { ...styles.diagonalLineAbductor, position: 'absolute', top: '55%', right: '14%' } }></View>
                            <TouchableOpacity
                                style={ { ...styles.muscleButtonDiagonal, width: '40%', top: '58%', right: '8%' } }
                            >
                                <Text style={ { color: 'black', alignSelf: 'flex-end', ...styles.underlinedText } }>Glúteos</Text>
                            </TouchableOpacity>

                        </View>
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