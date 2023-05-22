import React from 'react'
import { Image, View } from 'react-native'

export const LogginLogo = () => {
    return (
        <View style={ {
            alignItems: 'center'
        } }>
            <Image
                source={ require('../../assets/white-logo.png') }
                style={ {
                    width: 150,
                    height: 150
                } }
            />
        </View>
    )
}