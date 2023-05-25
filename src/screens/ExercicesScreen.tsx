import React, { useContext } from 'react'
import { Button, FlatList, Image, Text, View } from 'react-native'
import { globalStyles } from '../theme/globalTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { useExercicesPaginated } from '../hooks/global/exercices/useExercicesPaginated';
import { Loading } from '../components/Loading';

export const ExercicesScreen = () => {
    const { theme: { colors } } = useContext(ThemeContext);

    const { isFetching, simpleExerciceList } = useExercicesPaginated();

    if (isFetching) {
        return <Loading />
    }

    return (
        <View style={ globalStyles.globalMargin }>
            <Text style={ { ...globalStyles.titlePrincipal, color: colors.text } }>Exercices</Text>

            <FlatList
                data={ simpleExerciceList }
                keyExtractor={ (exercice) => exercice.name }
                showsVerticalScrollIndicator={ false }

                renderItem={ ({ item }) => (
                    <Image
                        source={ { uri: item.img } }
                        style={ { width: 100, height: 100 } }
                    />
                ) }
            />

        </View>
    )
}
