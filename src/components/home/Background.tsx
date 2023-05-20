import React from 'react'
import { View } from 'react-native'
import { Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Background = () => {
    return (
        <View
            style={ {
                position: 'absolute',
                backgroundColor: '#8C03FC',
                top: -250,
                width: windowWidth * 1.9,
                height: windowHeight * 1.5, //Esto hace menos alto cambiar dependiendo como quede form
                transform: [
                    { rotate: '-70deg' }
                ]
            } }
        />
    )
}