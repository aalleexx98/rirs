import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, FlatList, Platform, Text, View } from 'react-native'
import { globalStyles } from '../theme/globalTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { useExercicesPaginated } from '../hooks/global/exercices/useExercicesPaginated';
import { Loading } from '../components/Loading';
import { ExerciceCard } from '../components/exercices/exerciceCard';
import { SearchInput } from '../components/exercices/searchInput';

const screenWidth = Dimensions.get('window').width;


export const ExercicesScreen = () => {
    const { theme: { colors } } = useContext(ThemeContext);
    const [term, setTerm] = useState('');

    const { isFetching, searchExercice, exerciceFiltered } = useExercicesPaginated();

    useEffect(() => {
        searchExercice(term);
    }, [term])

    if (isFetching) {
        return <Loading />
    }

    return (
        <View style={ { ...globalStyles.globalMargin, } }>

            <SearchInput
                //Cada vez qe recoga un term nuevo
                onDebounce={ (value) => setTerm(value) }//recoge el valor del onDebounce del useEffect y lo cambia al usestate de term
                style={ {
                    zIndex: 999,
                    width: screenWidth - 40, //-20 del horizontal + 20 para derecha
                    marginVertical: 10,
                } }
            />

            <FlatList
                data={ exerciceFiltered }
                keyExtractor={ (exercice) => exercice.name }
                showsVerticalScrollIndicator={ false }

                renderItem={ ({ item }) => (<ExerciceCard exercice={ item } />) }
            />

        </View>
    )
}
