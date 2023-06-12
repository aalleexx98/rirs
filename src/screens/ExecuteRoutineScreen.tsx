import React, { useContext, useEffect, useState } from 'react'
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RoutineContext } from '../context/routineContext/routineContext';
import { RootStackParamsHome } from '../routes/HomeStack';
import { StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { routineExercices } from '../interfaces/exerciceInterface';
import { FadeInImage } from '../components/FadeInImage';

interface Props extends StackScreenProps<RootStackParamsHome, 'ExecuteRoutineScreen'> { };

export const ExecuteRoutineScreen = ({ route }: Props) => {

    const { routineExercices, setActiveRoutine } = useContext(RoutineContext);
    const { theme: { colors } } = useContext(ThemeContext);
    const [totalTime, setTotalTime] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentItem, setCurrentItem] = useState<routineExercices>();

    const nextExercice = () => {
        if (currentIndex < routineExercices.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    useEffect(() => {
        setActiveRoutine(route.params.id!);
    }, [])

    useEffect(() => {
        setCurrentItem(routineExercices[currentIndex]);
    }, [routineExercices, currentIndex])

    useEffect(() => {
        const interval = setInterval(() => {
            setTotalTime(prevCount => prevCount + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${ hours }:${ minutes }:${ seconds }`;
    };


    return (
        <View>

            {/* TODO: Ponerlo en position absolute */ }
            <View style={ { flexDirection: 'row', backgroundColor: 'white' } }>

                <TouchableOpacity
                    style={ { position: 'absolute', left: 10 } }
                    activeOpacity={ 0.8 }
                >
                    <Text style={ { ...styles.textHeader, color: 'black', paddingRight: 20 } }>Salir</Text>
                </TouchableOpacity>

                <View
                    style={ { justifyContent: 'center', flex: 1 } }
                >
                    <Text style={ { ...styles.textHeader, color: 'black', textAlign: 'center' } }>{ currentIndex + 1 }/{ routineExercices.length }</Text>
                </View>

                <View style={ { position: 'absolute', right: 10 } }>
                    <Text style={ { ...styles.textHeader, color: 'black', zIndex: 20 } }>{ formatTime(totalTime) }</Text>
                </View>

            </View>

            <View style={ { backgroundColor: 'white', justifyContent: 'center', zIndex: -10, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'black' } }>
                <FadeInImage
                    uri={ currentItem?.exercise.img }
                    style={ { height: 250, width: 250 } }
                />
            </View>

            {/* <View>
                { currentItem?.repetitions && <Text>{ currentItem.exercise.name }</Text> }
                <Button title="Siguiente" onPress={ nextExercice } />
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 18,
    }
});
