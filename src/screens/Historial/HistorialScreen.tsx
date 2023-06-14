import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native'
import { ThemeContext } from '../../context/themeContext/ThemeContext';
import { useHistorial } from '../../hooks/historial/useHistorial';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Loading } from '../../components/Loading';
import { globalStyles } from '../../theme/globalTheme';
import { HistorialCard } from '../../components/historial/historialCard';

export const HistorialScreen = () => {

    const { theme: { colors, backgroundTab } } = useContext(ThemeContext);

    const { isFetching, historialData, loadMoreHistorial, hasMore } = useHistorial();

    useEffect(() => { //TODO ELIMINAR
        console.log(historialData)
    }, [historialData])

    if (isFetching) {
        return <Loading loadingText='Cargando Historial' />;
    }

    return (
        <View style={ globalStyles.globalMargin }>
            <Text style={ { fontSize: 28, color: colors.text } }>HISTORIAL</Text>

            <FlatList
                data={ historialData }
                keyExtractor={ (item, index) => `${ index }-${ item.name }` }
                showsVerticalScrollIndicator={ false }
                style={ { marginTop: 20, marginBottom: 50 } }
                renderItem={ ({ item, index }) => (
                    <HistorialCard
                        name={ item.name }
                        totalTime={ item.totalTime }
                        day={ item.date }
                        exercices={ item.exercices }
                    />
                ) }

                ListFooterComponent={ hasMore ? (
                    <TouchableOpacity onPress={ () => loadMoreHistorial() }>
                        <Text style={ { textAlign: 'center', color: colors.text } }>Cargar más...</Text>
                    </TouchableOpacity>
                ) : (<Text style={ { textAlign: 'center', color: colors.text } }>No tienes más historial</Text>) }
            />

        </View>
    )
}
